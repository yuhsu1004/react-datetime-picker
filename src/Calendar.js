import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

import { getAllDaysInMonth, getRangeArray } from './utils';
import Date from './Date';

export default class Calendar extends React.PureComponent {
  static propTypes = {
    selectedMoment: PropTypes.instanceOf(moment).isRequired,
    onChange: PropTypes.func.isRequired,
  };

  static getDerivedStateFromProps(props, state) {
    const { selectedMoment } = props;
    const { currentMoment, prevPropsSelectedMoment } = state;

    if (!selectedMoment.isSame(prevPropsSelectedMoment, 'day')) {
      if (!selectedMoment.isSame(currentMoment, 'day')) {
        return {
          currentMoment: selectedMoment,
          prevPropsSelectedMoment: selectedMoment,
        };
      }
      return {
        prevPropsSelectedMoment: selectedMoment,
      };
    }
    return null;
  };

  state = {
    currentMoment: this.props.selectedMoment,
    prevPropsSelectedMoment: this.props.selectedMoment,
  };

  prevMonth = () => {
    const { currentMoment } = this.state;
    this.setState({
      currentMoment: moment(currentMoment).subtract(1, 'month'),
    });
  };

  nextMonth = () => {
    const { currentMoment } = this.state;
    this.setState({
      currentMoment: moment(currentMoment).add(1, 'month'),
    });
  };

  selectYear = e => {
    const { currentMoment } = this.state;
    const year = e.target.value;
    this.setState({
      currentMoment: moment(currentMoment).year(year),
    });
  };

  selectMonth = e => {
    const { currentMoment } = this.state;
    const month = e.target.value;
    this.setState({
      currentMoment: moment(currentMoment).month(month),
    });
  };

  selectDate = selectedMoment => {
    const { onChange } = this.props;
    
    this.setState({
      currentMoment: selectedMoment,
    });

    onChange({
      text: selectedMoment.format('YYYY/MM/DD HH:mm'),
      selectedMoment,
    });
  };

  render() {
    const { currentMoment } = this.state;
    const { selectedMoment } = this.props;

    const years = getRangeArray(1950, 2051);
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const weeks = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

    return (
      <>
        <div className="calendar-toolbar">
          <div className="cell pointer" onClick={this.prevMonth}>
            <FontAwesomeIcon icon={faAngleLeft} />
          </div>
          <div>
            <select
              className="date-select"
              value={currentMoment.format('YYYY')}
              onChange={this.selectYear}
            >
              {years.map(year => <option key={year} value={`${year}`}>{year}</option>)}
            </select>
            <select
              className="date-select"
              value={currentMoment.format('MMMM')}
              onChange={this.selectMonth}
            >
              {months.map(month => <option key={month} value={`${month}`}>{month}</option>)}
            </select>
          </div>
          <div className="cell pointer" onClick={this.nextMonth}>
            <FontAwesomeIcon icon={faAngleRight} />
          </div>
        </div>

        <div className="week-days">
          {weeks.map((w, i) => <div key={i} className="cell">{w}</div>)}
        </div>

        <div className="calendar-dates">
          {getAllDaysInMonth(currentMoment).map((mDate, index) => {
            const outsideDate = !currentMoment.isSame(mDate, 'month');
            const isSelectedDate = selectedMoment.isSame(mDate, 'day');

            return (
              <Date
                key={index}
                dateMoment={mDate}
                outsideDate={outsideDate}
                isSelectedDate={isSelectedDate}
                onClick={() => this.selectDate(mDate)}
              />
            );
          })}
        </div>
      </>
    );
  }
}
