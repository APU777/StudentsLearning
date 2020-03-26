import React, { Component } from 'react';
import { Checkbox } from 'semantic-ui-react'

let outChecked;

class CheckBox extends React.Component {
    state = {
        checked: this.props.checked,
        name: this.props.name
    }

    render() {
      return (
        <React.Fragment>
          <Checkbox toggle checked={this.state.checked}
            onClick={this.onClick}
            onChange={this.onChange}>
          </Checkbox>
        </React.Fragment>
      )
    }

    onClick = event => {
      this.setState(state => ({checked: !state.checked}));
      outChecked = !this.state.checked;
    }
    
    onChange = event => {
      this.props.block(outChecked, this.state.name);
    }
}

export default CheckBox;