import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { Button, Box, Typography, Card, CardContent, CardActions, TextField } from '@mui/material';
import '../styles/form.css'


export default function Loginform() {

  const [username, setUsername] = useState<String>("")
  const [password, setPassword] = useState<String>("")

  const handleSumit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
  }

  return (
      <div className='div'>
      <Box sx={{ width:'400px', height:'auto'}}>
        <Card variant="outlined" className='card' sx={{borderRadius:3,marginBottom:3, boxShadow:'0.1px 0.1px 1px 1px'}}>
          <form onSubmit={handleSumit}>
          <CardContent>
            <Typography variant='h4' color="text.primary" sx={{fontWeight:'bold', padding:2, fontFamily:'monospace'}} gutterBottom>
              Login
            </Typography>
            <TextField id="standard-basic" label='Username' type='text' variant="standard" required aria-required value={username} onChange={(e) => setUsername(e.target.value)} sx={{marginTop:4, minWidth:'300px'}} />
            <TextField id="standard-basic" label='Password' type='password' variant="standard" required aria-required value={password} onChange={(e) => setPassword(e.target.value)}  sx={{marginTop:4, minWidth:'300px'}} />
          </CardContent>
          <CardActions sx={{display:'flex', flexDirection:'column', marginTop:3}}>
            <Button size='medium' type='submit' variant='contained' sx={{minWidth:'300px', bgcolor:'#10a37f', '&:hover':{bgcolor:'#0c8769'} }}>Login</Button>
            <Link to={'/register'} style={{padding:20, color:'#2e63b3'}}>
               Don't have an account? Sign up
            </Link> 
          </CardActions>
          </form>
        </Card>
      </Box>
      </div>
  )
}
