import React from 'react'
import {ScrollView, FlatList} from 'react-native'

import LogoButtonContainer from './LogoButtonContainer'

import {StackPage} from '../../../../../../CustomStackNavigator'

import ItemContainer from './ItemContainer'
import ItemSeparator from './ItemSeparator'

export default class Alarms extends StackPage {
  static navigationOptions = {
    headerTitle: <LogoButtonContainer />
  }
  componentWillMount(){
    this.props.getAlarms()
  }
  render(){
    return (
      <ScrollView>
        <FlatList
          data={this.props.alarms.map(alarm => ({...alarm, key: alarm.id}))}
          renderItem={({item}) => <ItemContainer navigation={this.props.navigation} item={item} />}
          ItemSeparatorComponent={ItemSeparator}
          ListFooterComponent={ItemSeparator}
        />
      </ScrollView>
    )
  }
}
