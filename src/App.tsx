import React, { useState, useEffect } from 'react';
import type { Workout, WorkoutFormData } from './types';
import { compareDates } from './utils/dateUtils';
import WorkoutForm from './components/WorkoutForm';
import WorkoutTable from './components/WorkoutTable';
import './App.css';

const App: React.FC = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  // Загрузка данных из localStorage при монтировании
  useEffect(() => {
    const savedWorkouts = localStorage.getItem('workouts');
    if (savedWorkouts) {
      setWorkouts(JSON.parse(savedWorkouts));
    }
  }, []);

  // Сохранение в localStorage при изменении данных
  useEffect(() => {
    localStorage.setItem('workouts', JSON.stringify(workouts));
  }, [workouts]);

  const handleAddWorkout = (formData: WorkoutFormData) => {
    const kilometers = parseFloat(formData.kilometers);
    
    if (isNaN(kilometers) || kilometers <= 0) {
      alert('Пожалуйста, введите корректное количество километров');
      return;
    }

    // Проверка формата даты
    if (!/^\d{2}\.\d{2}\.\d{2}$/.test(formData.date)) {
      alert('Пожалуйста, используйте формат ДД.ММ.ГГ');
      return;
    }

    setWorkouts(prevWorkouts => {
      const existingIndex = prevWorkouts.findIndex(w => w.date === formData.date);
      
      if (existingIndex >= 0) {
        // Обновляем существующую запись
        const updatedWorkouts = [...prevWorkouts];
        updatedWorkouts[existingIndex] = {
          ...updatedWorkouts[existingIndex],
          kilometers: updatedWorkouts[existingIndex].kilometers + kilometers
        };
        return updatedWorkouts.sort((a, b) => compareDates(a.date, b.date));
      } else {
        // Добавляем новую запись
        const newWorkout: Workout = {
          id: Date.now().toString(),
          date: formData.date,
          kilometers
        };
        
        const newWorkouts = [...prevWorkouts, newWorkout];
        return newWorkouts.sort((a, b) => compareDates(a.date, b.date));
      }
    });
  };

  const handleDeleteWorkout = (id: string) => {
    setWorkouts(prevWorkouts => prevWorkouts.filter(w => w.id !== id));
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Трекер тренировок</h1>
      </header>
      
      <main className="app-main">
        <WorkoutForm onSubmit={handleAddWorkout} />
        <WorkoutTable workouts={workouts} onDelete={handleDeleteWorkout} />
      </main>
    </div>
  );
};

export default App;