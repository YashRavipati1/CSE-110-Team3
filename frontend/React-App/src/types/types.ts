// Zere: Interface for the meal object
export interface Meal {
    _id: string;
    name: string;
    type?: string;  // Make type optional if not all records have this field
    calories: number;
    protein: number;
    fats: number;
    carbohydrates: number;
    date: string;
    user: string;
}

export interface NutritionRecord {

    name: string;
    user: string;
    date: string;
    calories: number;
    carbohydrates: number;
    fats: number;
    protein: number;
}