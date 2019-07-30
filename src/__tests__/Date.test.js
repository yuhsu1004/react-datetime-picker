import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import Date from '../Date';

it('Date’s Rendering', () => {
  const m = moment();
  const onClick = jest.fn();
  shallow(<Date
    outsideDate={false}
    isSelectedDate={true}
    dateMoment={m}
    onClick={onClick}
  />);
});
