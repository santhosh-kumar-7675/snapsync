import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/adminpanel/Layout';
import AdminHome from './components/adminpanel/AdminHome';
import AdminPanelHome from './components/adminpanel/AdminPanelHome';
import AdminUserList from './components/adminpanel/AdminUserList';
import AdminPosts from './components/adminpanel/AdminPosts';
import HomePage from './components/HomePage';
import SignUpForm from './components/SignUpForm';
import LoginForm from './components/Login';
import UserProfile from './components/UserProfile';
import ImageUpload from './components/ImageUpload';
import UserUploads from './components/UserUploads';
import PageNotFound from './components/PageNotFound';
import AdminApproval from './components/adminpanel/AdminApproval';
import ProtectedRoute from './components/ProtectedRoute';
import UnauthorizedPage from './components/UnauthorizedPage';
import LoginPage from './components/LoginPage';
import CustomNavbar from './components/CustomNavbar';
const App = () => {
  return (
    <Router>
      {/* <div style={{ maxWidth: '100%' }}>
        <CustomNavbar />
      </div> */}
      <Routes>
        <Route path="/" element={<HomePage />} />

        {/* Public Routes */}
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Protected/User Routes */}
        <Route
          path="/users/:username"
          element={<ProtectedRoute element={<UserProfile />} />}
        />
        <Route
          path="/upload-files"
          element={<ProtectedRoute element={<ImageUpload />} />}
        />
        <Route
          path="/users/:username/upload-files"
          element={<ProtectedRoute element={<ImageUpload />} />}
        />
        <Route
          path="/users/:username/uploads"
          element={<ProtectedRoute element={<UserUploads />} />}
        />

        <Route path="/admin" element={<AdminHome />}/>
        
        {/* Admin Routes */}
        <Route
          path="/admin/*"
          element={<ProtectedRoute element={<Layout />} adminOnly />}
        >
          <Route path="home" element={<AdminPanelHome />} />
          <Route path="users" element={<AdminUserList />} />
          <Route path="posts" element={<AdminPosts />} />
          <Route path="approval" element={<AdminApproval />} />
        </Route>

        {/* 404 Page */}
        <Route path="/*" element={<PageNotFound />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        
      </Routes>
    </Router>
  );
};

export default App;
