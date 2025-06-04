import { jwtDecode } from "jwt-decode";

export function isTokenValid() {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    if(decoded.exp > currentTime) {
      return true;
    }
    return false;
  } catch (err) {
    return false;
  }
}