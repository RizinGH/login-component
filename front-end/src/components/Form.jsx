import React, { useState, useRef } from 'react'
import '../styles/form.css'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import ReCAPTCHA from 'react-google-recaptcha'
import axios from 'axios'

function Form() {
    const recaptcha = useRef(null)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [date, setDate] = useState("")
    const [age, setAge] = useState("")
    const [gender, setGender] = useState("")
    const [address, setAddress] = useState("")
    const [color, setColor] = useState("")

    const navigate = useNavigate()

    const handleReset = () => {
        setName("");
        setEmail(""); 
        setPassword("");
        setDate("");
        setAge("");
        setGender("");
        setAddress("");
        setColor("");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const captchaValue = recaptcha.current.getValue()
        console.log(name, email, password,date,age,gender,address,color);
        const username = localStorage.getItem("username")

        const formData = new FormData();
        formData.append('file', e.target.elements.photo.files[0]);
        formData.append('captchaValue', captchaValue);
        formData.append('username', username);
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('date', date);
        formData.append('age', age);
        formData.append('gender', gender);
        formData.append('address', address);
        formData.append('color', color);

        if (!captchaValue) {
            alert('Please verify the reCAPTCHA!');
            return;
          }
          try {
            const response = await axios.post('http://localhost:8000/profile', formData);
            console.log(response);
            if (response.data === "Successfully completed"){
                alert("Successfully completed. Navigating to home")
                navigate('/home')
            }
            else{
                alert("Error Validating reCAPTCHA")
                setTimeout(() =>  window.location.reload(), 1000);
            }
          } catch (error) {
            console.error('Error:', error);
          }

    }

    return (
        <div className='container'>
      <div className='card'>
             <div className='sticky'>
            <Link to={'/'}>
                <Button variant='outlined' sx={{ color: 'white', bgcolor: '#10a37f', '&:hover': { bgcolor: '#0c8769'}, position: 'absolute', top: 10, right: 10, fontSize: 14, fontFamily: 'monospace' }}>LogOut</Button>
            </Link>
            <Link to={'/home'}>
                <Button variant='outlined' sx={{ color: 'white', bgcolor: '#10a37f', '&:hover': { bgcolor: '#0c8769'}, position: 'absolute', top: 10, right: 110, fontSize: 14, fontFamily: 'monospace' }}>Home</Button>
            </Link>
            </div>
            <form onSubmit={handleSubmit} onReset={handleReset}>
                <div className='form'>
                    <div className="form-content">
                        <h3>Fill out your Details</h3>
                        <div className='fields'>
                            <div className="field">
                                <label>Name</label>
                                <input type="text" required  value={name} onChange={(e) => setName(e.target.value)}/>
                            </div>
                            <div className="field">
                                <label>Email</label>
                                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}/>
                            </div>
                            <div className="field">
                                <label>Password </label>
                                <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
                            </div>
                            <div className="field">
                                <label>DOB</label>
                                <input type="date" required value={date} onChange={(e) => setDate(e.target.value)}/>
                            </div>
                            <div className="field">
                                <label>Age</label>
                                <input type="number"required value={age} onChange={(e) => setAge(e.target.value)}/>
                            </div>
                            <div className="field">
                                <label>Gender</label>
                                <div className="radio" >
                                    <input type="radio" id="Male" name="gender" value="Male"required onChange={(e) => setGender(e.target.value)} />
                                    <label htmlFor="Male">Male</label>
                                    <input type="radio" id="Female" name="gender" value="Female" required onChange={(e) => setGender(e.target.value)} />
                                    <label htmlFor="Female">Female</label>
                                    <input type="radio" id="Other" name="gender" value="Other" required onChange={(e) => setGender(e.target.value)}/>
                                    <label htmlFor="Other">Other</label>
                                </div>
                            </div>
                            <div className="field" >
                                <label>Address</label>
                                <textarea name="address" id="address" required value={address} onChange={(e) => setAddress(e.target.value)}></textarea>
                            </div>
                            <div className="field">
                                <label>Choose a color</label>
                                <select name="color" id="color" className='dropdown' required value={color} onChange={(e) => setColor(e.target.value)}>
                                    <option value=""><em>None</em></option>
                                    <option value="red">Red</option>
                                    <option value="blue">Blue</option>
                                    <option value="yellow">Yellow</option>
                                    <option value="green">Green</option>
                                </select>
                            </div>
                                <label>Upload your photo</label>
                                <input className='fileupload' type="file" id="photo" name="photo" accept="image/*" required/>
                                <ReCAPTCHA className="captcha" ref={recaptcha} sitekey={process.env.REACT_APP_SITE_KEY} fullWidth/>
                        </div>
                        <div className='buttons'>
                            <button className='reset' type='reset'>Reset</button>
                            <button className='submit' type='submit'>Submit</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
    )
}

export default Form
