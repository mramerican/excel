import {
  CHANGE_TEXT,
  TABLE_RESIZE,
  CHANGE_TITLE,
  CHANGE_STYLES,
  APPLY_STYLE,
} from '@/redux/type';

export const tableResize = (data) => ({
  type: TABLE_RESIZE,
  data,
});

export const changeText = (data) => ({
  type: CHANGE_TEXT,
  data,
});

export const changeTitle = (title) => ({
  type: CHANGE_TITLE,
  title,
});

export const changeStyles = (data) => ({
  type: CHANGE_STYLES,
  data,
});

export const applyStyle = (data) => ({
  type: APPLY_STYLE,
  data,
});
