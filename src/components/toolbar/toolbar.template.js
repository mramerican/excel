import {ICONS, defaultStyle} from '@/components/toolbar/config';

const toButton = (button) => {
  const meta = `
    data-type="button"
    data-value='${JSON.stringify(button.value)}'
  `;
  return `<div 
    class="button ${button.active ? 'active' : ''}"
    ${meta}
  >
    <i class="material-icons" ${meta}>${button.icon}</i>
  </div>`;
};

export const createToolbar = (state) => {
  return ICONS.map((icon) => {
    if (icon.value.fontWeight) {
      icon.active = state.fontWeight !== defaultStyle.fontWeight;
      icon.value = {
        fontWeight: state.fontWeight === 'bold'
          ? defaultStyle.fontWeight
          : 'bold',
      };
    }
    if (icon.value.fontStyle) {
      icon.active = state.fontStyle !== defaultStyle.fontStyle;
      icon.value = {
        fontStyle: state.fontStyle === 'italic'
          ? defaultStyle.fontStyle
          : 'italic',
      };
    }
    if (icon.value.textDecoration) {
      icon.active = state.textDecoration !== defaultStyle.textDecoration;
      icon.value = {
        textDecoration: state.textDecoration === 'underline'
          ? defaultStyle.textDecoration
          : 'underline',
      };
    }
    if (icon.value.textAlign) {
      icon.active = state.textAlign === icon.value.textAlign;
    }
    return toButton(icon);
  }).join('');
};
