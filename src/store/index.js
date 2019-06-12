import {createStore, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';
import thunk from 'redux-thunk'
import reducer from './reducer'

const composeEnhancers = composeWithDevTools({
  // options like actionSanitizer, stateSanitizer
});

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)))

export default store
