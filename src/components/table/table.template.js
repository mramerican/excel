const CHAR_CODES = {
  A: 65,
  Z: 90,
};

const toCell = (column, row) =>
  // eslint-disable-next-line max-len
  `<div class="cell" contenteditable data-col="${column}" data-row="${row}"></div>`;
const toColumn = (column) => `
  <div class="column" data-type="resizable" data-col="${column}">
    ${column}
    <div class="col-resize" data-resize="col"></div>
  </div>`;

const createRow = (data, info = '') => `
  <div class="row" data-type="resizable" data-row="${info}">
    <div class="row-info">
      ${info}
      ${info ? '<div class="row-resize" data-resize="row"></div>' : ''}
    </div>
    <div class="row-data">${data}</div>
  </div>
`;

const toChar = (_, index) => String.fromCharCode(CHAR_CODES.A + index);

export const createTable = (rowsCount = 1) => {
  const colsCount = CHAR_CODES.Z - CHAR_CODES.A + 1;
  const rows = [];

  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(toColumn)
      .join('');

  rows.push(createRow(cols));

  for (let i = 1; i <= rowsCount; i++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(toChar)
        .map((columnName) => toCell(columnName, i))
        .join('');
    rows.push(createRow(cells, i));
  }

  return rows.join('');
};
