import * as fs from "fs";


const guardarArchivo = data => {
    const archivo = './persistencia/data.json';
    fs.writeFileSync(archivo, JSON.stringify(data));
};


export default guardarArchivo;