import { Navigate } from "react-router-dom";
const ProtectedRoute = ({ element, adminOnly }) => {
    const isAuthenticated = localStorage.getItem('token') !== null;
    const userRole = localStorage.getItem('role');
  
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }
  
    if (adminOnly && userRole !== 'admin') {
      return <Navigate to="/unauthorized" />;
    }
  
    return element;
};

export default ProtectedRoute;