// Zere: Interface for the meal object

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


