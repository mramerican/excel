export class TableSelection {
  constructor() {
    this.group = [];
    this.selectedClassName = 'selected';
    this.current = null;
  }

  select($el) {
    this.clear();
    $el.focus().addClass(this.selectedClassName);
    this.group = [$el];
    this.current = $el;
  }

  selectGroup($group = []) {
    this.clear();
    this.group = $group;
    this.group.forEach($el => $el.addClass(this.selectedClassName));
  }

  clear() {
    this.group.forEach($el => $el.removeClass(this.selectedClassName));
    this.group = [];
  }
}
