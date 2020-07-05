const CHAR_CODES = {
  A: 65,
  Z: 90,
};

const toCell = (cell) => `<div class="cell" contenteditable>${cell}</div>`;
const toColumn = (column) => `<div class="column">${column}</div>`;

const createRow = (data, info = '') => `
  <div class="row">
    <div class="row-info">${info}</div>
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
        .map(toCell)
        .join('');
    rows.push(createRow(cells, i));
  }

  return rows.join('');
};
