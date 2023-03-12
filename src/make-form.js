import { ABC_DIATYPE_FONT, CASLON_FONT } from './constants';
import {
  makeDiv,
  makeTag,
  makeH2,
  makeCheckedInput,
} from './utils/dom-utils';

const makeColorSelectorDropdown = (colorsArr, formEl, labelText, inputId) => {
  const colorSelectorDiv = makeDiv(formEl, 'color-selector-div');
  const colorSelectorLabel = makeTag('label', colorSelectorDiv, null, null, labelText);
  colorSelectorLabel.setAttribute('for', inputId);
  const colorSelector = makeTag('select', colorSelectorDiv, inputId);
  colorSelector.name = inputId;

  colorsArr.forEach((colorObj) => {
    const colorOption = makeTag('option', colorSelector, null, null, colorObj.name);
    colorOption.value = colorObj.formats.hex;
  });
};

const makeBackgroundColorRadioButtons = (colorsArr, formEl) => {
  const backgroundColorFieldset = makeTag('fieldset', formEl, 'background-color-fieldset');
  makeTag('legend', backgroundColorFieldset, null, null, 'Select The Background Color');

  const defaultOpts = {
    parentOrSelector: backgroundColorFieldset,
    fieldName: 'backgroundColor',
    isChecked: true,
  };

  const allowedBackgroundColors = colorsArr.filter((colorObj) => (
    colorObj.type !== 'system' && !colorObj.id.includes('grey')
  ));

  allowedBackgroundColors.forEach((colorObj) => {
    makeCheckedInput({
      ...defaultOpts,
      id: `${colorObj.id}-radio`,
      value: colorObj.formats.hex,
      label: colorObj.name,
    });
  });
};

const makeFontSelectorRadioButtons = (formEl) => {
  const fontFieldset = makeTag('fieldset', formEl, 'font-fieldset');
  makeTag('legend', fontFieldset, null, null, 'Select The Font');

  const defaultOpts = {
    parentOrSelector: fontFieldset,
    fieldName: 'font',
  };

  makeCheckedInput({
    ...defaultOpts,
    id: 'abc-diatype-radio',
    value: ABC_DIATYPE_FONT,
    isChecked: true,
    label: 'ABC Diatype',
    font: ABC_DIATYPE_FONT,
  });

  makeCheckedInput({
    ...defaultOpts,
    id: 'caslon-radio',
    value: CASLON_FONT,
    label: 'Caslon Ionic',
    font: CASLON_FONT,
  });

  makeCheckedInput({
    ...defaultOpts,
    id: 'italic-checkbox',
    fieldName: 'isItalic',
    value: 'italic',
    label: 'Italic',
    type: 'checkbox',
  });
};

const makeForm = (colorsArr, mainEl) => {
  const formEl = makeTag('form', mainEl, 'color-form');
  const backgroundResultDiv = makeDiv(formEl, 'background-result');
  const foregroundResultH2 = makeH2('How do I look?', backgroundResultDiv);

  makeColorSelectorDropdown(colorsArr, formEl, 'Set The Foreground Color', 'foregroundColor');
  makeBackgroundColorRadioButtons(colorsArr, formEl);
  makeFontSelectorRadioButtons(formEl);

  const setResults = () => {
    const font = formEl.isItalic.checked
      ? `${formEl.font.value} Italic`
      : formEl.font.value;
    foregroundResultH2.style.fontFamily = font;
    foregroundResultH2.style.color = formEl.foregroundColor.value;

    backgroundResultDiv.style.backgroundColor = formEl.backgroundColor.value;
  };

  formEl.foregroundColor.value = colorsArr
    .find((({ id }) => id === 'black')).formats.hex;

  setResults();

  formEl.addEventListener('change', setResults);
};

export default makeForm;
