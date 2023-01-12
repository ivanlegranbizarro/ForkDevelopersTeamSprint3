import {guardarArchivo, leerArchivo} from "./persistencia/JSON/guardarArchivo.js";

import 'colors'
import {
    confirmar,
    inquirerMenu,
    leerInput,
    listadoTareasBorrar, mostrarListadoChecklist, listadoTareasActualizar,
    pausa
} from "./controllers/inquirer.js";
import Tareas from "./models/Tareas.js";

const main = async () => {
    let opt = '';
    const tareas = new Tareas();
    const tareasDB = leerArchivo();

    if ( tareasDB ) {
        tareas.cargarTareasFromArray( tareasDB );
    }

    do {
        opt = await inquirerMenu();
        switch ( opt ) {
            case '1':
                const desc = await leerInput( 'Descripción:' );
                tareas.crearTarea( desc );
                break;
            case '2':
                tareas.listadoCompleto();
                break;

            case '3':
                tareas.listarPendientesCompletadas( true );
                break;
            case '4':
                tareas.listarPendientesCompletadas( false );
                break;
            case '5':
                const ids = await mostrarListadoChecklist( tareas.listadoArr );
                tareas.toggleCompletadas( ids );
                break;
            case '6':
                const id = await listadoTareasBorrar( tareas.listadoArr );
                if ( id !== '0' ) {
                    const ok = await confirmar( '¿Estás seguro?' );
                    if ( ok ) {
                        tareas.borrarTarea( id );
                        console.log( 'Tarea borrada' );
                    }
                }
                break;
            case '7':
                const id2 = await listadoTareasActualizar( tareas.listadoArr );
                if ( id2 !== '0' ) {         
                        const desc = await leerInput( 'Introduce la nueva Descripción: ');
                        tareas.actualizarTarea( id2 , desc );           
                }   
        }

        guardarArchivo( tareas.listadoArr );

        await pausa();

    } while ( opt !== '0' );
};

main();