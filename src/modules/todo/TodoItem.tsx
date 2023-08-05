import { PropsWithChildren } from 'react';
import { Checkbox } from '../../components/checkbox';
import { Todo } from '../../models/todo';
import { useAppDispatch } from '../../app/hooks';
import { todoActions } from '../../features/todo/todoSlice';

export interface TodoItemProps {
  item: Todo;
  onRemove: (id: string) => void;
  onUpdate?: () => void;
}

export function TodoItem({ item, onRemove, onUpdate }: PropsWithChildren<TodoItemProps>) {
  const dispatch = useAppDispatch();

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
        <Checkbox status={item.status} onChange={handleUpdateItem}></Checkbox>
        <div>
          <h3 className={`${item.status === 'Complete' ? 'line-through' : ''}`}>{item.title}</h3>
          <p>{item.date}</p>
        </div>
      </div>
      <div className="flex gap-3">
        <button
          className="p-2 text-gray-700 bg-gray-200 rounded-lg"
          onClick={() => onRemove(item.id)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            style={{ fill: 'currentcolor', transform: '', msFilter: '' }}
          >
            <path d="M6 7H5v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7H6zm4 12H8v-9h2v9zm6 0h-2v-9h2v9zm.618-15L15 2H9L7.382 4H3v2h18V4z" />
          </svg>
        </button>
        <button className="p-2 text-gray-700 bg-gray-200 rounded-lg" onClick={onUpdate}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="text-gray-700"
          >
            <path d="M8.707 19.707 18 10.414 13.586 6l-9.293 9.293a1.003 1.003 0 0 0-.263.464L3 21l5.242-1.03c.176-.044.337-.135.465-.263zM21 7.414a2 2 0 0 0 0-2.828L19.414 3a2 2 0 0 0-2.828 0L15 4.586 19.414 9 21 7.414z"></path>
          </svg>
        </button>
      </div>
    </div>
  );
}
