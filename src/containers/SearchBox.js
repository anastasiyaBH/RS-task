import Input from '../components/Input';

export default class SearchBox {
  constructor() {
    this.searchBox = document.createElement('div');
    this.searchBox.className = 'search-box';

    const inpt = new Input().getInput();
    this.searchBox.appendChild(inpt);
    this.searchBox.innerHTML += '<div class="search-box__search-button"><i class="fas fa-search"></i></div>';
  }

  getSearchBox() {
    return this.searchBox;
  }
}
