import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import Time from '../Time';

describe('Time’s Methods', () => {
  const m = moment();
  const onChange = jest.fn();
  const wrapper = shallow(<Time
    selectedMoment={m}
    onChange={onChange}
  />);

  describe('changeHours()', () => {
    it('should show the selected hours', () => {
      const testHour = 0;
      const testMoment = m.hour(testHour);

      wrapper.find('.time-slider').at(0).childAt(1).props().onChange(testHour);
      wrapper.setProps({ selectedMoment: testMoment });
      wrapper.instance().forceUpdate();
      expect(wrapper.find('.time-number').at(0).text()).toBe(testMoment.format('HH'));
    });
  });

  describe('changeMinutes()', () => {
    it('should show the selected minutes', () => {
      const testMinute = 0;
      const testMoment = m.hour(testMinute);

      wrapper.find('.time-slider').at(1).childAt(1).props().onChange(testMinute);
      wrapper.setProps({ selectedMoment: testMoment });
      wrapper.instance().forceUpdate();
      expect(wrapper.find('.time-number').at(1).text()).toBe(testMoment.format('mm'));
    });
  });
});
