/* eslint-disable no-console */
import ClipsLine from './ClipsLine';
import SliderDot from '../components/SliderDot';

export default class Slider {
  constructor() {
    this.slider = document.createElement('div');
    this.slider.className = 'slider';

    this.arrayClips = [];
    this.numberOfCards = 0;

    this.clipsLine = new ClipsLine().getClipsLine();
    this.slider.appendChild(this.clipsLine);

    this.dotsLine = document.createElement('div');
    this.dotsLine.className = 'dots-line';

    this.slider.appendChild(this.dotsLine);
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
          this.arrayClips[j].createClipCard();
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
          this.arrayClips[j].createClipCard();
          slide.appendChild(this.arrayClips[j].getClip());
        }
        this.slider.replaceChild(slide, oldSlide);
      });
    }
  }

  getNumberOfCards() {
    function isMobileDevice() {
      return (typeof window.orientation !== 'undefined') || (navigator.userAgent.indexOf('IEMobile') !== -1);
    }

    const sizeW = isMobileDevice() ? window.screen.availWidth : window.innerWidth;

    console.log(sizeW);
    if (sizeW > 0) {
      this.numberOfCards = 1;
    }

    if (sizeW > 600) {
      this.numberOfCards = 2;
    }

    if (sizeW > 900) {
      this.numberOfCards = 3;
    }

    if (sizeW > 1200) {
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
