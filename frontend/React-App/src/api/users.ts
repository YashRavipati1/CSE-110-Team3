// Zere: changed nutrition and exercise records to any[] to avoid type errors

export type createUserRequest = {
    email: string,
    firstName: string,
    lastName: string
}

  

// Gets the user from DB (used in Data Context)
export const getUser = async (email: string) => {
    const response = await fetch(`http://localhost:8080/users/${email}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    if(!response.ok) {
        return { success: false, data: await response.text() };
    }
    return { success: true, data: await response.json() };
}

//creates a new user (used with sign in)
export const createUser = async (userReq: createUserRequest) => {
    const getResponse = (await getUser(userReq.email));
    const user = getResponse.data.user;
    if(!getResponse.success) {
        return { success: false, data: user.data };
    }
    if (getResponse.success && user) {
        return { success: false, data: "User already exists" };
    }
    const userEntry = {
        email: userReq.email,
        firstName: userReq.firstName,
        lastName: userReq.lastName,
        age: 0,
        height: 0,
        weight: 0,
        weightGoal: 0,
        caloriesGoal: 2200,
        proteinGoal: 150,
        fatGoal: 75,
        carbGoal: 300,
        nutritionRecords: [],
        exerciseRecords: []
    }
    const response = await fetch('http://localhost:8080/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userEntry),
    });
    if(!response.ok) {
        return { success: false, data: await response.text() };
    }
    return { success: true, data: await response.json() };
};

// Edits a user (e.g weight goal)
export const editUser = async (email: string, updates: any) => {
    const response = await fetch(`http://localhost:8080/users/${email}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
    });
    if(!response.ok) {
        return { success: false, data: await response.text() };
    }
    return { success: true, data: await response.json() }
};