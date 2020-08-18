import {storage} from '@core/utils';
import {defaultStyle} from '@/components/toolbar/config';

const defaultState = {
  rowState: {},
  colState: {},
  dataState: {},
  stylesState: {},
  currentStyles: defaultStyle,
  currentText: '',
  title: 'Новая таблица',
};

export const initialState = storage('excel-state')
  ? storage('excel-state')
  : defaultState;
