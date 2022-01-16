interface Pt {
    x: number,
    y: number,
    z?: number,
}

interface Transformación extends Pt{
    origin: Pt,
}

interface Rotación extends Transformación {
    grados: number, 
}

class Punto {
    #x: number;
    #y: number;
    #z: number;

    constructor(pt: Pt) {
        const { x, y, z } = pt;
        this.#x = x ? x : 0;
        this.#y = y ? y : 0;
        this.#z = z ? z : 0;
    }

    get x() { return this.#x; }
    set x(valor: number) { this.#x = valor; }

    get y() { return this.#y; }
    set y(valor: number) { this.#y = valor; }

    get z() { return this.#z; }
    set z(valor: number) { this.#z = valor; }


    translate(valores: Pt ) {
        const { x, y, z } = valores;
        x ? this.#x += x : false;
        y ? this.#y += y : false;
        z ? this.#z += z : false;
    }

    rotar(data: Rotación) {
        const {grados,origin} = data;

        let radianes = ((grados) * (Math.PI / 180)) * -1;
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