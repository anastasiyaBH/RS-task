export default class LoadImage {
  constructor(src) {
    this.loadImage = document.createElement('img');
    this.loadImage.setAttribute('src', src);
    this.loadImage.className = 'loadImage';
  }

  getLoadImage() {
    return this.loadImage;
  }
}
