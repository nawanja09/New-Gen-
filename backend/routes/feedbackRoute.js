const { response, request } = require('express')
const express = require('express')
const router = express.Router()
const feedbackCopy = require('../models/FeedbackModel')



// default submit page
router.post('/add', async (request, response) => {
    const feedback = new feedbackCopy({
        name:request.body.name,
        message:request.body.message,
        rating:request.body.rating
    })
    feedback.save()
    .then(data => {
        response.json(data)
    })
    .catch(error => {
        response.json(error)
    })
})

// all feedback page
router.get('/get', async (request,response) => {
    try {
        const feedbacks = await feedbackCopy.find();
        response.json(feedbacks);
    } catch (err) {
        response.json({ message: err });
    }
})


module.exports = router