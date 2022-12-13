import {v4} from "uuid";

/* The class Tarea is a blueprint for creating objects that have the property's id, desc, and completadoEn. */
class Tarea {
    id = '';
    desc = '';
    completadoEn = null;

    constructor(desc) {
        this.id = v4();
        this.desc = desc;
        this.completadoEn = null;
    }

}

export default Tarea;