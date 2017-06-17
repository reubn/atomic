import {format} from 'url'

import getKey from './getKey'
import calculateHash from './calculateHash'

export default async ({text, speed, lang}) => {
  const key = await getKey()

  const formatted = format({
    query: {
      ie: 'UTF-8',
      q: text,
      tl: lang,
      total: 1,
      idx: 0,
      textlen: text.length,
      tk: calculateHash(text, key),
      client: 't',
      prev: 'input',
      ttsspeed: speed
    }
  })

  return `https://translate.google.com/translate_tts${formatted}`
}
