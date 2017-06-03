import {Decoder as LameDecoder} from 'lame'

export default mp3 => {
  if(!mp3) return new Error('Could not read mp3')

  const lameDecoder = new LameDecoder()
  mp3.pipe(lameDecoder)

  return new Promise(resolve => lameDecoder.on('format', format => resolve(() => ({format, stream: lameDecoder}))))
}
