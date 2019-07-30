import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

export default class Time extends React.PureComponent {
  static propTypes = {
    selectedMoment: PropTypes.instanceOf(moment).isRequired,
    onChange: PropTypes.func.isRequired,
  };

  changeHours = val => {
    const { selectedMoment, onChange } = this.props;
    const m = moment(selectedMoment).hour(val);
    onChange({
      text: m.format('YYYY/MM/DD HH:mm'),
      selectedMoment: m,
    });
  };

  changeMinutes = val => {
    const { selectedMoment, onChange } = this.props;
    const m = moment(selectedMoment).minute(val);
    onChange({
      text: m.format('YYYY/MM/DD HH:mm'),
      selectedMoment: m,
    });
  };

  render() {
    const { selectedMoment } = this.props;
    const sliderStyleProps = {
      trackStyle: {
        background: '#000000',
      },
      handleStyle: {
        borderColor: '#000000',
        boxShadow: 'none',
      },
    };

    return (
      <div className="time">
        <div className="time-display">
          <div className="time-number">{selectedMoment.format('HH')}</div>
          <div className="time-separater">:</div>
          <div className="time-number">{selectedMoment.format('mm')}</div>
        </div>

        <div className="time-slider">
          <div className="time-slider-title">Hours</div>
          <Slider
            {...sliderStyleProps}
            min={0}
            max={23}
            defaultValue={selectedMoment.hour()}
            onChange={this.changeHours}
          />
        </div>

        <div className="time-slider">
          <div className="time-slider-title">Minutes</div>
          <Slider
            {...sliderStyleProps}
            min={0}
            max={59}
            defaultValue={selectedMoment.minute()}
            onChange={this.changeMinutes}
          />
        </div>
      </div>
    );
  }
}
