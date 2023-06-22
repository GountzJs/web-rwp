import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { reset } from "../redux/slices/authSlice";

export function UnLoggedHook() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const unlogged = () => {
    sessionStorage.clear();
    dispatch(reset());
    navigate('/login');
  }

  return unlogged;
}