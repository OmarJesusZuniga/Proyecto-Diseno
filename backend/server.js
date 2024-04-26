require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')

const planRoutes = require('./routes/planRoutes')
const observationRoutes = require('./routes/observationRoutes')
const commentRoutes = require('./routes/commentRoutes')
const activityStateRoutes = require('./routes/activityStateRoutes')
const activityRoutes = require('./routes/activityRoutes')
const studentRoutes = require('./routes/studentroutes')
const professorRoutes = require('./routes/professorRoutes')
const adminAssistantRoutes = require('./routes/adminAssistantRoutes')
const campusRoutes = require('./routes/campusRoutes')
const representantRoutes = require('./routes/representantRoutes')
const guideTeamRoutes = require('./routes/guideTeamRoutes')

// express app
const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/api/plan', planRoutes) 
app.use('/api/observation', observationRoutes) 
app.use('/api/comment', commentRoutes) 
app.use('/api/activitystate', activityStateRoutes) 
app.use('/api/activity', activityRoutes) 
app.use('/api/students', studentRoutes)
app.use('/api/professors', professorRoutes)
app.use('/api/adminAssistants', adminAssistantRoutes)
app.use('/api/campus', campusRoutes)
app.use('/api/representants', representantRoutes)
app.use('/api/guideTeam', guideTeamRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('connected to database')
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log('listening for requests on port', process.env.PORT)
    })
  })
  .catch((err) => {
    console.log(err)
  }) 