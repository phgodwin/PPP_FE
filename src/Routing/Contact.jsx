
import './Contact.css'
import React, { useState } from 'react';
import axios from 'axios';
function Contact() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

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
          return
        }catch (error){
            console.error('Error sending message:', error);
            console.error('Failed to send message. Please try again later.');
        }}
    return (
        <section className='contact' id='contact'>
            <div className='contact-text'>
                <h2>Contact <span className="me">Us</span></h2>
                <h3>Get in touch!</h3>
                <p>We are open to suggestions, constructive feedback and new ideas! Feel free to reach out.</p>
            </div>
            <div>
                <form className="contact-form" onSubmit={handleSubmit}>
                    <label htmlFor="">Please provide the information requested below</label>
                    <input type="text" placeholder='Enter your name' value={name} onChange={(e) => setName(e.target.value)} required />
                    <input type="email" placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <textarea name="" id="" cols="30" rows="10" placeholder='Type your message here' value={message} onChange={(e) => setMessage(e.target.value)} required></textarea>
                    <button className='submit' type='submit'>Submit</button>
                </form>
            </div>
        </section>
    );
}

export default Contact