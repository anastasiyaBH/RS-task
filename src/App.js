import SearchBox from './containers/SearchBox';
import Slider from './containers/Slider';
import loadClipInform from './api/api';
import Clip from './components/Clip';
import LoadImage from './components/LoadImage';

export default class App {
  constructor() {
    this.main = document.createElement('main');
    this.main.className = 'main';
    document.body.appendChild(this.main);
  }

  start() {
    const searchBox = new SearchBox().getSearchBox();
    this.main.appendChild(searchBox);

    const loadImage = new LoadImage('../../src/assets/img/icon-youtube1.png').getLoadImage();
    this.main.appendChild(loadImage);

    searchBox.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        const slider = new Slider();
        const clips = [];
        loadClipInform(searchBox.querySelector('.search-box__input').value)
          .then((arr) => {
            arr.forEach((e) => {
              const clip = new Clip(e);
              clips.push(clip);
            });
            slider.addClips(clips);
          });
        if (this.main.contains(loadImage)) {
          this.main.removeChild(loadImage);
          this.main.appendChild(slider.getSlider());
        } else {
          this.main.replaceChild(slider.getSlider(), this.main.querySelector('.slider'));
        }
      }
    });
  }
}
