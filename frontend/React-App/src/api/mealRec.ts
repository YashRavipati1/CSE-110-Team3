export type MealRec = {
    title: string,
    protein: number,
    fats: number,
    carbs: number,
    calType: string,
    pType: string,
    fType: string,
    cType: string
}

// Gets 3 meal recommendations based on user's needs to reach goals
export const getMealRec = async (calType: string, pType: string, fType: string, cType: string) => {
    let fetchString = `http://localhost:8080/mealrec/${calType}/${pType}/${fType}/${cType}`;
    const response = await fetch(fetchString, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();
    return { success: true, data: data };
}