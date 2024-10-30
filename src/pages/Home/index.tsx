import { useSelector } from "react-redux";
import EmployeeItem from "../../components/EmployeeItem";
import HomeTable from "../../components/HomeTable";
import { Link, Navigate } from "react-router-dom";
import { selectIsAuth } from "../../redux/slices/Auth";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { useEffect } from "react";
import { fetchGetAll } from "../../redux/slices/Employees";

export default function Home() {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useAppDispatch();
  // const data = useSelector((state: IState) => state.employee.allEmployees);
  const { data } = useAppSelector((state) => state.employee.allEmployees);
  useEffect(() => {
    dispatch(fetchGetAll());
  }, []);
  console.log(data);
  if (!isAuth) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <div className="container mx-auto px-32">
        <Link to={"/add"}>
          <button className="mt-32 p-3 bg-blue-500 rounded-lg mb-3 text-white">
            Добавить
          </button>
        </Link>
        <HomeTable />
        <div>
          {data.map((person) => {
            return <EmployeeItem person={person} />;
          })}
        </div>
      </div>
    </>
  );
}
