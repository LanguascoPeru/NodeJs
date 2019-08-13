const fs = require('fs');

class Ticket {
    constructor(num, escrit) {
        this.numero = num;
        this.escritorio = escrit;
    }
}

class TicketControl {
    constructor() {
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimos4 = [];

        let data = require('../data/data.json')
        if (data.hoy === this.hoy) {
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimos4 = data.ultimos4;
        } else {
            this.reiniciarConteo();
        }
    }

    siguienteTicket() {
        this.ultimo += 1;
        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);

        this.grabarArchivo();

        return `Ticket  ${this.ultimo}`;
    }

    ultimoTicket() {
        return `Ticket  ${this.ultimo}`;
    }

    ultimosss4() {
        return this.ultimos4;
    }

    atenderTicket(escrit) {
        if (this.tickets.length === 0) {
            return 'No hay tickets';
        }
        let numTicket = this.tickets[0].numero;
        //---borrar el primer elemento de una array
        this.tickets.shift();
        let atenderTicket = new Ticket(numTicket, escrit);

        //El método unshift() agrega uno o más elementos al inicio del array
        this.ultimos4.unshift(atenderTicket);

        if (this.ultimos4.length > 4) {
            this.ultimos4.slice(-1, 1); // borra el ultimo elemento
        }

        this.grabarArchivo();

        return atenderTicket;
    }

    reiniciarConteo() {
        this.ultimo = 0;
        this.tickets = [];
        this.ultimos4 = [];
        this.grabarArchivo();
    }

    grabarArchivo() {
        let dataGrabar = {
            "ultimo": this.ultimo,
            "hoy": this.hoy,
            "tickets": this.tickets,
            "ultimos4": this.ultimos4
        }
        let jsonDataString = JSON.stringify(dataGrabar);
        fs.writeFileSync('./server/data/data.json', jsonDataString);
    }

}

module.exports = {
    TicketControl
}