interface IntefazDeGráfico {
    render(): void,
    contexto: CanvasRenderingContext2D | false,
    estado: { [llave: string]: any }
    canvas: HTMLCanvasElement,
}

export class Gráfico implements IntefazDeGráfico {
    #estado;
    #canvas;
    #contexto;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
    }

    get contexto() { return this.#contexto }

    get canvas() { return this.#canvas; }
    set canvas(elemento: HTMLCanvasElement) {
        this.#canvas = elemento;
        this.#contexto = elemento.getContext('2d') || false;
    }

    get estado() { return this.#estado }
    set estado(obj: { prop: string, valor: any }) {
        const { valor, prop } = obj;
        if (!Boolean(valor)) { delete this.#estado[prop]; }
        else { this.#estado[prop] = valor }
    }

    render() {  }

    // prepararContexto() {
    //     this.#contexto.save()
    //     this.#contexto.beginPath()
    //     for (const llave in this.#estado) {
    //         const esFunción = typeof this.#contexto[llave] == 'function';
    //         if (!esFunción) { this.#contexto[llave] = this.#estado[llave]; }
    //     }
    // }

    // finalizarRender(){
    //     this.#contexto.closePath();
    //     this.#contexto.restore();
    // }
}
