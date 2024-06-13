const Activity = require('../models/activityModel')
const ActivityState = require('../models/activityStateModel')
const { ConcreteVisitor } = require('../controllers/visitor')
const mongoose = require('mongoose')

class Observer {
    constructor() {
        this.concreteVisitor = new ConcreteVisitor();
    }

    async notify() { // Notify 
        const activities = await this.fetchSortedActivities();
        const yesterday = this.getYesterdaysDate();

        for (const activity of activities) {
            await this.processActivity(activity, yesterday);
        }
    }

    // Avoiding deep nesting

    async fetchSortedActivities() {
        return await Activity.find({}).sort({createdAt: 1});
    }

    getYesterdaysDate() {
        const date = new Date();
        date.setDate(date.getDate() - 1);
        return date;
    }

    async processActivity(activity, referenceDate) {
        const state = await this.fetchActivityState(activity);
        
        if (!state) return;

        if (state.type === 'Planeada' && referenceDate >= activity.publishDate) {
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
        for (let i = 0; i < activity.reminders.length; i++) {
            const reminderDate = activity.reminders[i];
            if (reminderDate >= currentDate) {
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


module.exports = {
    Observer
}