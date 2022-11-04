export interface Pt {
  x: number;
  y: number;
  z?: number;
}

export interface Transformación extends Pt {
  origin: Pt;
}

export interface Rotación extends Transformación {
  grados: number;
}

export class Punto {
  #x: number;
  #y: number;
  #z: number;

  constructor(pt: Pt) {
    const { x, y, z } = pt;
    this.#x = x ? x : 0;
    this.#y = y ? y : 0;
    this.#z = z ? z : 0;
  }

  get x() {
    return this.#x;
  }
  set x(valor: number) {
    this.#x = valor;
  }

  get y() {
    return this.#y;
  }
  set y(valor: number) {
    this.#y = valor;
  }

  get z() {
    return this.#z;
  }
  set z(valor: number) {
    this.#z = valor;
  }

  translate(valores: Pt) {
    const { x, y, z } = valores;
    x ? (this.#x += x) : false;
    y ? (this.#y += y) : false;
    z ? (this.#z += z) : false;
  }

  rotar(data: Rotación) {
    const { grados, origin } = data;

    let radianes = grados * (Math.PI / 180) * -1;
    let cos = Math.cos(radianes);
    let sin = Math.sin(radianes);

    this.#x = this.#x - origin.x;
    this.#y = this.#y - origin.y;
    let x = this.#x * cos - this.#y * sin;
    let y = this.#x * sin + this.#y * cos;
    this.#x = x + origin.x;
    this.#y = y + origin.y;
  }
}

export class Puntos {
  #listado: Punto[];

  constructor(pts: Punto[]) {
    this.#listado = pts;
  }

  min(eje: "x" | "y") {
    return this.#listado.reduce((min, pt) => {
      return Math.min(min, pt[eje]);
    }, 0);
  }

  max(eje: "x" | "y") {
    return this.#listado.reduce((min, pt) => {
      return Math.max(min, pt[eje]);
    }, 0);
  }

  obtener() {
    return this.#listado;
  }

  actualizar(data: Punto[] | { pt: Punto; índice: number }) {
    if (Array.isArray(data)) {
      this.#listado = data;
    } else {
      const { pt, índice } = data;
      this.#listado[índice] = pt;
    }

    return this.#listado;
  }

  agregar(pt: Punto) {
    this.#listado.push(pt);
    return this.#listado;
  }
}

export class Plano {
  #pts: Puntos;
  #origen: Pt;
  constructor(data: { pts: Puntos; origen: Pt }) {
    this.#origen = data.origen;
    this.#pts = data.pts;
  }

  get origen() {
    return this.#origen;
  }
  set origen(pt: Pt) {
    this.#origen = pt;
  }

  get pts() {
    return this.#pts;
  }

  get ancho() {
    return this.#pts.max("x") - this.#pts.min("x");
  }

  get altura() {
    return this.#pts.max("y") - this.#pts.min("y");
  }
}

export class Cuadrado extends Plano {
  constructor(data: { tamaño: number; origen?: Pt }) {
    let pts: Punto[] | Puntos = [];
    let { tamaño, origen } = data;
    origen = origen ? origen : { x: 0, y: 0 };
    for (let i = 0; i < 4; i++) {
      const pt = { x: origen.x, y: origen.y };
      if (i > 0) {
        pt.x += tamaño;
      }
      if (i > 1) {
        pt.y += tamaño;
      }
      if (i === 3) {
        pt.x = origen.x;
      }

      pts.push(new Punto(pt));
    }

    pts = new Puntos(pts);

    super({ pts, origen });
  }
}
