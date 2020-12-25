import { atom } from 'recoil';

export const wordState = atom({
    key: 'words',
    default: '',
});
