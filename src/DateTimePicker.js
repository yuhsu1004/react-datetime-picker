import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faClock } from '@fortawesome/free-solid-svg-icons';

import Calendar from './Calendar';
import Time from './Time'

export default class DateTimePicker extends React.PureComponent {
  static propTypes = {
    selectedMoment: PropTypes.instanceOf(moment).isRequired,
    onChange: PropTypes.func.isRequired,
  };

  state = {
    active: 'date',
  };

  changeActive = active => {
    this.setState({
      active,
    });
  };

  render() {
    const { active } = this.state;
    const { selectedMoment, onChange } = this.props;

    return (
      <div className="picker">
        <>
          <button
            className={classnames('picker-btn', {
              'picker-btn-active': active === 'date',
            })}
            onClick={() => this.changeActive('date')}
          >
            <FontAwesomeIcon
              className="picker-btn-icon"
              icon={faCalendar}
            />
            Date
          </button>
          <button
            className={classnames('picker-btn', {
              'picker-btn-active': active === 'time',
            })}
            onClick={() => this.changeActive('time')}
          >
            <FontAwesomeIcon
              className="picker-btn-icon"
              icon={faClock}
            />
            Time
          </button>
        </>

        <div className="picker-body">
          {active === 'date' && (
            <Calendar
              selectedMoment={selectedMoment}
              onChange={onChange}
            />
          )}
          {active === 'time' && (
            <Time
              selectedMoment={selectedMoment}
              onChange={onChange}
            />
          )}
        </div>
      </div>
    );
  }
}
