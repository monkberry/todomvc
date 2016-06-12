import TodoTextInput from './TodoTextInput.monk';

export default class extends TodoTextInput {
  constructor() {
    super();
    this.state = {
      editing: false,
      noBlur: false,
      onSave: null
    };
    this.on('keydown', 'input', this.onKeyDown.bind(this));
    this.on('blur', 'input', this.onBlur.bind(this));
  }

  update(state) {
    Object.assign(this.state, state);
    super.update(state);
  }

  onKeyDown(event) {
    if (event.which === 13) {
      const text = event.target.value.trim();

      if (!this.state.editing) {
        super.update({text: ''});
      }

      this.state.noBlur = true;
      this.state.onSave(text);
      this.state.noBlur = false;
    }
  }

  onBlur(event) {
    if (this.state.editing && !this.state.noBlur) {
      const text = event.target.value.trim();
      this.state.onSave(text);
    }
  }
}
