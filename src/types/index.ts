export interface Workout {
  id: string;
  date: string; // формат DD.MM.YY
  kilometers: number;
}

export interface WorkoutFormData {
  date: string;
  kilometers: string;
}