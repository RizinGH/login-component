import React from 'react'
import '../styles/form.css'


function Home() {
    const username  =localStorage.getItem('username')


  return (
    <div className='homediv'>
      <h2>Login Successful</h2><br />
      <h3>Hi, {username}</h3>
    </div>
  )
}

export default Home
