const Activity = require('../models/activityModel')
const ActivityState = require('../models/activityStateModel')
const systemDate = require('../models/systemDate.js')
const { ConcreteVisitor } = require('../controllers/visitor')
const mongoose = require('mongoose')

class Observer {
    constructor() {
        this.concreteVisitor = new ConcreteVisitor();
    }

    async notify() { // Notify 
        console.log("Notifying...")
        const activities = await this.fetchSortedActivities();
        const date = await this.getCurrentDate();
        const currentDate = new Date(date[0].date);

        for (const activity of activities) {
            await this.processActivity(activity, currentDate);
        }
    }

    // Avoiding deep nesting

    async fetchSortedActivities() {
        return await Activity.find({}).sort({createdAt: 1});
    }

    async getCurrentDate() {
        return await systemDate.find({}).sort({});
    }

    async processActivity(activity, referenceDate) {
        const state = await this.fetchActivityState(activity);
        
        if (!state) return;

        console.log("Processing activity: ", activity.name, " with state: ", state.type)
        console.log((state.type === 'Planeada'))
        console.log((referenceDate <= activity.publishDate))
        console.log(referenceDate, activity.publishDate)

        if ((state.type === 'Planeada') && (referenceDate >= activity.publishDate)) {
            this.concreteVisitor.visitAnouncement(activity);
            await this.updateActivityState(state, 'Notificada');
        } else if (state.type === 'Notificada') {
            await this.processReminders(activity, referenceDate);
        } else if (state.type === "Cancelada") {
            await this.processCancellation(activity, state, referenceDate);
        }
    }

    async fetchActivityState(activity) {
        return await ActivityState.findById(activity.state.toString());
    }

    async updateActivityState(state, newState) {
        state.type = newState;
        await state.save();
    }

    async processReminders(activity, currentDate) {
        for (let i = 0; i < activity.reminders.length; i++) {
            const reminderDate = activity.reminders[i];

            if (reminderDate <= currentDate) {
                this.concreteVisitor.visitReminder(activity);
                activity.reminders.splice(i, 1);
                i--;
            }
        }

        if (activity.isModified('reminders')) {
            await activity.save();
        }
    }

    async processCancellation(activity, state, currentDate) {
        console.log("Processing cancellation")
        if (state.cancelationNotification) {
            return; 
        }

        if (state.updatedAt <= currentDate) {
            state.cancelationNotification = true;
            await state.save();

            this.concreteVisitor.visitCancellation(activity);
        }
    }
}

const notify = async (req, res) => {
    console.log("Notifying observer")
    try {
        const observer = new Observer();
        await observer.notify();
        res.status(200).send('Notifications have been sent successfully');
    } catch (error) {
        console.error('Error during notification process:', error);
        res.status(500).send('An error occurred during the notification process');
    }
}

module.exports = {
    Observer,
    notify
}