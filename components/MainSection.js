import MainSection from './MainSection.monk';
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/TodoFilters';

const TODO_FILTERS = {
  [SHOW_ALL]: () => true,
  [SHOW_ACTIVE]: todo => !todo.completed,
  [SHOW_COMPLETED]: todo => todo.completed
};

export default class extends MainSection {
  constructor() {
    super();
    this.state = {
      filter: SHOW_ALL,
      completedCount: 0,
      activeCount: 0,
      filteredTodos: [],
      todos: []
    };

    this.on('click', '.toggle-all', this.onToggleAll.bind(this));
  }

  update({filter, todos}) {
    if (filter) {
      this.state.filter = filter;
    }

    if (todos) {
      this.state.todos = todos;
      this.state.completedCount = todos.reduce((count, todo) => todo.completed ? count + 1 : count, 0);
      this.state.activeCount = todos.length - this.state.completedCount;
      this.state.filteredTodos = todos.filter(TODO_FILTERS[this.state.filter]);
    }

    super.update(this.state);
  }

  handleShow(filter) {
    this.update({...this.state, filter});
  }

  onToggleAll(event) {
    this.context.completeAll();
  }
}
