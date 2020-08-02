import {$} from '@core/dom';
import {Emitter} from '@core/Emitter';

export class Excel {
  constructor(selector, options) {
    this.$el = $(selector);
    this.components = options.components || [];
    this.emitter = new Emitter();
  }

  getRoot() {
    const baseClassName = 'excel';
    const $root = $.create('div', baseClassName);
    const componentOptions = {
      emitter: this.emitter,
    };

    this.components = this.components.map(Component => {
      const $el = $.create(
          'div',
          `${baseClassName}__${Component.name.toLowerCase()}`,
      );
      const component = new Component($el, componentOptions);
      $el.html(component.toHTML());
      $root.appendChild($el);
      return component;
    });

    return $root;
  }

  render() {
    this.$el.appendChild(this.getRoot());
    this.components.forEach(component => component.init());
  }

  destroy() {
    this.components.forEach(component => component.destroy());
  }
}
