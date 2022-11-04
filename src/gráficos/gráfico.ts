interface IntefazDeGráfico {
  render: () => void;
  contexto: CanvasRenderingContext2D | false;
  props: { [llave: string]: any };
  canvas: HTMLCanvasElement;
}

export class Gráfico implements IntefazDeGráfico {
  #render: () => void = () => {};
  #props: { [llave: string]: any } = {};
  #canvas: HTMLCanvasElement;
  #contexto: CanvasRenderingContext2D;
  #prepararContexto() {
    this.#contexto.save();
    this.#contexto.beginPath();
    for (const prop in this.#props) {
      const esFunción = typeof this.#contexto[prop] == "function";
      if (!esFunción) {
        this.#contexto[prop] = this.#props[prop];
      } else {
        this.contexto[prop].apply(this.#contexto, this.#props[prop]);
      }
    }
  }
  #finalizarRender() {
    this.#contexto.closePath();
    this.#contexto.restore();
  }

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
  }

  get contexto() {
    return this.#contexto;
  }

  get canvas() {
    return this.#canvas;
  }
  set canvas(elemento: HTMLCanvasElement) {
    this.#canvas = elemento;
    this.#contexto = elemento.getContext("2d");
  }

  get props() {
    return this.#props;
  }
  set props(props: { [llave: string]: any }) {
    this.#props = props;
  }

  get render() {
    return this.#render;
  }
  set render(render: () => void) {
    this.#render = () => {
      this.#prepararContexto();
      render();
      this.#finalizarRender();
    };
  }
}
