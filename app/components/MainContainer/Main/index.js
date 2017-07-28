import React from 'react'

import Setup from '../../Setup'
import TabController from './TabController'

export default ({setupMode}) => {
  if(setupMode) return <Setup />

  return <TabController />
}
