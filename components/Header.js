import Header from './Header.monk';

export default class extends Header {
  handleSave(text) {
    if (text.length !== 0) {
      this.context.addTodo(text);
    }
  }
}
