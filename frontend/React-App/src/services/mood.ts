type MoodAnswers = {
    happiness: number;
    stress: number;
    energy: number;
};

export const createMoodEntry = async (answers: MoodAnswers) => {
    const entry = {
        happiness: answers.happiness,
        stress: answers.stress,
        energy: answers.energy,
        date: new Date().toISOString(),
        evaluatedMood : ""
    }
    console.log(entry);
    // Change hardcoded port to .env port
    const response = await fetch('http://localhost:8080/mood', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(entry),
    });
    const data = await response.json();
    return data.insertedId;
};
