import {
  CHANGE_TEXT,
  TABLE_RESIZE,
  CHANGE_TITLE,
  CHANGE_STYLES,
  APPLY_STYLE,
} from '@/redux/type';

export const rootReducer = (state, action) => {
  let field;
  switch (action.type) {
    case TABLE_RESIZE:
      field = action.data.type === 'col' ? 'colState' : 'rowState';
      return {...state, [field]: value(state, field, action)};
    case CHANGE_TEXT:
      return {
        ...state,
        currentText: action.data.value,
        dataState: value(state, 'dataState', action),
      };
    case CHANGE_TITLE: return {...state, title: action.title};
    case CHANGE_STYLES: return {...state, currentStyles: action.data};
    case APPLY_STYLE: return {
      ...state,
      stylesState: value(state, 'stylesState', action),
      currentStyles: {
        ...state.currentStyles,
        ...action.data.value,
      },
    };
    default: return state;
  }
};

const value = (state, field, action) => {
  const val = state[field] || {};
  if (action.data.ids) {
    action.data.ids.forEach(id => val[id] = {...val[id], ...action.data.value});
  } else {
    val[action.data.id] = action.data.value;
  }
  return val;
};
