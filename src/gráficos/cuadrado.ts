import { Pt, Punto, Cuadrado as Geometría } from "../geometría";
import { Gráfico } from "./gráfico";

interface IntefazDeCuadrado {
  canvas: HTMLCanvasElement;
  tamaño: number;
  origen?: Pt;
}

export class Cuadrado extends Gráfico {
  #geometría: Geometría;
  #render() {
    let pts = this.#geometría.pts.obtener();
    this.contexto.moveTo(pts[0].x, pts[0].y);
    pts.forEach((pt) => {
      this.contexto.lineTo(pt.x, pt.y);
    });
    this.contexto.stroke();
  }

  constructor(data: IntefazDeCuadrado) {
    super(data.canvas);
    const { tamaño, origen } = data;
    this.#geometría = new Geometría({ tamaño, origen });
    this.render = () => {
      this.#render();
    };
  }
}
