import { SubmitHandler, useForm } from "react-hook-form";
import { fetchRegister, selectIsAuth } from "../../redux/slices/Auth";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../redux/store";

export default function Register() {
  const dispatch = useAppDispatch();
  const isAuth = useSelector(selectIsAuth);
  type Inputs = {
    name: string;
    email: string;
    password: string;
  };

  const {
    register,
    handleSubmit,

    formState: { isValid },
  } = useForm<Inputs>({
    defaultValues: {
      name: "Nazar Nazarov",
      email: "test@test.ru",
      password: "12345678",
    },
    mode: "onChange",
  });
  const onSubmit: SubmitHandler<Inputs> = async (values) => {
    const data = await dispatch(fetchRegister(values));
    console.log(data);
    if (!data.payload) {
      return alert("не удалось зарегистрироваться");
    }
    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
    }
  };
  if (isAuth) {
    return <Navigate to="/home" />;
  }
  return (
    <div className="container mx-auto">
      <div className="max-w-lg mx-auto mt-40 border-gray-600 p-6 border-2 rounded-lg">
        <h1 className="text-center text-white font-black text-3xl mb-10">
          Register
        </h1>
        <form className=" flex flex-col " onSubmit={handleSubmit(onSubmit)}>
          {/* register your input into the hook by invoking the "register" function */}
          <input
            placeholder="name"
            className="bg-gray-900/5 border-gray-600 border-2 text-white p-3 rounded-lg mb-7 w-full text-center"
            defaultValue="name"
            {...register("name")}
          />
          <input
            placeholder="login"
            className="bg-gray-900/5 border-gray-600 border-2 text-white p-3 rounded-lg mb-7 w-full text-center"
            defaultValue="email"
            {...register("email")}
          />
          <input
            placeholder="password"
            className="bg-gray-900/5 border-gray-600 border-2 text-white p-3 rounded-lg mb-7 w-full text-center"
            defaultValue="password"
            {...register("password")}
          />

          <input
            disabled={!isValid}
            className="border-2 rounded-xl p-3 text-white border-white w-full cursor-pointer 
            hover:bg-blue-700 transition-colors ease-in"
            type="submit"
          />
        </form>
      </div>
    </div>
  );
}
function dispatch(arg0: any) {
  throw new Error("Function not implemented.");
}