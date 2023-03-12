import colors from './colors';
import './style.css';
import makeForm from './make-form';
import makeColorListCards from './make-color-list';
import { preloadFonts } from './utils';

const main = () => {
  preloadFonts();

  const mainEl = document.querySelector('main');
  makeForm(colors, mainEl);
  makeColorListCards(colors, mainEl);
};

document.addEventListener('DOMContentLoaded', main);
