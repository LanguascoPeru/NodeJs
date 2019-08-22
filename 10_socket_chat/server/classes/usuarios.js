class Usuarios {
    constructor() {
        this.personas = [];
    }

    agregarPersona(id, nombre) {
        let persona = { id, nombre };
        this.personas.push(persona);

        return this.personas;
    }

    getPersona(id) {
        let persona = this.personas.filter(per => {
            return per.id === id
        })[0];

        return persona;
    }

    getPersonas() {
        return this.personas;
    }

    getPersonasSala(sala) {

    }

    deletePersona(id) {
        let personaBorrada = this.getPersona(id);
        this.personas = this.personas.filter(per => per.id != id);

        return personaBorrada;
    }


}

module.exports = {
    Usuarios
}