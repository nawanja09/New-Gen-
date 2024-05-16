import React, { useState } from 'react'
import axios from 'axios'

//font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FaRegStar } from 'react-icons/fa';
import Layout from "../components/layout/Layout";
import "./Feedback.css"

// hostname


const Feedback = () => {

    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [rating, setRating] = useState(10)

    const changeName = (event) => {
        setName(event.target.value)
    }

    const changeMessage = (event) => {
        setMessage(event.target.value)
    }

    const changeRating = (event) => {
        setRating(event.target.value)
    }

    //submit using axios -> redirects to FeedbackList
    const onSubmit = (event) => {
        event.preventDefault()
        const feedback = {
            name: name,
            message: message,
            rating: rating
        }

        axios.post(`http://localhost:5000/api/feedback/add`, feedback)
            .then(response => {
                window.location.href = './feedbackList'
                console.log(response.data)
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <>
        <Layout>
            <div className="bg-ifo">
                <h1 className='d-flex justify-content-center'>Feedback Form</h1>
                <div className="row">

                    <div className="col-md-8 offset-md-2 bg-warning vh-100">
                        <form onSubmit={onSubmit}>
                            <div className="form-group">
                                
                                <label>Name</label>
                                <input type="text"
                                    className="form-control"
                                    id="Name"
                                    placeholder="name"
                                    onChange={changeName}
                                />
                            </div>
                            <div className="form-group">
                                <label>Message</label>
                                <textarea className="form-control"
                                    id="Message"
                                    rows="3"
                                    placeholder="Type your message here"
                                    onChange={changeMessage}
                                />
                            </div>
                            <div className="form-group container-fluid ">
                                <label className="form-label row font-weight-bold">Rating: {rating}<FaRegStar icon={FaRegStar} /></label>
                                <input type="range"
                                    id="ratingRange"
                                    className="form-range row"
                                    min="1"
                                    max="10"
                                    step="1"
                                    onChange={changeRating}
                                />
                            </div>
                            <div className="form-group d-flex justify-content-center">
                                <input type='submit' className='btn btn-primary  bg-danger' value='Submit' />
                            </div>
                        </form>
                    </div>
                </div>
            </div>

           
        </Layout>
        </>

    );
}

export default Feedback;
