import React from 'react';
import type { Workout } from '../types';
import WorkoutItem from './WorkoutItem';

interface WorkoutTableProps {
  workouts: Workout[];
  onDelete: (id: string) => void;
}

const WorkoutTable: React.FC<WorkoutTableProps> = ({ workouts, onDelete }) => {
  if (workouts.length === 0) {
    return <div className="no-data">Нет данных о тренировках</div>;
  }

  return (
    <table className="workout-table">
      <thead>
        <tr>
          <th>Дата (ДД.ММ.ГГ)</th>
          <th>Пройдено км</th>
          <th>Действия</th>
        </tr>
      </thead>
      <tbody>
        {workouts.map(workout => (
          <WorkoutItem
            key={workout.id}
            workout={workout}
            onDelete={onDelete}
          />
        ))}
      </tbody>
    </table>
  );
};

export default WorkoutTable;