import { ABC_DIATYPE_FONT, CASLON_FONT } from '../constants';

const checkedInputFontOpts = [
  {
    id: 'abc-diatype-radio',
    fieldName: 'font',
    value: ABC_DIATYPE_FONT,
    label: 'ABC Diatype',
    type: 'radio',
    isChecked: true,
    displayFont: ABC_DIATYPE_FONT,
  },
  {
    id: 'caslon-radio',
    fieldName: 'font',
    value: CASLON_FONT,
    label: 'Caslon Ionic',
    type: 'radio',
    isChecked: false,
    displayFont: CASLON_FONT,
  },
  {
    id: 'italic-checkbox',
    fieldName: 'isItalic',
    value: 'italic',
    label: 'Italic',
    type: 'checkbox',
    isChecked: false,
  },
];

export default checkedInputFontOpts;
