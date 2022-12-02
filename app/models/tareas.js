import Tarea from "./tarea.js";

/* It's a class that manages a list of tasks */
class Tareas {
    _listado = {};

    constructor() {
        this._listado = {};
    }

    /**
     * It deletes a task from the list of tasks
     * @param [id] - The id of the task to be deleted.
     */
    borrarTarea(id = '') {
        if (this._listado[id]) {
            delete this._listado[id];
        }
    }

    /**
     * It takes the object this._listado and returns an array of the values of the object
     * @returns The listadoArr method is returning an array of the tasks in the list.
     */
    get listadoArr() {
        const listado = [];
        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key];
            listado.push(tarea);
        });
        return listado;
    }

    /**
     * It takes an array of tasks and adds them to the list of tasks
     * @param [tareas] - An array of tasks to be loaded.
     */
    cargarTareasFromArray(tareas = []) {
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        });
    }

    /**
     * The function crearTarea() takes a string as an argument and creates a new Tarea object with that string as the
     * description
     * @param desc - The description of the task.
     */
    crearTarea(desc) {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    /**
     * The function listadoCompleto() is a method of the class TareasPendientes. It takes no arguments. It logs to the
     * console the index of each task in the array listadoArr, the description of the task, and the status of the task
     */
    listadoCompleto() {
        console.log();
        this.listadoArr.forEach((tarea, i) => {
            const idx = `${i + 1}`.green;
            const {desc, completadoEn} = tarea;
            const estado = completadoEn
                ? 'Completada'.green
                : 'Pendiente'.red;
            console.log(`${idx} ${desc} :: ${estado}`);
        });
    }

    /**
     * The function takes a boolean as an argument, and if the boolean is true, it will list all the completed tasks, and
     * if the boolean is false, it will list all the pending tasks
     * @param [completadas=true] - boolean
     */
    listarPendientesCompletadas(completadas = true) {
        console.log();
        let contador = 0;
        this.listadoArr.forEach(tarea => {
            const {desc, completadoEn} = tarea;
            const estado = completadoEn
                ? 'Completada'.green
                : 'Pendiente'.red;
            if (completadas) {
                if (completadoEn) {
                    contador += 1;
                    console.log(`${`${contador}.`.green} ${desc} :: ${completadoEn.green}`);
                }
            } else {
                if (!completadoEn) {
                    contador += 1;
                    console.log(`${`${contador}.`.red} ${desc} :: ${estado}`);
                }
            }
        });
    }

    /**
     * It takes an array of ids, and for each id in the array, it sets the `completadoEn` property of the task with that id
     * to the current date and time
     * @param [ids] - An array of ids of the tasks to be completed.
     */
    toggleCompletadas(ids = []) {
        ids.forEach(id => {
            const tarea = this._listado[id];
            if (!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString();
            }
        });
        this.listadoArr.forEach(tarea => {
            if (!ids.includes(tarea.id)) {
                this._listado[tarea.id].completadoEn = null;
            }
        });
    }
}

export default Tareas;
