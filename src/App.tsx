import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Header from "./components/Header";
import Register from "./pages/register";
import Login from "./pages/Login";
import { useAppDispatch } from "./redux/store";
import { useSelector } from "react-redux";
import { fetchAuthMe, selectIsAuth } from "./redux/slices/Auth";
import { useEffect } from "react";
import AddEmployee from "./pages/AddEmployee";
import FullEmployee from "./pages/FullEmployee";
import EditEmployee from "./pages/EditEmployee";

function App() {
  const dispatch = useAppDispatch();
  const isAuth = useSelector(selectIsAuth);

  useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);
  return (
    <>
      <Header />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add" element={<AddEmployee />} />
        <Route path="/login" element={<Login />} />
        <Route path="/employees" element={<FullEmployee />} />
        <Route path="/employees/:id" element={<FullEmployee />} />
        <Route path="/employees/edit/:id" element={<EditEmployee />} />
      </Routes>
    </>
  );
}

export default App;
