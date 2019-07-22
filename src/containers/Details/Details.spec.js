import React from 'react';
import { configure, shallow } from 'enzyme';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import sinonChai from 'sinon-chai';
import { matchSnapshot } from 'chai-karma-snapshot';
import Adapter from 'enzyme-adapter-react-16';
import { Details } from './Details';
import sinon from 'sinon';

chai.use(chaiEnzyme());
chai.use(matchSnapshot);
chai.use(sinonChai);

const expect = chai.expect;

let wrapper;
let load;

configure({ adapter: new Adapter() });

describe('containers/Details', () => {
  beforeEach(() => {
    load = sinon.spy();
    wrapper = shallow(<Details load={load} />);
  });

  it('should render Details', () => {
    expect(wrapper).to.matchSnapshot();
  });

  it('should load method be call', () => {
    // eslint-disable-next-line no-unused-expressions
    expect(load).to.have.been.calledOnce;
  });
});
