import { Component } from 'react';
import { FaRegPlusSquare, FaRunning, FaExchangeAlt } from 'react-icons/fa';
import './styles.scss';

export class Button extends Component {
  render() {
    const { text, action, icon } = this.props;
    return (
      <button onClick={action}>
        {text}
        {icon}
      </button>
    );
  }
}
