// test file
import React from 'react';
import { shallow, mount, render } from 'enzyme';

import App from '../components/app.jsx';

describe('A suite', function() {
  it('should render without throwing an error', function() {
    // shallow(<App Calender={Calender} />).contains(<div className="foo">Bar</div>)
    expect(shallow(<App />).contains("February 2019")).toBe(true);
  });
});
