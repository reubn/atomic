import getMp3 from './getMp3'
import saveMp3 from './saveMp3'

export default async (_, {text=_, lang='en', speed=1}=_) => {
  const mp3 = await getMp3({text, lang, speed})

  return saveMp3(mp3)
}
