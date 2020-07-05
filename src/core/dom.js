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
