import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Contact() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [showImage, setShowImage] = useState(false); // Add state for image visibility

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          // Send form data to server
          await axios.post("http://localhost:8090/message/submit", {
            name: name,
            email: email,
            message: message
          });
          console.log('Message sent successfully!');

        setName('');
        setEmail('');
        setMessage('');
        setShowImage(true); // Show the image
        setTimeout(() => {
        setShowImage(false); // Hide the image after 5 seconds
        }, 10000);
          return
        }catch (error){
            console.error('Error sending message:', error);
            console.error('Failed to send message. Please try again later.');
        }}

        const navigate = useNavigate();
    return (
        <> <button id="homebutton" onClick={() => navigate("/")}>&#11013;</button>

            {showImage && (
                <div className="flash-image" id="team-picture">
                    <img src="/asset/FinalTeamPicture.jpg" alt="Flash Image" width="95%"/>
                </div>
            )}

        <section >
            <div id="savingsdisplay">
                <h2 id="title">Get in touch!</h2>
                
                <p id="intro">We are open to suggestions, constructive feedback and new ideas! Feel free to reach out.</p>
            </div>
            <br />

            <div id="budgetform">
                <form className="contact-form" onSubmit={handleSubmit}>
                    <label htmlFor="">Please provide the information requested below</label>
                    <input type="text" placeholder='Enter your name' value={name} onChange={(e) => setName(e.target.value)} required />
                    <input type="email" placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <textarea name="" id="" cols="30" rows="10" placeholder='Type your message here' value={message} onChange={(e) => setMessage(e.target.value)} required></textarea>
                    <br />
                    <button className='submit' type='submit'>Submit</button>
                </form>
            </div>
        </section>
        </>
    );
}

export default Contact