import { useDispatch } from "react-redux";
import { UnLoggedHook } from "../../shared/hooks/UnLoggedHook";
import { getUsername } from "../../shared/redux/slices/userSlice";

export function BtnLogOut() {
  const dispatch = useDispatch();
  const logout = UnLoggedHook();

  const actionLogOut = () => {
    dispatch(getUsername({ username: null, image: null }));
    logout();
  }

  return (
    <button
      type="button" 
      className="btn btn-outline-danger"
      onClick={() => actionLogOut()}
    >
      Or click here to logout.
    </button>  
  )
}