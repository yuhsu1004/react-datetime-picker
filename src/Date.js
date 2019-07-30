import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import classnames from 'classnames';

export default class Date extends React.PureComponent {
  static propTypes = {
    dateMoment: PropTypes.instanceOf(moment).isRequired,
    outsideDate: PropTypes.bool.isRequired,
    isSelectedDate: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  render() {
    const {
      dateMoment,
      outsideDate,
      isSelectedDate,
      onClick,
    } = this.props;

    return (
      <div
        className={classnames('cell', 'date', {
          'selected-date': isSelectedDate,
          'outside-date': outsideDate,
        })}
        onClick={onClick}
      >
        {dateMoment.date()}
      </div>
    );
  }
}
