import axios from "../../axios";

import { selectIsAuth } from "../../redux/slices/Auth";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { useEffect, useState } from "react";

export default function EditEmployee() {
  const isAuth = useSelector(selectIsAuth);
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [age, setAge] = useState("");

  useEffect(() => {
    axios
      .get(`/api/employees/${id}`)
      .then((res) => {
        setData(res.data);
        setFirstName(res.data.firstName);
        setLastName(res.data.lastName);
        setAddress(res.data.address);
        setAge(res.data.age);
        console.log(res.data);
      })
      .catch((err) => {
        console.warn("rere", err);
        alert("ошибка при получении статьи");
      });
  }, []);

  const onSubmit = async () => {
    try {
      const fields = {
        firstName,
        lastName,
        address,
        age,
      };
      console.log(fields);
      console.log(id);

      axios
        .put(`/api/employees/edit/${id}`, fields)

        .then(() => {
          navigate(`/employees/${id}`);
        })
        .catch((err) => {
          console.error(err);
          // Обработка ошибок
        });
    } catch (err) {
      console.warn(err);
    }
  };

  console.log(data);
  if (!isAuth) {
    return <Navigate to="/login" />;
  }
  return (
    <div className="container mx-auto">
      <div className="max-w-lg mx-auto mt-40 border-gray-600 p-6 border-2 rounded-lg">
        <h1 className="text-center text-white font-black text-3xl mb-10">
          Редактировать сотрудника
        </h1>
        <div className=" flex flex-col ">
          {/* register your input into the hook by invoking the "register" function */}
          <input
            placeholder="Имя"
            className="bg-gray-900/5 border-gray-600 border-2 text-white p-3 rounded-lg mb-7 w-full text-center"
            value={firstName}
            defaultValue="name"
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            placeholder="Фамилия"
            className="bg-gray-900/5 border-gray-600 border-2 text-white p-3 rounded-lg mb-7 w-full text-center"
            value={lastName}
            defaultValue="email"
            onChange={(e) => setLastName(e.target.value)}
          />
          <input
            placeholder="Возраст"
            className="bg-gray-900/5 border-gray-600 border-2 text-white p-3 rounded-lg mb-7 w-full text-center"
            value={age}
            defaultValue="password"
            onChange={(e) => setAge(e.target.value)}
          />
          <input
            placeholder="Адрес"
            className="bg-gray-900/5 border-gray-600 border-2 text-white p-3 rounded-lg mb-7 w-full text-center"
            value={address}
            defaultValue="password"
            onChange={(e) => setAddress(e.target.value)}
          />
          <button
            className="border-2 rounded-xl p-3 text-white border-white w-full cursor-pointer 
            hover:bg-blue-700 transition-colors ease-in"
            type="submit"
            onClick={onSubmit}
          >
            Изменить
          </button>
        </div>
      </div>
    </div>
  );
}
