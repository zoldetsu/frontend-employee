import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout, selectIsAuth } from "../../redux/slices/Auth";
import { useAppDispatch } from "../../redux/store";

export default function Header() {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useAppDispatch();
  const { data } = useSelector((state) => state.auth);
  const onClickLogout = () => {
    dispatch(logout());
    window.localStorage.removeItem("token");
  };
  console.log(data);
  return (
    <div className="bg-gray-400/10 p-2">
      <div className="container mx-auto px-32 flex items-center justify-between ">
        <Link
          className="text-white font-mono text-2xl"
          to={isAuth ? "/home" : "/login"}
        >
          ZOLO
        </Link>
        {isAuth ? (
          <ul className="flex gap-10">
            <li
              className="text-white 
              font-mono 
              hover:text-blue-400 
              transition-colors 
              duration-300 
              ease-in-out"
            >
              {data.name}
            </li>
            <Link onClick={onClickLogout} to={"/login"}>
              <li
                className="text-white 
              font-mono 
              hover:text-blue-400 
              transition-colors 
              duration-300 
              ease-in-out"
              >
                Exit
              </li>
            </Link>
          </ul>
        ) : (
          <ul className="flex gap-10">
            <Link to={"/register"}>
              <li
                className="text-white 
            font-mono 
            hover:text-blue-400 
            transition-colors 
            duration-300 
            ease-in-out"
              >
                Register
              </li>
            </Link>
            <Link to={"/login"}>
              <li
                className="text-white 
            font-mono
            hover:text-blue-400 
            transition-colors 
            duration-300 
            ease-in-out "
              >
                Login
              </li>
            </Link>
          </ul>
        )}
      </div>
    </div>
  );
}
