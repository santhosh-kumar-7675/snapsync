import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import Logout from '../Logout';
import { MdClear } from 'react-icons/md';
import { Button, Form} from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
const Layout = () => {
  const [users, setUsers] = useState([]);

  const [searchQuery, setSearchQuery] = useState('');
  const handleClear = async() =>{
    // fetchPosts();  
    setSearchQuery('');
  }
  const handleSearch = async () => {
    try {
      const response = await axios.post(`http://localhost:4500/postsp/search/${searchQuery}`);
      // console.log(response.data)
      setUsers(response.data);
    } catch (error) {
      console.error('Error searching for users:', error);
    }
  };
  return (
    <div className="layout">
      <div className='sticky-top d-flex justify-content-between'>
        <h2 className='navBar'>Adminsitation
        {/* <div  style={{ }}>
            <div>
                <Form.Group controlId="searchForm" style={{ display: 'inline-flex', marginLeft: '10px' }}>
                  <Form.Control
                    type="text"
                    placeholder="Search by name"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </Form.Group>
              </div>
                <div style={{padding:'6px 12px'}}>
                  <Button variant="primary" onClick={handleSearch}>
                    Search
                  </Button>
                  <Button className='mx-2' onClick={handleClear} ><MdClear/></Button>
                </div>
        </div> */}
        <span style={{position:'absolute' , right:'1%' , top:'2%'}}><Logout/>
        </span></h2>
        
      </div>
      <Sidebar />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
