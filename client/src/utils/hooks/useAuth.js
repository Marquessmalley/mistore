import { useSelector } from "react-redux";
import jwtDecode from "jwt-decode";
const useAuth = () => {
  const token = useSelector((state) => state.auth.token);

  if (token) {
    const decode = jwtDecode(token);
    const { firstname, lastname, role } = decode.userInfo;
    return { firstname, lastname, role };
  }

  return { firsname: "", lastname: "", role: [] };
};

export default useAuth;
