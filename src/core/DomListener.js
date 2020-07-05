import {capitalize} from '@core/utils';

export class DomListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error('No $root');
    }
    this.$root = $root;
    this.listeners = listeners;
  }

  initDOMListeners() {
    this.listeners.forEach(listener => {
      const methodName = getMethodName(listener);
      if (!this[methodName]) {
        const name = this.name || '';
        // eslint-disable-next-line max-len
        throw new Error(`Method ${methodName} is not implemented in ${name} Component`);
      }
      this[methodName] = this[methodName].bind(this);
      this.$root.on(listener, this[methodName]);
    });
  }

  removeDOMListeners() {
    this.listeners.forEach(listener => {
      const methodName = getMethodName(listener);
      if (this[methodName]) {
        this.$root.off(listener, this[methodName]);
      }
    });
  }
}

const getMethodName = (eventName) => {
  return `on${capitalize(eventName)}`;
};
