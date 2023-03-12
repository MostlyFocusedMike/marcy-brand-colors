import { COPY_TEXT } from './constants';
import { copyToClipboard } from './utils';
import {
  makeTag,
  makeDiv,
  makeH2,
  makeH3,
} from './utils/dom-utils';

const makeFormatCopyButtonsDiv = (colorCardDiv, colorObj) => {
  const buttonsDiv = makeDiv(colorCardDiv, null, 'buttons-div');

  const makeButton = (colorType) => {
    const copyBtnText = `Copy ${colorType}`;
    const colorCopyBtn = makeTag('button', buttonsDiv, null, null, copyBtnText);
    colorCopyBtn.dataset[COPY_TEXT] = colorObj.formats[colorType];
  };

  Object.keys(colorObj.formats).forEach(makeButton);
  return buttonsDiv;
};

const makeColorListCards = (colorsArr, mainEl) => {
  const colorListEl = makeTag('ul', mainEl, 'color-list');

  const makeColorCars = (colorObj) => {
    const colorItemEl = makeTag('li', colorListEl, null, colorObj.type);
    const colorCardDiv = makeDiv(colorItemEl, colorObj.id, 'color-card');
    colorCardDiv.style.backgroundColor = colorObj.formats.hex;
    const cardLightness = colorObj.isDark ? 'dark-card' : 'light-card';
    colorCardDiv.classList.add(cardLightness);

    makeH2(colorObj.name.toUpperCase(), colorCardDiv);
    makeH3(colorObj.type, colorCardDiv);
    makeFormatCopyButtonsDiv(colorCardDiv, colorObj);
  };
  colorsArr.forEach(makeColorCars);

  colorListEl.addEventListener('click', copyToClipboard);
};

export default makeColorListCards;
