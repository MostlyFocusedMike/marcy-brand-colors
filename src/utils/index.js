import {
  ABC_DIATYPE_FONT,
  ABC_DIATYPE_FONT_ITALIC,
  CASLON_FONT,
  CASLON_FONT_ITALIC,
} from '../constants';

export const copyToClipboard = (e) => {
  const { copyText } = e.target.dataset;
  if (!copyText) return;
  const originalText = e.target.textContent;
  e.target.textContent = 'Copied!';
  navigator.clipboard.writeText(copyText);
  setTimeout(() => {
    e.target.textContent = originalText;
  }, 2000);
};

// I am grasping at straws, but the recommended plugins looked ...questionable
// If we don't preload them, the fonts flicker the first time they load
// this is likely not the right way to do this
export const preloadFonts = async () => {
  const fontFamilies = [
    { name: CASLON_FONT, url: 'url(/fonts/caslonionic-bold-webfont.woff2)' },
    { name: CASLON_FONT_ITALIC, url: 'url(/fonts/caslonionic-bolditalic-webfont.woff2)' },
    { name: ABC_DIATYPE_FONT, url: 'url(/fonts/abcdiatype-medium-webfont.woff2)' },
    { name: ABC_DIATYPE_FONT_ITALIC, url: 'url(/fonts/abcdiatype-mediumitalic-webfont.woff2' },
  ];

  const fontPromises = fontFamilies
    .map(({ name, url }) => new FontFace(name, url).load());

  const loadedFonts = await Promise.all(fontPromises).catch(() => []);
  loadedFonts.forEach((font) => document.fonts.add(font));
};
