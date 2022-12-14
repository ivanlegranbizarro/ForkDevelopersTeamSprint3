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

    /**
     * It takes an array of tasks and adds them to the list of tasks
     * @param [tareas] - An array of tasks to be loaded.
     */
    cargarTareasFromArray ( tareas = [] ) {
        tareas.forEach( tarea => {
            this._listado[ tarea.id ] = tarea;
        } );
    }

        crearTarea(desc) {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    listadoCompleto() { //TODO: Listar todas las tareas
        
    }

    listarPendientesCompletadas() { //TODO: Listar tareas completadas o pendientes
        
    }

    toggleCompletadas() {} //TODO: Completar o descompletar tareas
}

export default Tareas;
