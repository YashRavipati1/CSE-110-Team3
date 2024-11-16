export type moodAnswers = {
    happiness: number;
    stress: number;
    energy: number;
};

export type moodEntry = {
    _id: string;
    happiness: number;
    stress: number;
    energy: number;
    date: string;
    evaluatedMood : string
}

export const createMoodEntry = async (answers: moodAnswers) => {
    const entry = {
        happiness: answers.happiness,
        stress: answers.stress,
        energy: answers.energy,
        date: new Date().toISOString(),
        evaluatedMood : ""
    }
    // Change hardcoded port to .env port
    const response = await fetch('http://localhost:8080/mood', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(entry),
    });
    const data = await response.json();
    return {success: true, id: data.insertedId}
};
