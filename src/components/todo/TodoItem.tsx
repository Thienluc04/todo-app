import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Checkbox } from '@/components/checkbox';
import { IconPencil, IconTrash } from '@/components/icons';
import { selectListTodo, todoActions } from '@/features/todo/todoSlice';
import { Todo } from '@/models/todo';
import { PropsWithChildren } from 'react';

export interface TodoItemProps {
  item: Todo;
  onUpdate?: () => void;
}

export function TodoItem({ item, onUpdate }: PropsWithChildren<TodoItemProps>) {
  const dispatch = useAppDispatch();

  const currentTodoList = useAppSelector(selectListTodo);

  const handleRemoveTodo = (id: string) => {
    dispatch(todoActions.removeTodo(id));
    if (currentTodoList.length === 1) {
      localStorage.removeItem('todo_list');
    }
  };

  const handleUpdateItem = () => {
    if (item.status === 'Complete') {
      dispatch(todoActions.updateTodo({ ...item, id: item.id, status: 'Incomplete' }));
    } else {
      dispatch(todoActions.updateTodo({ ...item, id: item.id, status: 'Complete' }));
    }
  };

  return (
    <div className="flex items-center justify-between p-3 bg-white rounded-xl dark:bg-slate-800 dark:text-slate-500 max-h-16">
      <div className="flex items-center gap-3">
        <Checkbox
          status={item.status}
          onChange={() => {
            handleUpdateItem();
          }}
        ></Checkbox>
        <div>
          <h3 className={`${item.status === 'Complete' ? 'line-through' : ''}`}>{item.title}</h3>
          <p>{item.date}</p>
        </div>
      </div>
      <div className="flex gap-3">
        <button
          className="p-2 text-gray-700 bg-gray-200 rounded-lg"
          onClick={() => handleRemoveTodo(item.id)}
        >
          <IconTrash></IconTrash>
        </button>
        <button className="p-2 text-gray-700 bg-gray-200 rounded-lg" onClick={onUpdate}>
          <IconPencil></IconPencil>
        </button>
      </div>
    </div>
  );
}
