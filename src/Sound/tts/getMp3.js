import axios from 'axios'

import generateURL from './generateURL'

export default async options => {
  const url = await generateURL(options)
  return axios.get(url, {responseType: 'stream', headers: {'user-agent': 'WHAT_EVER'}}).catch(() => console.error('TTS Failed'))
}
