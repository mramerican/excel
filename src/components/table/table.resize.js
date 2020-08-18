import {$} from '@core/dom';

export const tableResize = ($root, event) => {
  return new Promise(resolve => {
    const $resizer = $(event.target);
    const $parent = $resizer.closest('[data-type="resizable"]');
    const coords = $parent.getCoords();
    const type = $resizer.data.resize;
    let targetsResize = [];
    let value = 0;

    $resizer.css({opacity: 1});
    if (type === 'col') {
      $resizer.css({bottom: '-5000px'});
      // eslint-disable-next-line max-len
      targetsResize = $root.findAll(`[data-col="${$parent.data.col}"]`);
    } else {
      $resizer.css({right: '-5000px'});
      targetsResize = [$parent.$el];
    }

    document.onmousemove = e => {
      if (type === 'col') {
        const delta = e.pageX - coords.right;
        value = coords.width + delta;
        $resizer.css({right: -delta + 'px'});
      } else {
        const delta = e.pageY - coords.bottom;
        value = coords.height + delta;
        $resizer.css({bottom: -delta + 'px'});
      }
    };

    document.onmouseup = () => {
      document.onmousemove = null;
      document.onmouseup = null;

      if (value) {
        targetsResize.forEach(el => {
          if (type === 'col') {
            $(el).css({width: value + 'px'});
          } else {
            $(el).css({height: value + 'px'});
          }
        });
      }

      resolve({
        value,
        id: $parent.data[type],
        type,
      });
      $resizer.$el.removeAttribute('style');
    };
  });
};
