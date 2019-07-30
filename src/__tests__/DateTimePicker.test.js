import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import DateTimePicker from '../DateTimePicker';

describe('DateTimePicker’s Rendering', () => {
  const m = moment();
  const onChange = jest.fn();
  const wrapper = shallow(<DateTimePicker
    selectedMoment={m}
    onChange={onChange}
  />);

  it('should have the right initial state and render Calendar', () => {
    expect(wrapper.state('active')).toBe('date');
    expect(wrapper.find('Calendar')).toHaveLength(1);
  });
});

describe('DateTimePicker’s methods', () => {
  describe('changeActive()', () => {
    const m = moment();
    const onChange = jest.fn();
    const wrapper = shallow(<DateTimePicker
      selectedMoment={m}
      onChange={onChange}
    />);

    it('date button: should update state and render Calendar', () => {
      wrapper.find('button').at(0).simulate('Click');
      expect(wrapper.state('active')).toBe('date');
      expect(wrapper.find('Calendar')).toHaveLength(1);
    });

    it('time button: should update state and render Time', () => {
      wrapper.find('button').at(1).simulate('Click');
      expect(wrapper.state('active')).toBe('time');
      expect(wrapper.find('Time')).toHaveLength(1);
    });
  })
});
