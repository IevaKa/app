import React from 'react'
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <>
      <Link to='/login'><button type="button" className="btn btn-light">Login</button></Link>
      <Link to='/signup'><button type="button" className="btn btn-dark">Signup</button></Link>
    </>
  )
}