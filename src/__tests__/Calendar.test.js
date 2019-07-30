import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import Calendar from '../Calendar';

describe('Calendar’s Rendering', () => {
  const m = moment();
  const onChange = jest.fn();
  const wrapper = shallow(<Calendar
    selectedMoment={m}
    onChange={onChange}
  />);

  it('should have the right initial state', () => {
    expect(wrapper.state('currentMoment').isSame(m)).toBeTruthy();
    expect(wrapper.state('prevPropsSelectedMoment').isSame(m)).toBeTruthy();
  });

  it('should render the selected year & month & date', () => {
    expect(wrapper.find('select').at(0).prop('value')).toBe(m.format('YYYY'))
    expect(wrapper.find('select').at(1).prop('value')).toBe(m.format('MMMM'))
    const selectedDateNode = wrapper.find('.calendar-dates').findWhere((n, index) => n.prop('isSelectedDate'));
    expect(selectedDateNode.prop('dateMoment').isSame(m)).toBeTruthy();
  });

  it('should update state when props.selectedMoment is updated', () => {
    const selectedMoment = moment('2019/12/31 23:59', 'YYYY/MM/DD HH:mm');
    wrapper.setProps({ selectedMoment });
    expect(wrapper.state('currentMoment').isSame(selectedMoment)).toBeTruthy();
    expect(wrapper.state('prevPropsSelectedMoment').isSame(selectedMoment)).toBeTruthy();
  });
});

describe('Calendar’s Methods', () => {
  const m = moment();
  const onChange = jest.fn();
  const wrapper = shallow(<Calendar
    selectedMoment={m}
    onChange={onChange}
  />);

  describe('prevMonth()', () => {
    it('should update state.currentMoment and show the prev month', () => {
      const currentMoment = wrapper.state('currentMoment').clone().subtract(1, 'month');
      wrapper.find('.calendar-toolbar').childAt(0).simulate('Click');
      expect(wrapper.state('currentMoment').isSame(currentMoment)).toBeTruthy();
      expect(wrapper.find('select').at(1).prop('value')).toBe(currentMoment.format('MMMM'));
    });

  });

  describe('nextMonth()', () => {
    it('should update state.currentMoment and show the next month', () => {
      const currentMoment = wrapper.state('currentMoment').clone().add(1, 'month');
      wrapper.find('.calendar-toolbar').childAt(2).simulate('Click');
      expect(wrapper.state('currentMoment').isSame(currentMoment)).toBeTruthy();
    });
  });

  describe('selectYear()', () => {
    it('should update state.currentMoment and show the selected year', () => {
      const selectedValue = wrapper.find('select').at(0).childAt(0).prop('value');
      const currentMoment = wrapper.state('currentMoment').clone().year(selectedValue);

      wrapper.find('select').at(0).simulate('Change', { target: { value: selectedValue }});
      expect(wrapper.state('currentMoment').isSame(currentMoment)).toBeTruthy();
      expect(wrapper.find('select').at(0).prop('value')).toBe(selectedValue);
    });
  });

  describe('selectMonth()', () => {
    it('should update state.currentMoment and show the selected month', () => {
      const selectedValue = wrapper.find('select').at(1).childAt(0).prop('value');
      const currentMoment = wrapper.state('currentMoment').clone().month(selectedValue);

      wrapper.find('select').at(1).simulate('Change', { target: { value: selectedValue }});
      expect(wrapper.state('currentMoment').isSame(currentMoment)).toBeTruthy();
      expect(wrapper.find('select').at(1).prop('value')).toBe(selectedValue);
    });
  });

  describe('selectDate()', () => {
    it('should call `onChange` and update state.currentMoment', () => {
      const selectedMoment = wrapper.find('Date').at(0).prop('dateMoment');

      wrapper.find('Date').at(0).simulate('Click');
      expect(onChange).toHaveBeenCalledWith({
        text: selectedMoment.format('YYYY/MM/DD HH:mm'),
        selectedMoment,
      });

      wrapper.setProps({ selectedMoment });
      expect(wrapper.state('currentMoment').isSame(selectedMoment)).toBeTruthy();
    });
  });
});
