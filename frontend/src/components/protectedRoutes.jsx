// ProtectedRoute.jsx
import { Navigate, useLocation } from "react-router-dom";
import { useAppContext } from "../appContexts";

function ProtectedRoute({ children }) {
  const { authenticatedUser, isloading } = useAppContext();
  const location = useLocation();
  
  if (isloading) {
    return <div>Loading...</div>;
  }


  if (!authenticatedUser) {
    // send them to login, remember where they wanted to go
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default ProtectedRoute;