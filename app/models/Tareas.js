import Tarea from "./Tarea.js";

/* It's a class that manages a list of tasks */
class Tareas {
    _listado = {};

    constructor () {
        this._listado = {};
    }
    borrarTarea ( id = '' ) {
        if ( this._listado[ id ] ) {
            delete this._listado[ id ];
        }
    }
    get listadoArr () {
        const listado = [];
        Object.keys( this._listado ).forEach( key => {
            const tarea = this._listado[ key ];
            listado.push( tarea );
        } );
        return listado;
    }

    cargarTareasFromArray ( tareas = [] ) {
        tareas.forEach( tarea => {
            this._listado[ tarea.id ] = tarea;
        } );
    }

}

export default Tareas;
