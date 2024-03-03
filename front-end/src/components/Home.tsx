import React from 'react'
import '../styles/form.css'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'


function Home() {
  const username  =localStorage.getItem('username')

  return (
    <div className='homediv'>
      <h2>Login Successful</h2><br />
      <h3>Hi, {username}</h3>
      <Link to={'/'}>
      <Button variant='outlined' sx={{color:'white', bgcolor:'#10a37f', '&:hover':{bgcolor:'#0c8769',borderRadius:5}, position:'fixed', top:10, right:10, transition:'.2s'}}>LogOut</Button>
      </Link>
    </div>
  )
}

export default Home
