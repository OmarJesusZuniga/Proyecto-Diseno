const mongoose = require('mongoose');
const GuideTeam = require('../models/guideTeamModel');
const Plan = require('../models/planModel');

async function getStudentsForActivity(activityId) {
    try {
        // Convert string ID to mongoose ObjectId
        const activityObjectId = mongoose.Types.ObjectId(activityId);

        // Find plans that contain the activity ID
        const plansWithActivity = await Plan.find({ activities: activityObjectId }).exec();

        if (!plansWithActivity.length) {
            console.log('No plans found containing this activity');
            return [];
        }

        // Extract plan IDs to use in the next query
        const planIds = plansWithActivity.map(plan => plan._id);

        // Find guide teams linked to these plans
        const guideTeams = await GuideTeam.find({ plan: { $in: planIds } }).populate('students').exec();

        if (!guideTeams.length) {
            console.log('No guide teams found linked to these plans');
            return [];
        }

        // Extract students from all matching guide teams
        const students = guideTeams.reduce((acc, team) => {
            team.students.forEach(student => {
                // Assuming you need a unique list of students without duplicates
                if (!acc.find(s => s._id.equals(student._id))) {
                    acc.push(student);
                }
            });
            return acc;
        }, []);

        return students;
    } catch (error) {
        console.error('Error fetching students for activity:', error);
        throw error; // Rethrow or handle appropriately depending on further usage
    }
}

module.exports = getStudentsForActivity;
