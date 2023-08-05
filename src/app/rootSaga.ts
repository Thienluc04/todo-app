import { all } from 'redux-saga/effects';
import todoSaga from '../features/todo/todoSaga';

export default function* rootSaga() {
  yield all([todoSaga()]);
}
