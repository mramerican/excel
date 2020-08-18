export const parse = (value = '') => {
  if (value.startsWith('=')) {
    try {
      return eval(value.slice(1));
    } catch (e) {
      console.log(e.message);
    }
  }
  return value;
};
