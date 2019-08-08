const fs = require('fs');
class TicketControl {
    constructor() {
        this.ultimo = 0;
        this.hoy = new Date().getDate();

        let data = require('../data/data.json')
        if (data.hoy === this.hoy) {
            this.ultimo = data.ultimo;
        } else {
            this.reiniciarConteo();
        }
    }

    siguienteTicket() {
        this.ultimo += 1;
        this.grabarArchivo();

        return `Ticket  ${this.ultimo}`;
    }

    reiniciarConteo() {
        this.grabarArchivo();
    }

    grabarArchivo() {
        let dataGrabar = {
            "ultimo": this.ultimo,
            "hoy": this.hoy
        }
        let jsonDataString = JSON.stringify(dataGrabar);
        fs.writeFileSync('./server/data/data.json', jsonDataString);
    }

}

module.exports = {
    TicketControl
}