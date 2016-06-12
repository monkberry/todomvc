import Monkberry from 'monkberry';
import 'monkberry-events';
import App from './components/App.monk';
import * as TodoActions from './actions/todos'
import { bindActionCreators } from 'redux'
import configureStore from './store/configureStore'
import 'todomvc-app-css/index.css'

const store = configureStore();
const context = bindActionCreators(TodoActions, store.dispatch);

let view = Monkberry.render(App, document.body, {context});

const listener = () => view.update(store.getState());
store.subscribe(listener);
listener();

if (module.hot) {
  module.hot.accept('./components/App.monk', () => {
    view.remove();
    const App = require('./components/App.monk');
    view = Monkberry.render(App, document.body, {context});
    view.update(store.getState());
  });
}
