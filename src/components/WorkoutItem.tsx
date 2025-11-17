import React from 'react';
import type { Workout } from '../types';

interface WorkoutItemProps {
  workout: Workout;
  onDelete: (id: string) => void;
}

const WorkoutItem: React.FC<WorkoutItemProps> = ({ workout, onDelete }) => {
  return (
    <tr className="workout-item">
      <td>{workout.date}</td>
      <td>{workout.kilometers.toFixed(1)}</td>
      <td>
        <button 
          onClick={() => onDelete(workout.id)}
          className="delete-btn"
          aria-label="Удалить запись"
        >
          ✖
        </button>
      </td>
    </tr>
  );
};

export default WorkoutItem;