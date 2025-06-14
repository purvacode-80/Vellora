import { Navigate } from "react-router-dom";
import { isTokenValid } from "./auth";

const ProtectedRoute = ({ children }) => {
  return isTokenValid() ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;