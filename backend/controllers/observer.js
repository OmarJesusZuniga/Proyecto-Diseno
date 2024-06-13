const Activity = require('../models/activityModel')
const ActivityState = require('../models/activityStateModel')
const { ConcreteVisitor } = require('../controllers/visitor')
const mongoose = require('mongoose')

class Observer {
    constructor() {
        this.concreteVisitor = new ConcreteVisitor();
    }

    async notify() {
        const activities = await Activity.find({}).sort({createdAt: 1});

        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() - 1); 

        for (let i = 0; i < activities.length; i++) {
            const publicationDate = activities[i].publishDate; // Fecha de Publicacion

            const element = activities[i];
            const stateId = element.state.toString();
            const state = await ActivityState.findById(stateId);

            if (state && (state.type === 'Planeada') && (currentDate >= publicationDate)) {
                // Llamar a Visitor para enviar la notificacion [ANUNCIO DE ACTIVIDAD]
                this.concreteVisitor.visitAnouncement(element); 

                // Cambiar estado a Notificada
                state.type = "Notificada";
                await state.save();
            }

            if (state && (state.type === 'Notificada')) {
                for (let j = 0; j < element.reminders.length; j++) {
                    const reminderDate = element.reminders[j];

                    if (reminderDate >= currentDate) {
                        // Llamar a Visitor para enviar la notificacion [RECORDATORIO DE ACTIVIDAD]
                        this.concreteVisitor.visitReminder(element);

                        // Eliminar el recordatorio de la lista
                        element.reminders.splice(j, 1);
                        j--;
                    }
                }

                if (element.isModified('reminders')) {
                    await element.save();
                }
            }
        }
    }

}

module.exports = {
    Observer
}