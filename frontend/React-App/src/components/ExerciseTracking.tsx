import React, { useState } from 'react';

export const ExerciseTracking = () => {
  // State to track the current page (home or add workout)
  const [currentPage, setCurrentPage] = useState<'home' | 'addWorkout'>('home');
  
  // list of exercises
  const [exercises, setExercises] = useState([
    { id: 1, name: 'Push Ups', sets: 3, reps: 15, date: '2024-11-22' },
    { id: 2, name: 'Squats', sets: 4, reps: 12, date: '2024-11-20' },
  ]);

  // current workout being edited
  const [currentExercise, setCurrentExercise] = useState<{
    id?: number;
    name: string;
    sets: number;
    reps: number;
    date: string;
  }>({
    name: '',
    sets: 0,
    reps: 0,
    date: '',
  });

  const styles = {
    page: { padding: '20px', fontFamily: 'Arial, sans-serif' },
    button: {
      padding: '10px 15px',
      fontSize: '16px',
      borderRadius: '5px',
      border: 'none',
      cursor: 'pointer',
    },
    greenButton: {
      backgroundColor: '#008000',
      color: 'white',
    },
    redButton: {
      backgroundColor: '#ff0000',
      color: 'white',
    },
    card: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '15px',
      marginBottom: '10px',
      backgroundColor: '#f9f9f9',
    },
    input: {
      padding: '8px',
      fontSize: '14px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      marginBottom: '15px',
    },
    formActions: { display: 'flex', justifyContent: 'space-between' },
  };

  // adding a workout
  const handleAddWorkout = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentExercise.id) {
      setExercises(exercises.map((exercise) => 
        exercise.id === currentExercise.id ? currentExercise : exercise
      ));
    } else {
      setExercises([
        ...exercises,
        {
          id: Math.max(...exercises.map((e) => e.id)) + 1, 
          ...currentExercise,
        }
      ]);
    }
    
    setCurrentPage('home'); 
    setCurrentExercise({ name: '', sets: 0, reps: 0, date: '' }); 
  };

  const handleDeleteWorkout = (id: number) => {
    setExercises(exercises.filter((exercise) => exercise.id !== id));
  };

  const handleEditWorkout = (exercise: typeof currentExercise) => {
    setCurrentExercise(exercise);
    setCurrentPage('addWorkout');
  };

  //Exercise Home Page
  const renderHomePage = () => (
    <div style={styles.page}>
      <h1>Exercise List</h1>
      <button
        style={{ ...styles.button, ...styles.greenButton }}
        onClick={() => setCurrentPage('addWorkout')}
      >
        + Add Exercise
      </button>
      <div>
        {exercises.map((exercise) => (
          <div key={exercise.id} style={styles.card}>
            <div>
              <h2>{exercise.name}</h2>
              <p>Sets: {exercise.sets}</p>
              <p>Reps: {exercise.reps}</p>
              <p>Date: {exercise.date}</p>
            </div>
            <div>
              <button
                style={{ ...styles.button, ...styles.greenButton }}
                onClick={() => handleEditWorkout(exercise)}
              >
                Edit
              </button>
              <button
                style={{ ...styles.button, ...styles.redButton }}
                onClick={() => handleDeleteWorkout(exercise.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Add Workout Page
  const renderAddWorkoutPage = () => (
    <div style={styles.page}>
      <h1>{currentExercise.id ? 'Edit Exercise' : 'Add Exercise'}</h1>
      <form onSubmit={handleAddWorkout}>
        <label>
          Exercise Name:
          <input
            type="text"
            value={currentExercise.name}
            onChange={(e) => setCurrentExercise({ ...currentExercise, name: e.target.value })}
            placeholder="Enter exercise name"
            style={styles.input}
          />
        </label>
        <label>
          Sets:
          <input
            type="number"
            value={currentExercise.sets}
            onChange={(e) => setCurrentExercise({ ...currentExercise, sets: +e.target.value })}
            placeholder="Enter sets"
            style={styles.input}
          />
        </label>
        <label>
          Reps:
          <input
            type="number"
            value={currentExercise.reps}
            onChange={(e) => setCurrentExercise({ ...currentExercise, reps: +e.target.value })}
            placeholder="Enter reps"
            style={styles.input}
          />
        </label>
        <label>
          Date:
          <input
            type="date"
            value={currentExercise.date}
            onChange={(e) => setCurrentExercise({ ...currentExercise, date: e.target.value })}
            style={styles.input}
          />
        </label>
        <div style={styles.formActions}>
          <button
            type="button"
            style={{ ...styles.button, backgroundColor: '#ccc', color: 'black' }}
            onClick={() => setCurrentPage('home')}
          >
            Back
          </button>
          <button
            type="submit"
            style={{ ...styles.button, ...styles.greenButton }}
          >
            Save Exercise
          </button>
        </div>
      </form>
    </div>
  );

  
  return currentPage === 'home' ? renderHomePage() : renderAddWorkoutPage();
};

export default ExerciseTracking;
