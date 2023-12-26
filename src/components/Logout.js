import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');

    navigate('/login');
  };

  return (
    <Button onClick={handleLogout}
      // style={{position:'absolute' , top:'5px', right:'10px',zIndex:'10'}} 
      variant='danger' id="button-border" >Logout</Button>
  );
};

export default Logout;
