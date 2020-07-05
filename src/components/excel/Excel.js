import {$} from '@core/dom';

export class Excel {
  constructor(selector, options) {
    this.$el = $(selector);
    this.components = options.components || [];
  }

  getRoot() {
    const baseClassName = 'excel';
    const $root = $.create('div', baseClassName);

    this.components = this.components.map(Component => {
      const $el = $.create(
          'div',
          `${baseClassName}__${Component.name.toLowerCase()}`,
      );
      const component = new Component($el);
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
