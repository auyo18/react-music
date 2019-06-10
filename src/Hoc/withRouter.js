import React, {Component} from 'react'

export default (DecoratedComponent) => {
  return class NewComponent extends Component {
    render() {
      return <DecoratedComponent {...this.props} />
    }
  }
}
