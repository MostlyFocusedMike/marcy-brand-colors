import {
  ABC_DIATYPE_FONT,
  ABC_DIATYPE_FONT_ITALIC,
  CASLON_FONT,
  CASLON_FONT_ITALIC,
  COPY_TEXT,
} from '../constants';
import diatypeUrl from '../assets/fonts/abcdiatype-medium-webfont.woff2';
import diatypeItalicUrl from '../assets/fonts/abcdiatype-mediumitalic-webfont.woff2';
import caslonUrl from '../assets/fonts/caslonionic-bold-webfont.woff2';
import caslonItalicUrl from '../assets/fonts/caslonionic-bolditalic-webfont.woff2';

export const copyToClipboard = (e) => {
  const {
    target,
    target: { dataset: { [COPY_TEXT]: text } },
  } = e;
  if (!text) return;

  const originalText = target.textContent;
  target.textContent = 'Copied!';
  navigator.clipboard.writeText(text);

  setTimeout(() => { target.textContent = originalText; }, 2000);
};

// I am grasping at straws, but the recommended plugins looked ...questionable
// If we don't preload them, the fonts flicker the first time they load
// this is likely not the right way to do this
export const preloadFonts = async () => {
  const fontFamilies = [
    { name: CASLON_FONT, url: `url(${caslonUrl})` },
    { name: CASLON_FONT_ITALIC, url: `url(${caslonItalicUrl})` },
    { name: ABC_DIATYPE_FONT, url: `url(${diatypeUrl})` },
    { name: ABC_DIATYPE_FONT_ITALIC, url: `url(${diatypeItalicUrl})` },
  ];

  const loadFont = async ({ name, url }) => new FontFace(name, url).load();
  const fontPromises = fontFamilies.map(loadFont);

  const loadedFonts = await Promise.all(fontPromises).catch(() => []);
  loadedFonts.forEach((font) => document.fonts.add(font));
};

export const getAllowedBackgroundColors = (colorObj) => (
  colorObj.type !== 'system' && !colorObj.id.includes('grey')
);
