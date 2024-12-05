// Zere: Interface for the meal object
export type User = {
    email: string,
    firstName: string,
    lastName: string,
    age: number,
    height: number,
    weight: number,
    weightGoal: number,
    caloriesGoal: number,
    proteinGoal: number,
    fatGoal: number,
    carbGoal: number,
    nutritionRecords: [],
    exerciseRecords: []
}

export interface NutritionEntry {
    _id: string;
    name: string;
    type?: string;
    calories: number;
    protein: number;
    fats: number;
    carbohydrates: number;
    user: string;
    date: Date;
}

export interface NewOrEditedNutritionEntry {
    date: Date;
    name: string;
    type?: string;
    calories: number;
    carbohydrates: number;
    fats: number;
    protein: number;
    user: string;
}

export type MealRec = {
    title: string,
    calories: number,
    protein: number,
    fats: number,
    carbs: number,
    calType: string,
    pType: string,
    fType: string,
    cType: string
}


