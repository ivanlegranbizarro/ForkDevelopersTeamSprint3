import Tarea from "./Tarea.js";

/* It's a class that manages a list of tasks */
class Tareas {
    _listado = {};

    constructor() {
        this._listado = {};
    }
    borrarTarea(id = '') {
        if (this._listado[id]) {
            delete this._listado[id];
        }
    }

}

export default Tareas;