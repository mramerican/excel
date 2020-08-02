import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom';
import {createTable} from '@/components/table/table.template';
import {
  matrix,
  shouldResize,
  nextSelector,
} from '@/components/table/table.function';
import {tableResize} from '@/components/table/table.resize';
import {TableSelection} from '@/components/table/TableSelection';

export class Table extends ExcelComponent {
  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'click', 'keydown', 'input'],
      ...options,
    });
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      tableResize(this.$root, event);
    }
  }

  onClick(event) {
    const $selectedElement = $(event.target);
    if ($selectedElement.id()) {
      if (event.shiftKey) {
        const $cells = matrix($selectedElement, this.selection.current)
            .map(id => this.$root.find(`[data-id="${id}"]`));
        this.selection.selectGroup($cells);
      } else {
        this.selectCell($selectedElement);
      }
    }
  }

  onKeydown(event) {
    const keys = [
      'Enter',
      'Tab',
      'ArrowLeft',
      'ArrowRight',
      'ArrowDown',
      'ArrowUp',
    ];
    const {key} = event;

    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault();

      const id = this.selection.current.id(true);
      const $next = this.$root.find(nextSelector(key, id));
      this.selectCell($next);
    }
  }

  onInput(event) {
    this.$emit('table:input', $(event.target));
  }

  selectCell($cell) {
    this.selection.select($cell);
    this.$emit('table:select', $cell);
  }

  prepare() {
    this.selection = new TableSelection();
  }

  init() {
    super.init();
    this.selectCell(this.$root.find('[data-id="1:1"]'));

    this.$on('formula:input', text => {
      this.selection.current.text(text);
    });

    this.$on('formula:enter', (event) => {
      event.preventDefault();
      this.selection.current.focus();
    });
  }

  toHTML() {
    return createTable(20);
  }
}
