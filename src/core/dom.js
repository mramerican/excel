class Dom {
  constructor(select) {
    this.$el = typeof select === 'string'
      ? document.querySelector(select)
      : select;
  }

  html(content) {
    if (typeof content === 'string') {
      this.$el.innerHTML = content;
    }
    this.$el.outerHTML.trim();
    return this;
  }

  text(text) {
    if (typeof text === 'string') {
      this.$el.textContent = text;
      return this;
    }
    if (this.$el.tagName.toLowerCase() === 'input') {
      return this.$el.value.trim();
    }
    return this.$el.textContent.trim();
  }

  clear() {
    return this.html('');
  }

  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback);
  }

  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback);
  }

  appendChild(node) {
    if (node instanceof Dom) {
      node = node.$el;
    }
    if (Element.prototype.append) {
      this.$el.append(node);
    } else {
      this.$el.appendChild(node);
    }
    return this;
  }

  closest(selector) {
    return $(this.$el.closest(selector));
  }

  getCoords() {
    return this.$el.getBoundingClientRect();
  }

  findAll(selector) {
    return this.$el.querySelectorAll(selector);
  }

  find(selector) {
    return $(this.$el.querySelector(selector));
  }

  css(styles = {}) {
    Object.keys(styles).forEach(key => this.$el.style[key] = styles[key]);
  }

  addClass(className) {
    this.$el.classList.add(className);
    return this;
  }

  removeClass(className) {
    this.$el.classList.remove(className);
    return this;
  }

  id(parse) {
    if (parse) {
      const [row, col] = this.id().split(':');
      return {
        row: Number(row),
        col: Number(col),
      };
    }
    return this.data.id;
  }

  focus() {
    this.$el.focus();
    return this;
  }

  get data() {
    return this.$el.dataset;
  }
}

export function $(select) {
  return new Dom(select);
}

$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName);
  if (classes) {
    el.classList.add(classes);
  }
  return $(el);
};
