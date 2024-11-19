export type nutritionRecord = {
    date: string,
    calories: number,
    protein: number,
    fats: number,
    carbohydrates: number,
    name: string,
    user: string
};

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