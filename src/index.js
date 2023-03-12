import colors from './assets/colors';
import makeForm from './make-form';
import makeColorListCards from './make-color-list';
import { preloadFonts } from './utils';
import './assets/styles/globals.css';
import './assets/styles/form.css';
import './assets/styles/header-footer.css';
import './assets/styles/color-list.css';

const main = () => {
  preloadFonts();

  const mainEl = document.querySelector('main');
  makeForm(colors, mainEl);
  makeColorListCards(colors, mainEl);
};

document.addEventListener('DOMContentLoaded', main);
