import { put, select, takeEvery } from 'redux-saga/effects';
import { selectListTodo, todoActions } from './todoSlice';
import { Todo } from '../../models/todo';
import { PayloadAction } from '@reduxjs/toolkit';

function* hanldeUpdateTodo({ payload }: PayloadAction<Todo>) {
  const listTodo: Todo[] = yield select(selectListTodo);

  const newList: Todo[] = listTodo.map((item) => {
    if (item.id === payload.id) {
      return {
        ...payload,
      };
    }
    return item;
  });

  yield put(todoActions.setListTodo(newList));
}

export default function* todoSaga() {
  yield takeEvery(todoActions.updateTodo, hanldeUpdateTodo);
}
