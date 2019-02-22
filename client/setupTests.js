// setup file
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

console.log('Setting up tests!');
configure({ adapter: new Adapter() });