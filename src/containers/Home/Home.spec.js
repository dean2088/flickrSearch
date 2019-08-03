import React from 'react';
import { configure, shallow } from 'enzyme';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import sinonChai from 'sinon-chai';
import { matchSnapshot } from 'chai-karma-snapshot';
import Adapter from 'enzyme-adapter-react-16';
import { Home } from './Home';
import sinon from 'sinon';

chai.use(chaiEnzyme());
chai.use(matchSnapshot);
chai.use(sinonChai);

const expect = chai.expect;

let wrapper;
let load;

configure({ adapter: new Adapter() });

describe('containers/Home', () => {
  beforeEach(() => {
    load = sinon.spy();
    wrapper = shallow(<Home load={load} />);
  });

  it('should render Home', () => {
    expect(wrapper).to.matchSnapshot();
  });
});
