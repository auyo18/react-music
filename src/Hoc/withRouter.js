import React, {PureComponent} from 'react'

export default (DecoratedComponent) => {
  return class NewComponent extends PureComponent {
    render() {
      return <DecoratedComponent {...this.props} />
    }
  }
}
