export default class Clip {
  constructor(clipInform) {
    this.clipInform = clipInform;
    this.clip = document.createElement('div');
    this.clip.className = 'clip';

    this.createClipCard();
  }

  createClipCard() {
    this.clip.innerHTML = `<div class="clip__image">
    <img src=${this.clipInform.imgURL}>
    <div class="clip__background-title">
        <a href="${this.clipInform.url}" target="_blank" class="clip__title">${this.clipInform.title}</a>
    </div>
  </div>
  <ul class="description-list">
    <li class="description-list__item">
      <i class="fas fa-user"></i>
      <h3>${this.clipInform.channelTitle}</h3>
    </li>
    <li class="description-list__item">
      <i class="fas fa-eye"></i>
      <h3>${this.clipInform.viewCount}</h3>
    </li>
    <li class="description-list__item">
      <i class="far fa-calendar-alt"></i>
      <h3>${this.clipInform.publishedAt}</h3>
    </li>
    <li class="description-list__item">
      <p>${this.clipInform.description}</p>
    </li>
  </ul>`;
  }

  getClip() {
    return this.clip;
  }
}
