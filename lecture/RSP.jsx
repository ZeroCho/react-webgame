import React, { Component } from 'react';

class RSP extends Component {
  state = {
    counter: 0,
  };

  componentDidMount() {
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    setTimeout(() => {
      this.setState({
        counter: prevState.counter + 1,
      })
    }, 4);

  }

  render() {
    console.log('render', this.state.counter);
    return (<div>{this.state.counter}</div>)
  }
}

export default RSP;
