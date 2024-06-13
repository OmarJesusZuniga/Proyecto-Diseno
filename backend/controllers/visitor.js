const ActivityState = require('../models/activityStateModel')
const mongoose = require('mongoose')

// Element Activity Model 

class Visitor { // Interface
    visitAnouncement(activity) {
        throw new Error("Method 'visitAnouncement(activity)' must be implemented.");
    }

    visitReminder(activity) {
        throw new Error("Method 'visitReminder(activity)' must be implemented.");
    }
}

class ConcreteVisitor extends Visitor {
    visitAnouncement(activity) {
        console.log("Generate anouncement notification")
    }

    visitReminder(activity) {
        console.log("Generate reminder notification")
    }
}

module.exports = {
    ConcreteVisitor
}