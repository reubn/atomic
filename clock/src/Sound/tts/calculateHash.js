// https://github.com/guyrotem/google-translate-server
function hexCharAsNumber(xd){
  return xd >= 'a' ? xd.charCodeAt(0) - 87 : Number(xd)
}

function shiftLeftOrRightThenSumOrXor(num, opArray){
  return opArray.reduce((acc, opString) => {
    const op1 = opString[1] //  '+' | '-' ~ SUM | XOR
    const op2 = opString[0] //  '+' | '^' ~ SLL | SRL
    const xd = opString[2] //  [0-9a-f]

    const shiftAmount = hexCharAsNumber(xd)
    const mask = op1 === '+' ? acc >>> shiftAmount : acc << shiftAmount
    return op2 === '+' ? (acc + mask) & 0xffffffff : acc ^ mask
  }, num)
}

function transformQuery(query){
  const e = []
  for(let f = 0, g = 0; g < query.length; g++){
    let l = query.charCodeAt(g)
    if(l < 128){
      e[f++] = l //  0{l[6-0]}
    } else if(l < 2048){
      e[f++] = (l >> 6) | 0xc0 //  110{l[10-6]}
      e[f++] = (l & 0x3f) | 0x80 //  10{l[5-0]}
    } else if(
      (l & 0xfc00) === 0xd800 &&
      g + 1 < query.length &&
      (query.charCodeAt(g + 1) & 0xfc00) === 0xdc00
    ){
      //  that's pretty rare... (avoid ovf?)
      l = (1 << 16) + ((l & 0x03ff) << 10) + (query.charCodeAt(++g) & 0x03ff)
      e[f++] = (l >> 18) | 0xf0 //  111100{l[9-8*]}
      e[f++] = ((l >> 12) & 0x3f) | 0x80 //  10{l[7*-2]}
      e[f++] = (l & 0x3f) | 0x80 //  10{(l+1)[5-0]}
    } else {
      e[f++] = (l >> 12) | 0xe0 //  1110{l[15-12]}
      e[f++] = ((l >> 6) & 0x3f) | 0x80 //  10{l[11-6]}
      e[f++] = (l & 0x3f) | 0x80 //  10{l[5-0]}
    }
  }
  return e
}

function normalizeHash(encondingRound2){
  return (encondingRound2 < 0 ? (encondingRound2 & 0x7fffffff) + 0x80000000 : encondingRound2) % 1e6
}

function calculateHash(query, windowTkk){
  //  STEP 1: spread the the query char codes on a byte-array, 1-3 bytes per char
  const bytesArray = transformQuery(query)

  //  STEP 2: starting with TKK index, add the array from last step one-by-one, and do 2 rounds of shift+add/xor
  const d = windowTkk.split('.')
  const tkkIndex = Number(d[0]) || 0
  const tkkKey = Number(d[1]) || 0

  const encondingRound1 = bytesArray.reduce((acc, current) => shiftLeftOrRightThenSumOrXor(acc + current, ['+-a', '^+6']), tkkIndex)

  //  STEP 3: apply 3 rounds of shift+add/xor and XOR with they TKK key
  const encondingRound2 = shiftLeftOrRightThenSumOrXor(encondingRound1, ['+-3', '^+b', '+-f']) ^ tkkKey

  //  STEP 4: Normalize to 2s complement & format
  const normalizedResult = normalizeHash(encondingRound2)

  return `${normalizedResult.toString()}.${(normalizedResult ^ tkkIndex)}`
}

export default calculateHash
