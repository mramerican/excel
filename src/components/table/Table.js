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
import * as actions from '@/redux/action';
import {defaultStyle} from '@/components/toolbar/config';
import {parse} from '@core/parse';

export class Table extends ExcelComponent {
  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'click', 'keydown', 'input'],
      ...options,
    });
  }

  async resizeTable(event) {
    try {
      const data = await tableResize(this.$root, event);
      this.$dispatch(actions.tableResize(data));
    } catch (e) {
      console.log('Resize ERROR:', e.message());
    }
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      this.resizeTable(event);
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
    this.updateTextInStore($(event.target).text());
  }

  selectCell($cell) {
    this.selection.select($cell);
    this.$emit('table:select', $cell);
    const styles = $cell.getStyles(Object.keys(defaultStyle));
    this.$dispatch(actions.changeStyles(styles));
  }

  prepare() {
    this.selection = new TableSelection();
  }

  init() {
    super.init();
    this.selectCell(this.$root.find('[data-id="1:1"]'));

    this.$on('formula:input', text => {
      this.selection.current
          .attr('data-value', text)
          .text(parse(text));
      this.updateTextInStore(text);
    });

    this.$on('formula:enter', (event) => {
      event.preventDefault();
      this.selection.current.focus();
    });

    this.$on('toolbar:applyStyle', (value) => {
      this.selection.applyStyle(value);
      this.$dispatch(actions.applyStyle({
        value,
        ids: this.selection.selectedIds,
      }));
    });
  }

  toHTML() {
    return createTable(20, this.store.getState());
  }

  updateTextInStore(value) {
    this.$dispatch(actions.changeText({
      id: this.selection.current.id(),
      value: value,
    }));
  }
}
