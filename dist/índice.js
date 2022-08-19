var Garabato = (function (exports) {
    'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    function __classPrivateFieldGet(receiver, state, kind, f) {
        if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    }

    function __classPrivateFieldSet(receiver, state, value, kind, f) {
        if (kind === "m") throw new TypeError("Private method is not writable");
        if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
    }

    var _Punto_x, _Punto_y, _Punto_z, _Puntos_listado, _Plano_pts, _Plano_origen;
    class Punto {
        constructor(pt) {
            _Punto_x.set(this, void 0);
            _Punto_y.set(this, void 0);
            _Punto_z.set(this, void 0);
            const { x, y, z } = pt;
            __classPrivateFieldSet(this, _Punto_x, x ? x : 0, "f");
            __classPrivateFieldSet(this, _Punto_y, y ? y : 0, "f");
            __classPrivateFieldSet(this, _Punto_z, z ? z : 0, "f");
        }
        get x() { return __classPrivateFieldGet(this, _Punto_x, "f"); }
        set x(valor) { __classPrivateFieldSet(this, _Punto_x, valor, "f"); }
        get y() { return __classPrivateFieldGet(this, _Punto_y, "f"); }
        set y(valor) { __classPrivateFieldSet(this, _Punto_y, valor, "f"); }
        get z() { return __classPrivateFieldGet(this, _Punto_z, "f"); }
        set z(valor) { __classPrivateFieldSet(this, _Punto_z, valor, "f"); }
        translate(valores) {
            const { x, y, z } = valores;
            x ? __classPrivateFieldSet(this, _Punto_x, __classPrivateFieldGet(this, _Punto_x, "f") + x, "f") : false;
            y ? __classPrivateFieldSet(this, _Punto_y, __classPrivateFieldGet(this, _Punto_y, "f") + y, "f") : false;
            z ? __classPrivateFieldSet(this, _Punto_z, __classPrivateFieldGet(this, _Punto_z, "f") + z, "f") : false;
        }
        rotar(data) {
            const { grados, origin } = data;
            let radianes = ((grados) * (Math.PI / 180)) * -1;
            let cos = Math.cos(radianes);
            let sin = Math.sin(radianes);
            __classPrivateFieldSet(this, _Punto_x, __classPrivateFieldGet(this, _Punto_x, "f") - origin.x, "f");
            __classPrivateFieldSet(this, _Punto_y, __classPrivateFieldGet(this, _Punto_y, "f") - origin.y, "f");
            let x = __classPrivateFieldGet(this, _Punto_x, "f") * cos - __classPrivateFieldGet(this, _Punto_y, "f") * sin;
            let y = __classPrivateFieldGet(this, _Punto_x, "f") * sin + __classPrivateFieldGet(this, _Punto_y, "f") * cos;
            __classPrivateFieldSet(this, _Punto_x, x + origin.x, "f");
            __classPrivateFieldSet(this, _Punto_y, y + origin.y, "f");
        }
    }
    _Punto_x = new WeakMap(), _Punto_y = new WeakMap(), _Punto_z = new WeakMap();
    class Puntos {
        constructor(pts) {
            _Puntos_listado.set(this, void 0);
            __classPrivateFieldSet(this, _Puntos_listado, pts, "f");
        }
        min(eje) {
            return __classPrivateFieldGet(this, _Puntos_listado, "f").reduce((min, pt) => { return Math.min(min, pt[eje]); }, 0);
        }
        max(eje) {
            return __classPrivateFieldGet(this, _Puntos_listado, "f").reduce((min, pt) => { return Math.max(min, pt[eje]); }, 0);
        }
        obtener() { return __classPrivateFieldGet(this, _Puntos_listado, "f"); }
        actualizar(data) {
            if (Array.isArray(data)) {
                __classPrivateFieldSet(this, _Puntos_listado, data, "f");
            }
            else {
                const { pt, índice } = data;
                __classPrivateFieldGet(this, _Puntos_listado, "f")[índice] = pt;
            }
            return __classPrivateFieldGet(this, _Puntos_listado, "f");
        }
        agregar(pt) {
            __classPrivateFieldGet(this, _Puntos_listado, "f").push(pt);
            return __classPrivateFieldGet(this, _Puntos_listado, "f");
        }
    }
    _Puntos_listado = new WeakMap();
    class Plano {
        constructor(data) {
            _Plano_pts.set(this, void 0);
            _Plano_origen.set(this, void 0);
            __classPrivateFieldSet(this, _Plano_origen, data.origen, "f");
            __classPrivateFieldSet(this, _Plano_pts, data.pts, "f");
        }
        get origen() { return __classPrivateFieldGet(this, _Plano_origen, "f"); }
        set origen(pt) { __classPrivateFieldSet(this, _Plano_origen, pt, "f"); }
        get pts() { return __classPrivateFieldGet(this, _Plano_pts, "f"); }
        get ancho() {
            return __classPrivateFieldGet(this, _Plano_pts, "f").max('x') - __classPrivateFieldGet(this, _Plano_pts, "f").min('x');
        }
        get altura() {
            return __classPrivateFieldGet(this, _Plano_pts, "f").max('y') - __classPrivateFieldGet(this, _Plano_pts, "f").min('y');
        }
    }
    _Plano_pts = new WeakMap(), _Plano_origen = new WeakMap();
    class Cuadrado$1 extends Plano {
        constructor(data) {
            let pts = [];
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

    var _Gráfico_estado, _Gráfico_canvas, _Gráfico_contexto;
    class Gráfico {
        constructor(canvas) {
            _Gráfico_estado.set(this, void 0);
            _Gráfico_canvas.set(this, void 0);
            _Gráfico_contexto.set(this, void 0);
            this.canvas = canvas;
        }
        get contexto() { return __classPrivateFieldGet(this, _Gráfico_contexto, "f"); }
        get canvas() { return __classPrivateFieldGet(this, _Gráfico_canvas, "f"); }
        set canvas(elemento) {
            __classPrivateFieldSet(this, _Gráfico_canvas, elemento, "f");
            __classPrivateFieldSet(this, _Gráfico_contexto, elemento.getContext('2d') || false, "f");
        }
        get estado() { return __classPrivateFieldGet(this, _Gráfico_estado, "f"); }
        set estado(obj) {
            const { valor, prop } = obj;
            if (!Boolean(valor)) {
                delete __classPrivateFieldGet(this, _Gráfico_estado, "f")[prop];
            }
            else {
                __classPrivateFieldGet(this, _Gráfico_estado, "f")[prop] = valor;
            }
        }
        render() { }
    }
    _Gráfico_estado = new WeakMap(), _Gráfico_canvas = new WeakMap(), _Gráfico_contexto = new WeakMap();

    var _Cuadrado_geometría;
    class Cuadrado extends Gráfico {
        constructor(data) {
            super(data.canvas);
            _Cuadrado_geometría.set(this, void 0);
            const { tamaño, origen } = data;
            __classPrivateFieldSet(this, _Cuadrado_geometría, new Cuadrado$1({ tamaño, origen }), "f");
        }
        render() {
            let pts = __classPrivateFieldGet(this, _Cuadrado_geometría, "f").pts.obtener();
            this.contexto.moveTo(pts[0].x, pts[0].y);
            pts.forEach((pt) => { this.contexto.lineTo(pt.x, pt.y); });
        }
    }
    _Cuadrado_geometría = new WeakMap();

    exports.Cuadrado = Cuadrado;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

})({});
