import Footer from './Footer.monk';
import { SHOW_ALL } from '../constants/TodoFilters'

export default class extends Footer {
  constructor() {
    super();
    this.state = {
      completedCount: 0,
      activeCount: 0,
      filter: SHOW_ALL,
      onShow: null
    };
    this.on('click', '.clear-completed', this.onClearCompleted.bind(this));
    this.on('click', '[data-filter]', this.onFilter.bind(this));
  }

  update(state) {
    Object.assign(this.state, state);
    super.update(state);
  }

  onClearCompleted(event) {
    this.context.clearCompleted();
  }

  onFilter(event) {
    this.state.onShow(event.target.dataset.filter);
  }
}
