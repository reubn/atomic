import {Component} from 'react'

export default class StackPage extends Component {
  componentDidMount(){
    this.props.navigation.setParams(this.params)
  }
}
