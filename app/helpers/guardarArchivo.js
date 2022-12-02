import * as fs from "fs";


/* Declaring a constant variable called archivo and assigning it the value of the path to the data.json file. */
const archivo = './persistencia/data.json';

/**
 * It takes a data parameter, and then writes that data to the file specified by the archivo variable
 */
const guardarArchivo = data => fs.writeFileSync(archivo, JSON.stringify(data));

/**
 * It reads the contents of a file and returns the data in the file as a JavaScript object
 * @returns the data that is being read from the file.
 */
const leerArchivo = () => {
    if (!fs.existsSync(archivo)) {
        return null;
    }
    const info = fs.readFileSync(archivo, {encoding: 'utf-8'});
    return JSON.parse(info);// TODO return data en lugar de info
};


export {
    guardarArchivo,
    leerArchivo
};
