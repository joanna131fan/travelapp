import { useForm } from "react-hook-form";
import axios from "axios";

function LoginForm() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "all",
  });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const user = await axios.post("/login", {
        username: getValues("userName"),
        email: getValues("email"),
        password: getValues("password")
      });
      console.log(e);
    }
    catch(err) {
      console.log(err);
    }
  }


  console.log(errors);

  return (
    <div className="App">
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <h2>Log In</h2>
        {/* combine username and email validation */}
        <input
          {...register("userName", {
            required: "Username is Required..."
          })}
          placeholder="Username"
        />
        <p>{errors.userName?.message}</p>
        <input
          {...register("email", {
            required: "Email is Required..."
          })}
          placeholder="hi@gmail.com"
        />
        <p>{errors.email?.message}</p>
        <input
          {...register("password", {
            required: "Password is Required..."
          })}
          placeholder="Password"
        />
        <p>{errors.password?.message}</p>
        <input type="Submit" />
      </form>
    </div>
  );
}

export default LoginForm;