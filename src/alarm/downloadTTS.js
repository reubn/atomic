import fs from 'fs'

import axios from 'axios'
import tts from 'google-tts-api'
import tmp from 'tmp'
import {Decoder as LameDecoder} from 'lame'
import {Writer as WavWriter} from 'wav'

export default async text => {
  const url = await tts(text, 'en-au')
  const mp3 = await axios.get(url, {responseType: 'stream', headers: {'user-agent': 'WHAT_EVER'}})

  const tempPath = await new Promise((resolve, reject) => tmp.file((err, path) => (err ? reject(err) : resolve(path))))
  const tempWriteStream = fs.createWriteStream(tempPath)

  const lameDecoder = new LameDecoder()
  lameDecoder.on('format', format => lameDecoder.pipe(new WavWriter(format)).pipe(tempWriteStream))

  mp3.data.pipe(lameDecoder)

  return new Promise(resolve => tempWriteStream.on('finish', () => tempWriteStream.close(() => resolve(tempPath))))
}
