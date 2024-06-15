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

        console.log("Notifying observer 101")

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

        if ((state.type === 'Planeada') && (referenceDate <= activity.publishDate)) {
            console.log("Entro")
            this.concreteVisitor.visitAnouncement(activity);
            await this.updateActivityState(state, 'Notificada');
        } else if (state.type === 'Notificada') {
            await this.processReminders(activity, referenceDate);
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
        console.log("Processing reminders")
        for (let i = 0; i < activity.reminders.length; i++) {
            const reminderDate = activity.reminders[i];

            console.log("Reminder date: ", reminderDate)
            console.log("Current date: ", currentDate)
            console.log("Comparison: ", reminderDate <= currentDate)

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