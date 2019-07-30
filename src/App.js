import React from 'react';
import moment from 'moment';

import DateTimePicker from './DateTimePicker'
import './App.css';

export default class App extends React.PureComponent {
  state = {
    text: moment().format('YYYY/MM/DD HH:mm'),
    selectedMoment: moment(),
  };

  onChange = state => {
    this.setState({
      ...state,
    });
  };

  onInputChange = e => {
    this.setState({
      text: e.target.value,
    });
  };

  onInputBlur = e => {
    const { text, selectedMoment } = this.state;
    const selectedText = selectedMoment.format('YYYY/MM/DD HH:mm');

    /* istanbul ignore else */
    if (selectedText !== e.target.value) {
      const m = moment(text, 'YYYY/MM/DD HH:mm');
      const valid = m.isValid();

      if (valid) {
        this.setState({
          text: m.format('YYYY/MM/DD HH:mm'),
          selectedMoment: m,
        });
      } else {
        this.setState({
          text: selectedText,
        });
      }
    }
  };

  onInputEnter = e => {
    /* istanbul ignore else */
    if (e.keyCode === 13) {
      this.onInputBlur(e);
      this.inputNode.blur();
    }
  };

  render() {
    const { text } = this.state;

    return (
      <div className="datetime-picker">
        <input
          ref={node => { this.inputNode = node }}
          className="date-input"
          value={text}
          onChange={this.onInputChange}
          onBlur={this.onInputBlur}
          onKeyDown={this.onInputEnter}
        />

        <DateTimePicker
          {...this.state}
          onChange={this.onChange}
        />
      </div>
    );
  }
}
