const Activity = require('../models/activityModel')
const ActivityState = require('../models/activityStateModel')
const mongoose = require('mongoose')

// Get all
const notify = async (req, res) => {
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

            // Cambiar estado a Notificada
        }

        if (state && (state.type === 'Notificada')) {
            for (let j = 0; j < element.reminders.length; j++) {
                const reminderDate = element.reminders[j];

                if (reminderDate <= currentDate) {
                    // Llamar a Visitor para enviar la notificacion [RECORDATORIO DE ACTIVIDAD]

                    // Eliminar el recordatorio de la lista
                }
            }
        }
    }
}


module.exports = {
    notify
}