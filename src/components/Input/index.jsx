import React, { Component } from 'react';
import './styles.scss';

export class Input extends Component {
  render() {
    const { type, name, id, placeholder, value, onChange } = this.props;

    return (
      <input
        type={type}
        name={name}
        id='input'
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    );
  }
}
