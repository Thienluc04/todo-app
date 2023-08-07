import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Button } from '@/components/button';
import { selectListTodo, todoActions } from '@/features/todo/todoSlice';
import { Todo } from '@/models/todo';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Option, Select } from '.';

export interface HeadProps {
  setListTodo: (list: Todo[]) => void;
  onAddTask: () => void;
  onToggleDarkMode: () => void;
  isDarkMode: boolean;
}

export function Head({ setListTodo, onAddTask, onToggleDarkMode, isDarkMode }: HeadProps) {
  const dispatch = useAppDispatch();

  const currentTodoList = useAppSelector(selectListTodo);

  useEffect(() => {
    if (currentTodoList.length > 0) {
      localStorage.setItem('todo_list', JSON.stringify(currentTodoList));
    }
  }, [currentTodoList]);

  useEffect(() => {
    if (localStorage.getItem('todo_list')) {
      const list: Todo[] = JSON.parse(String(localStorage.getItem('todo_list')));
      dispatch(todoActions.setListTodo(list));
    }
  }, []);

  const { t, i18n } = useTranslation();

  const handleFilterTodo = (status: string) => {
    if (status === 'All') {
      setListTodo(currentTodoList);
    } else {
      const filterList = currentTodoList.filter((item) => item.status === status);
      setListTodo(filterList);
    }
  };

  const handleChangeLanguage = () => {
    if (i18n.language === 'vn') {
      i18n.changeLanguage('en');
    } else {
      i18n.changeLanguage('vn');
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Button
          className="text-sm text-white bg-black dark:bg-slate-700 dark:text-slate-200 !px-4 !py-2"
          onClick={onToggleDarkMode}
        >
          {t('Dark mode')}: <span>{t(isDarkMode ? 'On' : 'Off')}</span>
        </Button>
        <Button
          onClick={handleChangeLanguage}
          className="!px-4 !py-2 text-sm text-white bg-gray-500"
        >
          {t('Language')}: <span className="uppercase">{i18n.language}</span>
        </Button>
      </div>
      <h1 className="mb-3 text-2xl font-bold text-center text-gray-500">{t('TODO LIST')}</h1>
      <div className="flex items-center justify-between mb-3">
        <Button
          className="text-white bg-blue-500 dark:bg-slate-800 dark:text-slate-300"
          onClick={onAddTask}
        >
          {t('Add Task')}
        </Button>
        <Select
          name="filterTodo"
          onChange={(e) => handleFilterTodo(e.target.value)}
          className="flex items-center h-10 px-3 bg-gray-200 rounded-lg cursor-pointer dark:dark:bg-slate-800 dark:text-slate-300"
        >
          <Option value="All">{t('All')}</Option>
          <Option value="Incomplete">{t('Incomplete')}</Option>
          <Option value="Complete">{t('Complete')}</Option>
        </Select>
      </div>
    </>
  );
}
