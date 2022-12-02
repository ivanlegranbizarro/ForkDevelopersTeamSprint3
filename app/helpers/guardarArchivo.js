import * as fs from "fs";


const archivo = './persistencia/data.json';

const guardarArchivo = data => fs.writeFileSync(archivo, JSON.stringify(data));

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