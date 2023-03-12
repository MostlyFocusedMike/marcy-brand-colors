export const makeTag = (tagName, parentOrSelector, id, className, text) => {
  const tag = document.createElement(tagName);
  if (id) tag.id = id;
  if (className) tag.classList.add(className);
  if (text) tag.append(text);
  const parentElement = (typeof parentOrSelector === 'object')
    ? parentOrSelector
    : document.querySelector(parentOrSelector);
  parentElement.append(tag);
  return tag;
};

export const makeDiv = (parentOrSelector, id, className) => (
  makeTag('div', parentOrSelector, id, className)
);

export const makeH2 = (text, parentOrSelector, id, className) => (
  makeTag('h2', parentOrSelector, id, className, text)
);

export const makeH3 = (text, parentOrSelector, id, className) => (
  makeTag('h3', parentOrSelector, id, className, text)
);

export const makeCheckedInput = ({
  parentOrSelector, id, className, fieldName, value, label, font, type = 'radio', isChecked = false,
}) => {
  if (!id || !parentOrSelector || !fieldName || !value || !label) throw new Error('Missing radio Args');
  const radioDiv = makeDiv(parentOrSelector, null, 'radio-div');
  const input = makeTag('input', radioDiv, id, className);
  input.type = type;
  input.name = fieldName;
  input.value = value;
  input.checked = isChecked;

  const labelEl = makeTag('label', radioDiv, null, null, label);
  labelEl.htmlFor = id;
  if (font) labelEl.style.fontFamily = font;
  return radioDiv;
};
