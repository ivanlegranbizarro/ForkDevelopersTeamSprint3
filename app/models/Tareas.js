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

    /**
     * It creates a new array, iterates over the keys of the object, and pushes the values of the object into the new array.
     *
     * @returns An array of objects.
     */
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

/**
 * The function crearTarea() creates a new Tarea object and adds it to the _listado object.
 * @param desc - The description of the task.
 */
    crearTarea ( desc ) {
        const tarea = new Tarea( desc );
        this._listado[ tarea.id ] = tarea;
    }

/**
 * It takes the list of tasks, and for each task, it prints out the task's index, description, and status.
 */
    listadoCompleto () {
        console.log();
        this.listadoArr.forEach( ( tarea, i ) => {
            const idx = `${ i + 1 }`.green;
            const { desc, completadoEn } = tarea;
            const estado = completadoEn
                ? 'Completada'.green
                : 'Pendiente'.red;
            console.log( `${ idx } ${ desc } :: ${ estado }` );
        } );
    }

/**
 * It's a function that takes a boolean as an argument and returns a list of tasks that are either completed or pending.
 *
 * @param [completadas=true] - true
 */
    listarPendientesCompletadas ( completadas = true ) {
        console.log();
        let contador = 0;
        this.listadoArr.forEach( tarea => {
            const { desc, completadoEn } = tarea;
            const estado = completadoEn
                ? 'Completada'.green
                : 'Pendiente'.red;
            if ( completadas ) {
                if ( completadoEn ) {
                    contador += 1;
                    console.log( `${ `${ contador }.`.green } ${ desc } :: ${ completadoEn.green }` );
                }
            } else {
                if ( !completadoEn ) {
                    contador += 1;
                    console.log( `${ `${ contador }.`.red } ${ desc } :: ${ estado }` );
                }
            }
        } );
    }

/**
 * It takes an array of ids, and for each id in the array, it sets the `completadoEn` property of the corresponding task to
 * the current date.
 *
 * @param [ids] - an array of ids of the tasks to be completed
 */
    toggleCompletadas ( ids = [] ) {
        ids.forEach( id => {
            const tarea = this._listado[ id ];
            if ( !tarea.completadoEn ) {
                tarea.completadoEn = new Date().toISOString();
            }
        } );
        this.listadoArr.forEach( tarea => {
            if ( !ids.includes( tarea.id ) ) {
                this._listado[ tarea.id ].completadoEn = null;
            }
        } );
    }
}

export default Tareas;