// @flow
import { branch, renderComponent } from 'recompose';
import Loader from './Loader';

export default branch(({ loading }) => loading, renderComponent(Loader));
