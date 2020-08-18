import {toInlineStyles} from '@core/utils';
import {defaultStyle} from '@/components/toolbar/config';
import {parse} from '@core/parse';

const CHAR_CODES = {
  A: 65,
  Z: 90,
};

const DEFAULT_WIDTH = 120;
const DEFAULT_HEIGHT = 24;

const getWidth = (state, column) => (state[column] || DEFAULT_WIDTH) + 'px';
const getHeight = (state, row) => (state[row] || DEFAULT_HEIGHT) + 'px';
const getContent = (state, cell) => state[cell] || '';

const toCell = ({colState, dataState, stylesState}, row) => (_, column) => {
  const columnName = toChar(null, column);
  const idCell = `${row}:${column + 1}`;
  const content = getContent(dataState, idCell);
  const styles = toInlineStyles({...defaultStyle, ...stylesState[idCell]});
  return `<div 
      class="cell" 
      contenteditable 
      data-col="${columnName}" 
      data-id="${idCell}"
      data-value="${content}"
      style="${styles};width: ${getWidth(colState, columnName)}"
    >
      ${parse(content)}
    </div>`;
};

const toColumn = ({column, width}) => `
  <div 
    class="column" 
    data-type="resizable" 
    data-col="${column}" 
    style="width: ${width}"
  >
    ${column}
    <div class="col-resize" data-resize="col"></div>
  </div>`;

const createRow = (data, row = '', {rowState}) =>
  `<div 
      class="row" 
      data-type="resizable" 
      data-row="${row}" 
      style="height: ${getHeight(rowState, row)}"
    >
      <div class="row-info">
        ${row}
        ${row ? `<div class="row-resize" data-resize="row"></div>` : ''}
      </div>
      <div class="row-data">${data}</div>
    </div>
  `;

const toChar = (_, index) => String.fromCharCode(CHAR_CODES.A + index);

const getWidthFromState = (state) => (column) => ({
  column,
  width: getWidth(state.colState, column),
});

export const createTable = (rowsCount = 1, state = {}) => {
  const colsCount = CHAR_CODES.Z - CHAR_CODES.A + 1;
  const rows = [];

  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(getWidthFromState(state))
      .map(toColumn)
      .join('');

  rows.push(createRow(cols, '', state));

  for (let row = 1; row <= rowsCount; row++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(toCell(state, row))
        .join('');
    rows.push(createRow(cells, row, state));
  }

  return rows.join('');
};
