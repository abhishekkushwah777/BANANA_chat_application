// RootRedirect.jsx
import { Navigate } from "react-router-dom";
import { useAppContext } from "../appContexts";

function RootRedirect() {
  const { authenticatedUser, isLoading } = useAppContext();

  if (isLoading) {
    return <div>Loading...</div>; // wait for the token check to finish
  }

  return authenticatedUser
    ? <Navigate to="/home" replace />
    : <Navigate to="/login" replace />;
}

export default RootRedirect;