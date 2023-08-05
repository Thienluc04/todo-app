import { useAppDispatch } from '@/app/hooks';
import { todoActions } from '@/features/todo/todoSlice';
import { StatusTodo, Todo } from '@/models/todo';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { v4 } from 'uuid';
import { IconExit } from '@/components/icons';
import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { Select, Option } from '@/components/common';

export interface ModelProps {
  onClose: () => void;
  titleRef: React.RefObject<HTMLInputElement>;
  onChangeStatus: React.ChangeEventHandler<HTMLSelectElement>;
  onAction: (id?: number) => void;
  isUpdate?: boolean;
  currentItem?: Todo;
  statusUpdate?: StatusTodo;
  statusAdd?: StatusTodo;
}

export const Model = memo(
  ({
    onClose,
    titleRef,
    onChangeStatus,
    onAction,
    isUpdate,
    currentItem,
    statusUpdate,
    statusAdd,
  }: ModelProps) => {
    const { t } = useTranslation();

    const dispatch = useAppDispatch();

    const handleAddTodo = () => {
      onAction();
      const input = titleRef.current;

      dispatch(
        todoActions.addTodo({
          id: v4(),
          title: input?.value as string,
          status: statusAdd as StatusTodo,
          date: new Date().toISOString().split('T')[0],
        }),
      );
    };

    const handleUpdateTodo = (id: string) => {
      onAction();
      const input = titleRef.current;

      dispatch(
        todoActions.updateTodo({
          id,
          date: new Date().toISOString().split('T')[0],
          status: statusUpdate as StatusTodo,
          title: input?.value as string,
        }),
      );
    };

    return (
      <>
        <div className="fixed inset-0 bg-black opacity-40"></div>
        <div className="fixed p-5 bg-gray-100 rounded-xl w-[400px] left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 z-10 dark:bg-slate-600">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-semibold text-gray-500 dark:text-slate-300">
              {t(isUpdate ? 'Update Task' : 'Add Task')}
            </h2>
            <button onClick={onClose} className="dark:text-slate-300">
              <IconExit></IconExit>
            </button>
          </div>
          <div className="flex flex-col gap-2 mb-3 ">
            <p className="dark:text-slate-300">{t('Title')}</p>
            <Input type="text" ref={titleRef} defaultValue={currentItem?.title || ''} />
          </div>
          <div className="flex flex-col gap-2">
            <p className="dark:text-slate-300">{t('Status')}</p>
            <Select
              name="statusTodoAdd"
              value={currentItem?.status}
              onChange={onChangeStatus}
              className="h-10 p-2 bg-white rounded-lg cursor-pointer dark:bg-slate-200"
            >
              <Option value="Incomplete">{t('Incomplete')}</Option>
              <Option value="Complete">{t('Complete')}</Option>
            </Select>
          </div>
          <div className="flex gap-2 mt-8">
            <Button
              onClick={() => {
                isUpdate ? handleUpdateTodo(currentItem?.id + '') : handleAddTodo();
              }}
              className="text-white bg-blue-500"
            >
              {t(isUpdate ? 'Update Task' : 'Add Task')}
            </Button>
            <Button onClick={onClose} className="text-gray-500 bg-gray-300 dark:text-slate-700">
              {t('Cancel')}
            </Button>
          </div>
        </div>
      </>
    );
  },
);
