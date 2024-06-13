
import axios from 'axios';

const ActivityFacade = {
    async fetchEnums() {
        try {
            const response = await axios.post("http://localhost:4000/api/activity/enums/");
            return response.data;
        } catch (e) {
            console.error(e);
            throw e;
        }
    },

    async fetchProfessors() {
        try {
            const response = await axios.get("http://localhost:4000/api/professors/");
            return response.data;
        } catch (e) {
            console.error(e);
            throw e;
        }
    },

    async createActivity(activityData) {
        try {
            const response = await axios.post('http://localhost:4000/api/activity/', activityData);
            return response.data;
        } catch (e) {
            console.error(e);
            throw e;
        }
    },

    async addActivityToPlan(planId, activityId) {
        try {
            await axios.post('http://localhost:4000/api/plan/addActivity/', {
                id: planId,
                newActivity: activityId
            });
        } catch (e) {
            console.error(e);
            throw e;
        }
    },

    async updateActivity(activityId, activityData) {
        try {
            const response = await axios.patch(`http://localhost:4000/api/activity/${activityId}`, activityData);
            return response.data;
        } catch (e) {
            console.error(e);
            throw e;
        }
    },

    async fetchActivity(activityId) {
        try {
            const response = await axios.get(`http://localhost:4000/api/activity/${activityId}`);
            return response.data;
        } catch (e) {
            console.error(e);
            throw e;
        }
    },

    async fetchImagePath() {
        try {
            const response = await axios.post("http://localhost:4000/api/image/getPath/");
            return response.data;
        } catch (e) {
            console.error(e);
            throw e;
        }
    },

    async removeActivityFromPlan(planId, activityId) {
        try {
            await axios.post("http://localhost:4000/api/plan/removeActivity", { id: planId, activityId: activityId });
        } catch (e) {
            console.error(e);
            throw e;
        }
    },

    async deleteActivity(activityId) {
        try {
            await axios.delete(`http://localhost:4000/api/activity/${activityId}`);
        } catch (e) {
            console.error(e);
            throw e;
        }
    },

    async fetchImage(imageId) {
        try {
            const response = await axios.get(`http://localhost:4000/api/image/${imageId}`);
            return response.data;
        } catch (e) {
            console.error(e);
            throw e;
        }
    }

};

export default ActivityFacade;
