import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../redux/store";

export const LoggedProtected = ({ component: Component, ...rest }: any) => {
  const isLogin = useSelector((state: RootState) => state.auth.value);

  return isLogin ? <Component {...rest} /> : <Navigate to="/login" replace />;
};