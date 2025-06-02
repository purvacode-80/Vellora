import { Navigate } from "react-router-dom";
import { isTokenValid } from "./auth";

const ProtectedRoute = ({ children }) => {
    return isTokenValid ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;