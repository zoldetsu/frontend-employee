import { SubmitHandler, useForm } from "react-hook-form";
import { fetchRegister, selectIsAuth } from "../../redux/slices/Auth";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../redux/store";
import { fetchAddEmployee } from "../../redux/slices/Employees";

export default function AddEmployee() {
  const dispatch = useAppDispatch();
  const isAuth = useSelector(selectIsAuth);
  const navigate = useNavigate();
  type Inputs = {
    firstName: string;
    lastName: string;
    address: string;
    age: string;
  };

  const {
    register,
    handleSubmit,

    formState: { isValid },
  } = useForm<Inputs>({
    defaultValues: {
      firstName: "",
      lastName: "",
      address: "",
      age: "",
    },
    mode: "onChange",
  });
  const onSubmit: SubmitHandler<Inputs> = async (values) => {
    const data = await dispatch(fetchAddEmployee(values));
    console.log(data);
    if (!data.payload) {
      return alert("не удалось зарегистрироваться");
    }
    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
    }

    navigate("/home");
  };
  if (!isAuth) {
    return <Navigate to="/login" />;
  }
  return (
    <div className="container mx-auto">
      <div className="max-w-lg mx-auto mt-40 border-gray-600 p-6 border-2 rounded-lg">
        <h1 className="text-center text-white font-black text-3xl mb-10">
          Добавить сотрудника
        </h1>
        <form className=" flex flex-col " onSubmit={handleSubmit(onSubmit)}>
          {/* register your input into the hook by invoking the "register" function */}
          <input
            placeholder="Имя"
            className="bg-gray-900/5 border-gray-600 border-2 text-white p-3 rounded-lg mb-7 w-full text-center"
            defaultValue="name"
            {...register("firstName")}
          />
          <input
            placeholder="Фамилия"
            className="bg-gray-900/5 border-gray-600 border-2 text-white p-3 rounded-lg mb-7 w-full text-center"
            defaultValue="email"
            {...register("lastName")}
          />
          <input
            placeholder="возраст"
            className="bg-gray-900/5 border-gray-600 border-2 text-white p-3 rounded-lg mb-7 w-full text-center"
            defaultValue="age"
            {...register("age")}
          />
          <input
            placeholder="адрес"
            className="bg-gray-900/5 border-gray-600 border-2 text-white p-3 rounded-lg mb-7 w-full text-center"
            defaultValue="address"
            {...register("address")}
          />

          <input
            disabled={!isValid}
            className="border-2 rounded-xl p-3 text-white border-white w-full cursor-pointer 
            hover:bg-blue-700 transition-colors ease-in"
            type="submit"
            placeholder="Добавить"
          />
        </form>
      </div>
    </div>
  );
}
