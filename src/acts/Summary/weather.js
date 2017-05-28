import axios from 'axios'
import moment from 'moment'

const location = 'Hereford, UK'
const apiKey = '151eda8a245c259d13efeca821d9b29e'

export default async () => {
  const json = await axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=${apiKey}`)
  const todaysForecasts = json.data.list
    .filter(({dt}) => moment.unix(dt).isBetween(moment().startOf('d'), moment().endOf('d')))

  const {avTemps: averageTemps, max: maxTemp, min: minTemp, descs: descriptions} = todaysForecasts
    .reduce(({avTemps=[], max=-Infinity, min=Infinity, descs=[]}, {weather: [{description}], main: {temp, temp_max, temp_min}}) => ({
      avTemps: [...avTemps, temp],
      max: Math.max(max, temp_max),
      min: Math.min(min, temp_min),
      descs: [...descs, ...(descs.includes(description) ? [] : [description])]
    }), {})

  const descriptionsString = descriptions.reduce((string, desc, index, {length}) => `${string} ${(index === length - 1) ? 'and' : ','} ${desc}`)

  const averageTempRounded = Math.round(averageTemps.reduce((t, s) => t + s, 0) / todaysForecasts.length)
  const maxTempRounded = Math.round(maxTemp)
  const minTempRounded = Math.round(minTemp)

  const weatherSummary = `Today's forecast is ${descriptionsString}. The average temprature is ${averageTempRounded} degrees, with a high of ${maxTempRounded}, and low of ${minTempRounded}.`

  return {weatherSummary, displayTemp: averageTempRounded}
}
