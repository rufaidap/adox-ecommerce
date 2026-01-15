import i18next from 'i18next';
import {makeAutoObservable} from 'mobx';

import {secureStorage} from '../utils/secureStorage';

interface Language {
  name: string;
  sortName: string;
}

interface Theme {
  myTheme: string;
}

class SettingsStore {
  languages: Language[] = [
    {name: 'English', sortName: 'en'},
    {name: 'Arabic', sortName: 'ar'},
  ];
  defaultLanguage: Language = this.languages[0];
  defaultTheme: Theme = {myTheme: 'light'};

  constructor() {
    makeAutoObservable(this);
  }

  saveDefaultLanguage(language: Language) {
    const languageExists = this.languages.some(
      lang => lang.sortName === language.sortName
    );
    if (languageExists) {
      this.defaultLanguage = language;
    } else {
      //console.error('Language not found in the list.');
    }
  }

  saveDefaultTheme(theme: Theme) {
    this.defaultTheme = theme;
  }

  async changeLanguageState(language: Language) {
    await secureStorage.setObject('LANGUAGE', language);
    i18next.changeLanguage(language.sortName);
    this.saveDefaultLanguage(language);
  }

  async changeThemeState(theme: string) {
    await secureStorage.setItem('THEME', theme);
    this.saveDefaultTheme({myTheme: theme});
  }
}

const settingsStore = new SettingsStore();
export default settingsStore;
