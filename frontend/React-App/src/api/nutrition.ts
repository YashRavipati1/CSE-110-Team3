import { NutritionEntry, NewOrEditedNutritionEntry } from '../types/types';


export const getNutritionForUser = async (email: string, date: Date) => {
    const response = await fetch(`http://localhost:8080/nutrition/${email}/${date.toISOString().split('T')[0]}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    if(!response.ok) {
        return { success: false, data: await response.text() };
    }
    const rawText = await response.text();

    if (!rawText || rawText.trim().length === 0) {
        console.log('No data received from the server.');
      return { success: false, data: 'No data received from the server.' };
    }

    try {
        return { success: true, data: JSON.parse(rawText) };
    } catch (error) {
        return { success: false, data: error };
    }
}

// Zere: Gets all nutrition data for a specific user
export const getAllNutritionForUser = async (email: string)=> {
    console.log("Checking all entries for from api for user:", email);
    const response = await fetch(`http://localhost:8080/nutrition/${email}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    if (!response.ok) {
        // If the HTTP response is not okay, print and return the error message
        const errorText = await response.text();
        console.error('Failed to fetch all meals:', errorText);
        return { success: false, data: errorText };
    }

    try {
        // Attempt to parse the JSON response
        const data = await response.json();
        console.log('Fetched meals:', data);
        return { success: true, data: data };
    } catch (error) {
        // Handle any errors that occur during JSON parsing
        console.error('Error parsing meals data:', error);
        return { success: false}; //data: error.message };
    }
}

// Zere: To edit meal, gets the nutrition data for a specific user and meal, using the unique email and meal id
export const getNutritionRecordById = async (id: string, email: string): Promise<any> => {
    const response = await fetch(`http://localhost:8080/nutrition/${email}/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    if (!response.ok) {
        return { success: false, data: await response.text() };
    }
    const rawText = await response.text();

    if (!rawText || rawText.trim().length === 0) {
        console.log('No data received from the server.');
        return { success: false, data: 'No data received from the server.' };
    }

    try {
        return { success: true, data: JSON.parse(rawText) };
    } catch (error) {
        return { success: false, data: error };
    }
}

// Zere: adding a new function to add a nutrition record, for the add meal functionality
export const addNutritionRecord = async (mealData: NewOrEditedNutritionEntry): Promise<any> => {
    const response = await fetch(`http://localhost:8080/nutrition`, {
        method: 'POST', // POST creates a new entry in the database
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(mealData)
    });
    return await response.json(); // Assuming the server responds with JSON
};

// Zere: adding a new function to update a nutrition record, for edit meal functionality
export const updateNutritionRecord = async (email: string, id: string, record: NewOrEditedNutritionEntry): Promise<any> => {
    const response = await fetch(`http://localhost:8080/nutrition/${email}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(record)
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
};

// Zere: adding a new function to delete a nutrition record, for delete meal functionality
export const deleteNutritionRecord = async (id: string): Promise<any> => {
    try {
        const response = await fetch(`http://localhost:8080/nutrition/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            // If the response is not okay and there's an error message, parse it and log or throw it
            const errorData = await response.json(); // assuming server sends errors in JSON format
            console.error('Failed to delete record:', errorData);
            throw new Error(`Failed to delete: ${response.status} - ${errorData.message}`);
        }

        // If the response is okay, optionally handle response data if any
        if (response.status !== 204) { // If there's expected to be a return body, parse it
            const data = await response.json();
            return data;
        }

        // If there's no content (204 status), just return success or an empty object
        return { acknowledged: true };
    } catch (error) {
        console.error('Error deleting nutrition record:', error);
        throw error; // Re-throw to be handled or logged by the caller
    }
};

