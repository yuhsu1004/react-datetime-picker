import React from 'react';
import { shallow, mount } from 'enzyme';
import moment from 'moment';
import App from '../App';

describe('App’s Rendering', () => {
  const wrapper = shallow(<App />);

  it('should render DateTimePicker', () => {
    expect(wrapper.find('DateTimePicker')).toHaveLength(1);
  });
});

describe('App’s Methods', () => {
  const wrapper = mount(<App />);

  describe('onChange()', () => {
    it('valid text: should update state by props', () => {
      const testText = '2019/1/1 00:00';
      const testMoment = moment(testText, 'YYYY/MM/DD HH:mm');

      wrapper.find('DateTimePicker').props().onChange({
        text: testText,
        selectedMoment: testMoment,
      });

      expect(wrapper.state('text')).toBe(testText);
      expect(wrapper.state('selectedMoment').isSame(testMoment)).toBeTruthy();
    });
  });

  describe('onInputChange() & onInputBlur()', () => {
    it('valid text: should update state', () => {
      const testText = '2019/12/31 23:59';

      wrapper.find('input').simulate('change', { target: { value: testText }});
      wrapper.find('input').simulate('blur', { target: { value: testText }});

      expect(wrapper.state('text')).toBe(testText);
      expect(wrapper.state('selectedMoment').isSame(moment(testText, 'YYYY/MM/DD HH:mm'))).toBeTruthy();
      expect(wrapper.find('input').prop('value')).toBe(testText)
    });

    it('invalid text: should update state.text by state.selectedMoment instead of e.target.value', () => {
      const testText = '2019/12/32 23:59';
      const selectedText = wrapper.state('selectedMoment').format('YYYY/MM/DD HH:mm');

      wrapper.find('input').simulate('change', { target: { value: testText }});
      wrapper.find('input').simulate('keyDown', {
        keyCode: 13,
        target: { value: testText },
      });

      expect(wrapper.state('text')).not.toBe(testText);
      expect(wrapper.state('text')).toBe(selectedText);
      expect(wrapper.find('input').prop('value')).toBe(selectedText);
    });
  })
});
