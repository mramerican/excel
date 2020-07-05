import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {shouldResize} from '@/components/table/table.function';
import {tableResize} from '@/components/table/table.resize';

export class Table extends ExcelComponent {
  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown'],
    });
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      tableResize(this.$root, event);
    }
  }

  toHTML() {
    return createTable(20);
  }
}
