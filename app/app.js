import colors from 'colors';
import {
    confirmar,
    inquirerMenu,
    leerInput,
    listadoTareasBorrar,
    mostrarListadoChecklist,
    pausa
} from "./helpers/inquirer.js";
import {guardarArchivo, leerArchivo} from "./helpers/guardarArchivo.js";
import Tareas from "./models/tareas.js";


const main = async () => {

    let opt = '';
    const tareas = new Tareas();
    const tareasDB = leerArchivo();

    if (tareasDB) {
        tareas.cargarTareasFromArray(tareasDB);
    }

    do {
        opt = await inquirerMenu();
        switch (opt) {
            case '1':
                const desc = await leerInput('Descripción:');
                tareas.crearTarea(desc);
                break;
            case '2':
                tareas.listadoCompleto();
                break;
            case '3':
                tareas.listarPendientesCompletadas(true);
                break;
            case '4':
                tareas.listarPendientesCompletadas(false);
                break;
            case '5':
                const ids = await mostrarListadoChecklist(tareas.listadoArr);
                tareas.toggleCompletadas(ids);
                break;
            case'6':
                const id = await listadoTareasBorrar(tareas.listadoArr);
                if (id !== '0') {
                    const ok = await confirmar('¿Estás seguro?');
                    if (ok) {
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada');
                    }
                }
                break;
        }

        guardarArchivo(tareas.listadoArr);

        await pausa();

    } while (opt !== '0');

};

main();
