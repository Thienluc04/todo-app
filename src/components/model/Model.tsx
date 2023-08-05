import { memo } from 'react';
import { Todo } from '../../models/todo';
import { useTranslation } from 'react-i18next';

export interface ModelProps {
  onClose: () => void;
  titleRef: React.RefObject<HTMLInputElement>;
  onChangeStatus: React.ChangeEventHandler<HTMLSelectElement>;
  onAction: (id?: number) => void;
  isUpdate?: boolean;
  currentItem?: Todo;
}

export const Model = memo(
  ({ onClose, titleRef, onChangeStatus, onAction, isUpdate, currentItem }: ModelProps) => {
    const { t } = useTranslation();

    return (
      <>
        <div className="fixed inset-0 bg-black opacity-40"></div>
        <div className="fixed p-5 bg-gray-100 rounded-xl w-[400px] left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 z-10 dark:bg-slate-600">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-semibold text-gray-500 dark:text-slate-300">
              {t(isUpdate ? 'Update Task' : 'Add Task')}
            </h2>
            <button onClick={onClose} className="dark:text-slate-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                style={{ fill: 'currentcolor', transform: '', msFilter: '' }}
              >
                <path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z" />
              </svg>
            </button>
          </div>
          <div className="flex flex-col gap-2 mb-3 ">
            <p className="dark:text-slate-300">{t('Title')}</p>
            <input
              type="text"
              ref={titleRef}
              defaultValue={currentItem?.title}
              className="h-10 p-2 bg-white border border-gray-500 rounded-lg dark:bg-slate-200"
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="dark:text-slate-300">{t('Status')}</p>
            <select
              name="satusTodoAdd"
              value={currentItem?.status}
              onChange={onChangeStatus}
              id=""
              className="h-10 p-2 bg-white border border-gray-500 rounded-lg cursor-pointer dark:bg-slate-200"
            >
              <option value="Incomplete">{t('Incomplete')}</option>
              <option value="Complete">{t('Complete')}</option>
            </select>
          </div>
          <div className="flex gap-2 mt-8">
            <button
              className="px-5 py-3 text-white bg-blue-500 rounded-lg"
              onClick={() => onAction()}
            >
              {t(isUpdate ? 'Update Task' : 'Add Task')}
            </button>
            <button
              className="px-5 py-3 text-gray-500 bg-gray-300 rounded-lg dark:text-slate-700"
              onClick={onClose}
            >
              {t('Cancel')}
            </button>
          </div>
        </div>
      </>
    );
  },
);
