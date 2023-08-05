import { useEffect, useState, useRef } from 'react';
import './App.scss';
import { StatusTodo, Todo } from '@/models/todo';
import { Model } from '@/components/model';
import { useTranslation, initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import { TodoItem, TodoList } from '@/components/todo';
import { selectListTodo } from '@/features/todo/todoSlice';
import { useAppSelector } from '@/app/hooks';
import { Head } from '@/components/common';

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
  const currentTodoList = useAppSelector(selectListTodo);

  const [todoList, setTodoList] = useState<Todo[]>([]);

  const [showModel, setShowModel] = useState<boolean>(false);
  const [statusAdd, setStatusAdd] = useState<StatusTodo>('Incomplete');
  const [statusUpdate, setStatusUpdate] = useState<StatusTodo>('Incomplete');
  const [isUpdateModel, setIsUpdateModel] = useState<boolean>(false);
  const [currentItem, setCurrentItem] = useState<Todo>();
  const [isDarkMode, setIsDarkMode] = useState<boolean | null>(null);

  const titleRef = useRef<HTMLInputElement>(null);
  const appRef = useRef<HTMLDivElement>(null);

  const { t, i18n } = useTranslation();

  useEffect(() => {
    setTodoList(currentTodoList);
  }, [currentTodoList]);

  useEffect(() => {
    if (localStorage.getItem('darkMode')) {
      const theme: boolean = JSON.parse(String(localStorage.getItem('darkMode')));
      setIsDarkMode(theme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    if (isDarkMode) {
      appRef.current?.classList.add('dark');
    } else {
      appRef.current?.classList.remove('dark');
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

  return (
    <div className="w-full min-h-[100vh] pt-10" ref={appRef}>
      <div className="max-w-[600px] mx-auto ">
        <Head
          setListTodo={(list) => setTodoList(list)}
          onAddTask={() => setShowModel(true)}
          onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
          isDarkMode={Boolean(isDarkMode)}
        ></Head>
        <TodoList>
          {todoList.map((item) => (
            <TodoItem
              item={item}
              key={item.id}
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
              onAction={() => {
                setShowModel(false);
                setStatusAdd('Incomplete');
              }}
              isUpdate={false}
              statusAdd={statusAdd}
            ></Model>
          ) : (
            <Model
              onClose={() => {
                setShowModel(false);
                setIsUpdateModel(false);
              }}
              titleRef={titleRef}
              onChangeStatus={(e) => setStatusUpdate(e.target.value as StatusTodo)}
              onAction={() => {
                setShowModel(false);
                setIsUpdateModel(false);
              }}
              isUpdate={true}
              currentItem={currentItem}
              statusUpdate={statusUpdate}
            ></Model>
          ))}
      </div>
    </div>
  );
}

export default App;
