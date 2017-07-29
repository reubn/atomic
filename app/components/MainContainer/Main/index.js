import React from 'react'

import SetupStackController from '../../SetupStackController'
import TabController from './TabController'

export default ({setupMode}) => {
  if(setupMode) return <SetupStackController />

  return <TabController />
}
