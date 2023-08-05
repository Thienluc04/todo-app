export interface Todo {
  id: string;
  title: string;
  date: string;
  status: StatusTodo;
}

export type StatusTodo = 'Incomplete' | 'Complete' | 'All';
