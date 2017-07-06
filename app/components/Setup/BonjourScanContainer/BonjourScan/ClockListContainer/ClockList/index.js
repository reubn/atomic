import React from 'react'
import {SectionList} from 'react-native'

import ItemContainer from './ItemContainer'
import ItemSeparator from './ItemSeparator'
import SectionHeader from './SectionHeader'
import SectionFooter from './SectionFooter'

export default ({paired, unpaired}) => (
  <SectionList
    sections={[
      {title: 'UNPAIRED', data: unpaired, l: console.log('B', {paired, unpaired})},
      {title: 'PAIRED', data: paired}
    ]}
    keyExtractor={() => Math.random()}
    renderItem={args => <ItemContainer {...args} />}
    ItemSeparatorComponent={ItemSeparator}
    renderSectionHeader={SectionHeader}
    renderSectionFooter={SectionFooter}
  />
)
