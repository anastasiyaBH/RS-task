import ClipsLine from './ClipsLine';
import SliderDot from '../components/SliderDot';

export default class Slider {
  constructor() {
    this.slider = document.createElement('div');
    this.slider.className = 'slider';

    this.arrayClips = [];

    this.clipsLine = new ClipsLine().getClipsLine();
    this.slider.appendChild(this.clipsLine);

    this.dotsLine = document.createElement('div');
    this.dotsLine.className = 'dots-line';

    this.slider.appendChild(this.dotsLine);

    this.numberOfCards = 0;
    this.getNumberOfCards();

    this.setWindowComtrole();
  }

  getSlider() {
    return this.slider;
  }

  addClips(arrayClips) {
    this.arrayClips = arrayClips;
    this.setSlider();
  }

  setSlider() {
    const old = this.slider.querySelector('.clips-line');
    old.innerHTML = '';
    this.dotsLine.innerHTML = '';

    for (let i = 0; i < Math.ceil(this.arrayClips.length / this.numberOfCards); i += 1) {
      const dot = new SliderDot().getSliderDot();
      dot.innerHTML = `${i + 1}`;
      this.dotsLine.appendChild(dot);
      const slide = new ClipsLine().getClipsLine();

      if (!i) {
        for (let j = i * this.numberOfCards; j < (i * this.numberOfCards + this.numberOfCards)
          && j < this.arrayClips.length; j += 1) {
          slide.appendChild(this.arrayClips[j].getClip());
          dot.classList.add('dot_active');
        }
        this.slider.replaceChild(slide, old);
      }

      dot.addEventListener('click', () => {
        this.slider.querySelector('.dot_active').classList.remove('dot_active');
        dot.classList.add('dot_active');
        const oldSlide = this.slider.querySelector('.clips-line');
        for (let j = i * this.numberOfCards; j < (i * this.numberOfCards + this.numberOfCards)
          && j < this.arrayClips.length; j += 1) {
          slide.appendChild(this.arrayClips[j].getClip());
        }
        this.slider.replaceChild(slide, oldSlide);
      });
    }
  }

  getNumberOfCards() {
    if (window.innerWidth > 0) {
      this.numberOfCards = 1;
    }

    if (window.innerWidth > 700) {
      this.numberOfCards = 2;
    }

    if (window.innerWidth > 900) {
      this.numberOfCards = 3;
    }

    if (window.innerWidth > 1200) {
      this.numberOfCards = 4;
    }
  }

  setWindowComtrole() {
    window.addEventListener('resize', () => {
      const oldNumberOfCards = this.numberOfCards;
      this.getNumberOfCards();
      if (oldNumberOfCards !== this.numberOfCards) this.setSlider();
    });
  }
}
