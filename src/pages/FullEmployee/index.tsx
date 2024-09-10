import React, { useEffect, useState } from "react";
import axios from "../../axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../redux/store";
import { fetchDelete } from "../../redux/slices/Employees";
export default function FullEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [dataFull, setData] = useState([]);
  const { data } = useSelector((state) => state.auth);
  useEffect(() => {
    axios
      .get(`/api/employees/${id}`)
      .then((res) => {
        setData(res.data);
        console.log("получено");
        console.log(res.data);
      })
      .catch((err) => {
        console.warn("rere", err);
        alert("ошибка при получении статьи");
      });
  }, []);

  const ClickDelete = async (id: any) => {
    await dispatch(fetchDelete(id));
    navigate(`/home`);
  };

  return (
    <div className="container mx-auto px-32 text-white">
      <div className="flex mt-32 mb-5 items-center text-center">
        <div className="  text-xl  text-white font-medium  ">
          Информация о пользователе
        </div>
        {data.id === dataFull.userId && (
          <>
            <div className="ml-5 mr-5 p-2 hover:bg-blue-600 transition ease-linear rounded-md bg-blue-800">
              <Link className="" to={`/employees/edit/${id}`}>
                Редактировать
              </Link>
            </div>
            <div
              onClick={() => ClickDelete(id)}
              className=" p-2 hover:bg-red-600 transition ease-linear rounded-md mr-5 bg-red-800"
            >
              <Link className=" " to="/">
                Удалить
              </Link>
            </div>
          </>
        )}
      </div>

      <div className="bg-green-950">
        <div className="flex justify-between   ">
          <div className="w-full bg-gray-700 p-3 border-2 border-gray-100/45">
            <div>Имя</div>
          </div>
          <div className="w-full bg-gray-900 p-3 border-2 border-gray-100/45">
            <div>
              {dataFull.firstName} {data.lastName}
            </div>
          </div>
        </div>
        <div className="flex justify-between  ">
          <div className="w-full bg-gray-700 p-3  ">
            <div>Возраст</div>
          </div>
          <div className="w-full bg-gray-900 p-3  ">
            <div>{dataFull.age}</div>
          </div>
        </div>
        <div className="flex justify-between   ">
          <div className="w-full bg-gray-700 p-3 border-2 border-gray-100/45">
            <div>Адрес</div>
          </div>
          <div className="w-full bg-gray-900 p-3 border-2 border-gray-100/45">
            <div>{dataFull.address}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
