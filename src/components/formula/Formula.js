import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom';

export class Formula extends ExcelComponent {
  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keyup'],
      subscribe: ['currentText'],
      ...options,
    });
  }

  toHTML() {
    return `
      <div class="info">fx</div>
      <div id="formula" class="input" contenteditable spellcheck="false"></div>
    `;
  }

  storeChange({currentText}) {
    this.$formula.text(currentText);
  }

  init() {
    super.init();
    this.$formula = this.$root.find('#formula');
    this.$on(
        'table:select',
        $cell => this.$formula.text($cell.attr('data-value')),
    );
  }

  onInput(event) {
    this.$emit('formula:input', $(event.target).text());
  }

  onKeyup(event) {
    const keys = ['Enter', 'Tab'];
    if (keys.includes(event.key)) {
      this.$emit('formula:enter', event);
    }
  }
}
