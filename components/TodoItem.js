import TodoItem from './TodoItem.monk';

export default class extends TodoItem {
  constructor() {
    super();
    this.state = {
      todo: null,
      editing: false
    };

    this.on('click', '.toggle', this.onToggle.bind(this));
    this.on('click', '.destroy', this.onDestroy.bind(this));
    this.on('dblclick', 'label', this.onDblClick.bind(this));
  }

  update(state) {
    Object.assign(this.state, state);
    super.update(this.state);
  }

  onToggle(event) {
    this.context.completeTodo(this.state.todo.id);
  }

  onDestroy(event) {
    this.context.deleteTodo(this.state.todo.id);
  }

  onDblClick(event) {
    this.update({editing: true});
    this.querySelector('input').focus();
  }

  handleSave(text) {
    if (text.length === 0) {
      this.context.deleteTodo(this.state.todo.id)
    } else {
      this.context.editTodo(this.state.todo.id, text)
    }

    this.update({editing: false});
  }
}