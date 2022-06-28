import { Plano, Punto, Puntos, Pt } from "./geometría";

class Contexto {
    #Canvas: any;
    #Gráfico: any;
    #estado: {
        propiedaes: { [llave: string]: any },
        métodos: { [llave: string]: { activo: Boolean, args: any } }
    }
    #cargarEstado: Function = () => {
        for (let llave in this.#estado.métodos) {
            const {activo,args} = this.#estado.métodos[llave];
            if (activo) { this.#Canvas[llave].apply(this.#Canvas,args); }
        }
    }
    #copiarContextoDeCanvas: Function = (canvas)=>{
        for(let key in this.#Canvas){
            if(typeof this.#Canvas[key] !== 'function'){ CONTEXT.properties[key] = this.#Canvas[key]; }
            else{ CONTEXT.functions[key] = {state: false, args: [] }; }
          }
    }
    constructor(canvas) {
        this.#Canvas = canvas;
    }


}


