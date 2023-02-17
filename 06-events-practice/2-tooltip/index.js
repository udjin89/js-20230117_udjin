class Tooltip {

  static instance; //паттерн «Singleton»

  element;

  constructor() {
    // Реализуем паттерн «Singleton»
    if (Tooltip.instance) {
      return Tooltip.instance;
    }

    Tooltip.instance = this;

    // this.onPointerOver = this.onPointerOver.bind(this);
  }

  initialize() {
    this.initEventListners();
  }

  initEventListners() {
    document.addEventListener('pointerover', this.onPointerOver);
    document.addEventListener('pointerout', this.onPointerOut);
  }

  onPointerOver = (event) => {
    const element = event.target.closest('[data-tooltip]');

    if (element) {
      this.render(element.dataset.tooltip);
      document.addEventListener('pointermove', this.onPointerMove);
    }
  }
  onPointerOver() {

  }
  onPointerOut = () => {
    this.remove();
    document.removeEventListener('pointermove', this.onPointerMove);
  }
  onPointerMove = (event) => {
    this.moveTooltip(event);
  }

  render(html) {
    this.element = document.createElement('div');
    this.element.className = 'tooltip';
    this.element.innerHTML = html;
    console.log(this.element.innerHtml)

    document.body.append(this.element);
  }

  moveTooltip(event) {
    const shift = 10;
    const left = event.clientX + shift;
    const right = event.clientY + shift;

    this.element.style.left = `${left}px`;
    this.element.style.left = `${left}px`;
  }

  remove() {
    if (this.element) {
      this.element.remove();
    }

  }
  destroy() {
    document.removeEventListener('pointerover', this.onPointerOver);
    document.removeEventListener('pointerout', this.onPointerOut);
    document.removeEventListener('pointermove', this.onPointerMove);

    this.remove();
    this.element = null;
  }
}

export default Tooltip;
