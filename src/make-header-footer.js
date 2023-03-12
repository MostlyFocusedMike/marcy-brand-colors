import { makeTag } from './utils/dom-utils';

const makeHeader = (mainEl) => {
  const header = makeTag('header', mainEl, 'header');
  header.innerHTML = '<h1>Marcy Brand Colors</h1>';
  document.body.insertBefore(header, document.body.firstChild);
  return header;
};

const makeFooter = (mainEl) => {
  const footer = makeTag('footer', mainEl, 'footer');
  footer.innerHTML = `<footer>
    <p>
      Are you a student? Check out the <a id='repo-link' href="http://github.com/MostlyFocusedMike/marcy-brand-colors" target="_blank" rel="noopener noreferrer">source repo</a>.
    </p>
  </footer>`;
  document.body.append(footer);
};

const makeHeaderFooter = (mainEl) => {
  makeHeader(mainEl);
  makeFooter(mainEl);
};

export default makeHeaderFooter;
