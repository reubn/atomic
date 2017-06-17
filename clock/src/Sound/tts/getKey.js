import axios from 'axios'
import safeEval from 'safe-eval'

export default async (timeout=10000) => {
  const {data: text} = await axios('https://translate.google.com', {timeout}).catch(() => console.log('Could not get key') || '')

  const key = safeEval(text.match(/TKK=eval\('\(.*\)'\);/g)[0])

  if(key) return key
  throw new Error('Could not get key')
}
