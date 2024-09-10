import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch } from "../../redux/store";
import { fetchAuth, selectIsAuth } from "../../redux/slices/Auth";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
export default function Login() {
  const dispatch = useAppDispatch();
  const isAuth = useSelector(selectIsAuth);
  useEffect(() => {}, []);
  type Inputs = {
    email: string;
    password: string;
  };

  const {
    register,
    handleSubmit,

    formState: { errors, isValid },
  } = useForm<Inputs>({
    defaultValues: {
      email: "test1@gmail.com",
      password: "12345",
    },
    mode: "onChange",
  });
  const onSubmit: SubmitHandler<Inputs> = async (values) => {
    const data = await dispatch(fetchAuth(values));
    if (!data.payload) {
      return alert("не удалось авторизоваться");
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
      <div className="max-w-96 mx-auto mt-40 border-gray-900 p-10 border-2 rounded-lg">
        <h1 className="text-center text-white font-black text-3xl mb-10">
          Login
        </h1>
        <form className=" flex flex-col " onSubmit={handleSubmit(onSubmit)}>
          <input
            className={`bg-gray-900 text-white p-3 rounded-xl mb-7 w-full text-center ${
              errors.email ? "border-red-500" : ""
            }`}
            defaultValue="email"
            {...register("email", { required: true, maxLength: 20 })}
          />
          <input
            className={`bg-gray-900 text-white p-3 rounded-xl mb-7 w-full text-center ${
              errors.password ? "border-red-500" : ""
            }`}
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
