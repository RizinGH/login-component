import React from 'react'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'
import '../styles/home.css'


function Home() {

  const username  = localStorage.getItem('username')

  return (
    <div className='div'>
      <h2>Login Successful</h2><br />
      <h3>Hi, {username}</h3>
      <Link to={'/'}>
      <Button variant='outlined' sx={{color:'white', bgcolor:'#10a37f', '&:hover':{bgcolor:'#0c8769',borderRadius:5}, position:'fixed', top:10, right:10, transition:'.2s', fontSize:14, fontFamily:'monospace'}}>LogOut</Button>
      </Link>
      <Link to={'/reset_password'}>
      <Button variant='outlined' sx={{color:'white', bgcolor:'#10a37f', '&:hover':{bgcolor:'#0c8769',borderRadius:5}, position:'fixed', top:10, right:110, transition:'.2s', fontSize:14, fontFamily:'monospace'}}>Change Password</Button>
      </Link>
    </div>
  )
}

export default Home
