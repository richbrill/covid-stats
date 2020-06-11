import { Store, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

export const store: Store = createStore(rootReducer, applyMiddleware(thunk));
