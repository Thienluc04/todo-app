import { useEffect, useState, useRef } from 'react';
import './App.scss';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { selectListTodo, todoActions } from './features/todo/todoSlice';
import { StatusTodo, Todo } from './models/todo';
import { TodoItem, TodoList } from './modules/todo';
import { Model } from './components/model';
import { v4 } from 'uuid';
import { useTranslation, initReactI18next } from 'react-i18next';
import i18n from 'i18next';

i18n.use(initReactI18next).init({
  resources: {
    vn: {
      translation: {
        'TODO LIST': 'Danh sách việc cần làm',
        'Dark mode': 'Chế độ ban đêm',
        Off: 'Tắt',
        On: 'Bật',
        'Add Task': 'Thêm nhiệm vụ',
        All: 'Tất cả',
        Incomplete: 'Chưa hoàn thành',
        Complete: 'Hoàn thành',
        Title: 'Tiêu đề',
        Status: 'Trạng thái',
        Cancel: 'Bỏ qua',
        'Update Task': 'Cập nhật nhiệm vụ',
        Language: 'Ngôn ngữ',
        'No Todos': 'Không có nhiệm vụ',
      },
    },
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

function App() {
  const dispatch = useAppDispatch();

  const selectTodos = useAppSelector(selectListTodo);

  const [todoList, setTodoList] = useState<Todo[]>([]);

  const [showModel, setShowModel] = useState<boolean>(false);
  const [statusAdd, setStatusAdd] = useState<StatusTodo>('Incomplete');
  const [statusUpdate, setStatusUpdate] = useState<StatusTodo>('Incomplete');
  const [isUpdateModel, setIsUpdateModel] = useState<boolean>(false);
  const [currentItem, setCurrentItem] = useState<Todo>();
  const [isDarkMode, setIsDarkMode] = useState<boolean | null>(null);

  const titleRef = useRef<HTMLInputElement>(null);

  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (selectTodos.length > 0) {
      localStorage.setItem('todo_list', JSON.stringify(selectTodos));
    }
  }, [selectTodos]);

  useEffect(() => {
    if (localStorage.getItem('todo_list')) {
      const list: Todo[] = JSON.parse(String(localStorage.getItem('todo_list')));
      dispatch(todoActions.setListTodo(list));
    }
  }, []);

  useEffect(() => {
    setTodoList(selectTodos);
  }, [selectTodos]);

  useEffect(() => {
    if (localStorage.getItem('darkMode')) {
      const theme: boolean = JSON.parse(String(localStorage.getItem('darkMode')));
      setIsDarkMode(theme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    if (localStorage.getItem('language')) {
      i18n.changeLanguage(String(localStorage.getItem('language')));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('language', i18n.language);
  }, [i18n.language]);

  const handleAddTodo = () => {
    setShowModel(false);
    setStatusAdd('Incomplete');
    const input = titleRef.current;

    dispatch(
      todoActions.addTodo({
        id: v4(),
        title: input?.value as string,
        status: statusAdd,
        date: new Date().toISOString().split('T')[0],
      }),
    );
  };

  const handleRemoveTodo = (id: string) => {
    dispatch(todoActions.removeTodo(id));
    if (todoList.length === 1) {
      localStorage.removeItem('todo_list');
    }
  };

  const hanldeUpdateTodo = (id: string) => {
    setShowModel(false);
    setIsUpdateModel(false);

    const input = titleRef.current;

    dispatch(
      todoActions.updateTodo({
        id,
        date: new Date().toISOString().split('T')[0],
        status: statusUpdate,
        title: input?.value as string,
      }),
    );
  };

  const handleFilterTodo = (status: string) => {
    if (status === 'All') {
      setTodoList(selectTodos);
    } else {
      const filterList = selectTodos.filter((item) => item.status === status);

      setTodoList(filterList);
    }
  };

  const handleToggleDarkMode = () => {
    document.documentElement.classList.toggle('dark');
    setIsDarkMode(!isDarkMode);
  };

  const hanldeChangeLanguage = () => {
    if (i18n.language === 'vn') {
      i18n.changeLanguage('en');
    } else {
      i18n.changeLanguage('vn');
    }
  };

  return (
    <div>
      <div className="max-w-[600px] mx-auto my-10">
        <div className="flex items-center justify-between">
          <button
            className="px-4 py-2 text-sm text-white bg-black rounded-lg dark:bg-slate-700 dark:text-slate-200"
            onClick={handleToggleDarkMode}
          >
            {t('Dark mode')}: <span>{t(isDarkMode ? 'On' : 'Off')}</span>
          </button>
          <button
            className="px-4 py-2 text-sm text-white bg-gray-500 rounded-lg"
            onClick={hanldeChangeLanguage}
          >
            {t('Language')}: <span className="uppercase">{i18n.language}</span>
          </button>
        </div>
        <h1 className="mb-3 text-2xl font-bold text-center text-gray-500">{t('TODO LIST')}</h1>
        <div className="flex items-center justify-between mb-3">
          <button
            className="px-5 py-3 text-white bg-blue-500 rounded-lg dark:bg-slate-800 dark:text-slate-300"
            onClick={() => setShowModel(true)}
          >
            {t('Add Task')}
          </button>
          <select
            name=""
            id=""
            onChange={(e) => handleFilterTodo(e.target.value)}
            className="flex items-center h-10 px-3 bg-gray-200 rounded-lg cursor-pointer dark:dark:bg-slate-800 dark:text-slate-300"
          >
            <option value="All">{t('All')}</option>
            <option value="Incomplete">{t('Incomplete')}</option>
            <option value="Complete">{t('Complete')}</option>
          </select>
        </div>
        <TodoList>
          {todoList.map((item) => (
            <TodoItem
              item={item}
              key={item.id}
              onRemove={handleRemoveTodo}
              onUpdate={() => {
                setShowModel(true);
                setIsUpdateModel(true);
                setStatusUpdate(item.status);
                setCurrentItem(item);
              }}
            ></TodoItem>
          ))}
          {todoList.length <= 0 && (
            <p className="text-xl font-semibold text-center text-gray-500">{t('No Todos')}</p>
          )}
        </TodoList>
        {showModel &&
          (!isUpdateModel ? (
            <Model
              onClose={() => setShowModel(false)}
              titleRef={titleRef}
              onChangeStatus={(e) => setStatusAdd(e.target.value as StatusTodo)}
              onAction={handleAddTodo}
            ></Model>
          ) : (
            <Model
              onClose={() => {
                setShowModel(false);
                setIsUpdateModel(false);
              }}
              titleRef={titleRef}
              onChangeStatus={(e) => setStatusUpdate(e.target.value as StatusTodo)}
              onAction={() => hanldeUpdateTodo(String(currentItem?.id))}
              isUpdate
              currentItem={currentItem}
            ></Model>
          ))}
      </div>
    </div>
  );
}

export default App;
