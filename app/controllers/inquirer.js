import inquirer from "inquirer";

const preguntas = [
    {
        type: 'list',
        name: 'option',
        message: 'Elige una opción',
        choices: [
            {
                value: '1',
                name: `${ '1.'.green } Crear tarea`
            },
            {
                value: '2',
                name: `${ '2.'.green } Listar tareas`
            },
            {
                value: '3',
                name: `${ '3.'.green } Listar tareas completadas`
            },
            {
                value: '4',
                name: `${ '4.'.yellow } Listar tareas pendientes`
            },
            {
                value: '5',
                name: `${ '5.'.green } Completar tarea(s)`
            },
            {
                value: '6',
                name: `${ '6.'.green } Borrar tarea`
            },
            {
                value: '0',
                name: `${ '0.'.red } Salir`
            }
        ]
    }
];
const inquirerMenu = async () => {
    console.clear();
    console.log( '========================'.green );
    console.log( 'Seleccione una opción'.brightRed );
    console.log( '========================'.green );

    const { option } = await inquirer.prompt( preguntas );
    return option;
};
async function pausa () {
    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${ 'ENTER'.green } para continuar`
        }
    ];
    console.log( 'Pausa' );
    await inquirer.prompt( question );
};
const leerInput = async message => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate ( value ) {
                if ( value.length === 0 ) {
                    return 'Por favor, ingrese un valor';
                }
                return true;
            }
        }
    ];
    const { desc } = await inquirer.prompt( question );
    return desc;
};


const listadoTareasBorrar = async ( tareas = [] ) => {
    const choices = tareas.map( ( tarea, i ) => {
        const idx = `${ i + 1 }.`.green;
        return {
            value: tarea.id,
            name: `${ idx } ${ tarea.desc }`
        };
    } );
    choices.unshift( {
        value: '0',
        name: `${ '0.'.green } Cancelar`
    } );
    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }
    ];
    const { id } = await inquirer.prompt( preguntas );
    return id;
};



const confirmar = async message => {
    const pregunta = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];
    const { ok } = await inquirer.prompt( pregunta );
    return ok;
};
const mostrarListadoChecklist = async ( tareas = [] ) => {
    const choices = tareas.map( ( tarea, i ) => {
        const idx = `${ i + 1 }.`.green;
        return {
            value: tarea.id,
            name: `${ idx } ${ tarea.desc }`,
            checked: !!tarea.completadoEn
        };
    } );
    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones',
            choices
        }
    ];
    const { ids } = await inquirer.prompt( pregunta );
    return ids;
};


export {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    mostrarListadoChecklist,
    confirmar
};