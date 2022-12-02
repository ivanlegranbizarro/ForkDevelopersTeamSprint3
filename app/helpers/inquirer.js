import inquirer from "inquirer";

/* Creating a list of choices for the user to choose from. */
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

/**
 * It's a function that returns a promise that resolves to the value of the option property of the object returned by the
 * inquirer.prompt function
 * @returns The option selected by the user.
 */
const inquirerMenu = async () => {
    console.clear();
    console.log( '========================'.green );
    console.log( 'Seleccione una opción'.brightRed );
    console.log( '========================'.green );

    const { option } = await inquirer.prompt( preguntas );
    return option;
};

/**
 * The function `pausa()` is an asynchronous function that waits for the user to press the `ENTER` key before continuing
 */
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
}

/**
 * It asks the user for input and returns the input
 * @returns The value of the input
 */
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


/**
 * It takes an array of tasks and returns a promise that resolves to the id of the task to be deleted
 * @param [tareas] - An array of tasks to be displayed.
 * @returns The id of the task to be deleted.
 */
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


/**
 * It asks the user a question and returns true or false depending on the answer. If user confirms, the task will be deleted.
 * @returns The value of the ok property of the object returned by the await expression.
 */
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


/**
 * It takes an array of tasks and returns an array of task IDs
 * @param [tareas] - An array of tasks.
 * @returns The ids of the tasks that were selected.
 */
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
    confirmar,
    mostrarListadoChecklist
};
