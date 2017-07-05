import {Component} from 'react'

export default class SetupPage extends Component {
  componentDidMount(){
    this.props.navigation.setParams(this.params)
  }
}
