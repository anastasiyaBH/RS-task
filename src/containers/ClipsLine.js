export default class ClipsLine {
  constructor() {
    this.clipsLine = document.createElement('div');
    this.clipsLine.className = 'clips-line';
  }

  getClipsLine() {
    return this.clipsLine;
  }

  addClip(clip) {
    this.clipsLine.appendChild(clip.getClip());
  }
}
