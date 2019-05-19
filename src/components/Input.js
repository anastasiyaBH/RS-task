export default class Input {
  constructor() {
    this.input = document.createElement('input');
    this.input.className = 'search-box__input';
    this.input.type = 'text';
    this.input.placeholder = 'Search on YouTube...';
  }

  getInput() {
    return this.input;
  }
}
