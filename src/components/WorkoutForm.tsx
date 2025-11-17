import React, { useState } from 'react';
import type { WorkoutFormData } from '../types';

interface WorkoutFormProps {
  onSubmit: (data: WorkoutFormData) => void;
}

const WorkoutForm: React.FC<WorkoutFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<WorkoutFormData>({
    date: '',
    kilometers: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.date || !formData.kilometers) {
      alert('Пожалуйста, заполните все поля');
      return;
    }

    onSubmit(formData);
    setFormData({ date: '', kilometers: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="workout-form">
      <div className="form-group">
        <label htmlFor="date">Дата (ДД.ММ.ГГ)</label>
        <input
          type="text"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          placeholder="ДД.ММ.ГГ"
          pattern="\d{2}\.\d{2}\.\d{2}"
          title="Формат: ДД.ММ.ГГ"
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="kilometers">Пройдено км</label>
        <input
          type="number"
          id="kilometers"
          name="kilometers"
          value={formData.kilometers}
          onChange={handleChange}
          placeholder="0.0"
          step="0.1"
          min="0"
        />
      </div>
      
      <button type="submit">Добавить</button>
    </form>
  );
};

export default WorkoutForm;