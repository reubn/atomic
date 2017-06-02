import lame2PCM from '../lame2PCM'

import getMp3 from './getMp3'

export default async (_, {text=_, lang='en', speed=1}=_) => {
  const mp3 = await getMp3({text, lang, speed})

  return mp3 ? lame2PCM(mp3) : null
}
