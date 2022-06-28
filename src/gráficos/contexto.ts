const propiedadesExcluidas = ['canvas'];


class Contexto {
    #canvas: any;
    #Gráfico: any;
    #propiedaes: { [llave: string]: any };
    #métodos: { [llave: string]: { activo: Boolean, args: any } };
    #cargarEstado: Function = () => {
        for (let llave in this.#métodos) {
            const { activo, args } = this.#métodos[llave];
            if (activo) { this.#canvas[llave].apply(this.#canvas, args); }
        }
    }
    #establecerCanvas: Function = (canvas: any) => {
        this.#canvas = canvas;
        for (let llave in this.#canvas) {
            if (!propiedadesExcluidas.find(prop => prop === llave)) {
                const tipoFunción = typeof this.#canvas[llave] === 'function';
                this[tipoFunción ? '#métodos' : '#propiedaes'][llave] = tipoFunción ? { activo: false, args: [] } : this.#canvas[llave];
            }
        }
    }
    constructor(canvas) {
        this.#establecerCanvas(canvas);
    }


}


