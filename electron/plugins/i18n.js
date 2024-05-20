import i18n from 'i18n'
import getElectronStoreKey from '../actions/electronStore/getKey.js'
import be from './i18n/locales/be.json' with { type: 'json' }
import de from './i18n/locales/de.json' with { type: 'json' }
import en from './i18n/locales/en.json' with { type: 'json' }
import fr from './i18n/locales/fr.json' with { type: 'json' }
import he from './i18n/locales/he.json' with { type: 'json' }
import it from './i18n/locales/it.json' with { type: 'json' }
import ja from './i18n/locales/ja.json' with { type: 'json' }
import ru from './i18n/locales/ru.json' with { type: 'json' }
import pt from './i18n/locales/pt.json' with { type: 'json' }

// i18n

const locale =
  getElectronStoreKey(
    'profile.language'
  )

const localesData = {
  be,
  de,
  en,
  fr,
  he,
  it,
  ja,
  ru,
  pt
}

const options = {
  defaultLocale: locale,
  staticCatalog: localesData,
  objectNotation: true
}

export default function () {
  i18n.configure(
    options
  )
}
