import checkedInputFontOpts from './assets/checked-input-font-opts';
import { getAllowedBackgroundColors } from './utils';
import { makeDiv, makeTag, makeH2, makeCheckedInput } from './utils/dom-utils';

const makeColorSelectorDropdown = (colorsArr, formEl) => {
  const labelText = 'Set The Foreground Color';
  const inputId = 'foregroundColor';
  const colorSelectorDiv = makeDiv(formEl, 'color-selector-div');
  const colorSelectorLabel = makeTag('label', colorSelectorDiv, null, null, labelText);
  colorSelectorLabel.setAttribute('for', inputId);
  const colorSelector = makeTag('select', colorSelectorDiv, inputId);
  colorSelector.name = inputId;

  colorsArr.forEach(({ name, formats }) => {
    const colorOption = makeTag('option', colorSelector, null, null, name);
    colorOption.value = formats.hex;
  });
};

const makeBackgroundColorRadioButtons = (colorsArr, formEl) => {
  const backgroundColorFieldset = makeTag('fieldset', formEl, 'background-color-fieldset');
  makeTag('legend', backgroundColorFieldset, null, null, 'Select The Background Color');

  const getCheckedInputOpts = ({ id, formats, name }) => makeCheckedInput({
    parentOrSelector: backgroundColorFieldset,
    fieldName: 'backgroundColor',
    isChecked: true,
    id: `${id}-radio`,
    value: formats.hex,
    label: name,
  });

  colorsArr
    .filter(getAllowedBackgroundColors)
    .forEach(getCheckedInputOpts);
};

const makeFontSelectorRadioButtons = (formEl) => {
  const fontFieldset = makeTag('fieldset', formEl, 'font-fieldset');
  makeTag('legend', fontFieldset, null, null, 'Select The Font');

  checkedInputFontOpts.forEach((fontOpts) => {
    makeCheckedInput({ parentOrSelector: fontFieldset, ...fontOpts });
  });
};

const createFormElements = (colorsArr, mainEl) => {
  const formEl = makeTag('form', mainEl, 'color-form');
  const backgroundResultDiv = makeDiv(formEl, 'background-result');
  const foregroundResultH2 = makeH2('How do I look?', backgroundResultDiv);

  makeColorSelectorDropdown(colorsArr, formEl);
  makeBackgroundColorRadioButtons(colorsArr, formEl);
  makeFontSelectorRadioButtons(formEl);

  return { formEl, backgroundResultDiv, foregroundResultH2 };
};

const makeForm = (colorsArr, mainEl) => {
  const {
    formEl,
    formEl: { font, isItalic, foregroundColor, backgroundColor },
    backgroundResultDiv, foregroundResultH2,
  } = createFormElements(colorsArr, mainEl);

  foregroundResultH2.style.color = foregroundColor.value;
  backgroundResultDiv.style.backgroundColor = backgroundColor.value;

  formEl.addEventListener('change', () => {
    const fontName = `${font.value}${isItalic.checked ? ' Italic' : ''}`;
    foregroundResultH2.style.fontFamily = fontName;
    foregroundResultH2.style.color = foregroundColor.value;
    backgroundResultDiv.style.backgroundColor = backgroundColor.value;
  });
};

export default makeForm;
