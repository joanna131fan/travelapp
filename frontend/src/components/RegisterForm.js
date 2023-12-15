import { useForm, getValues } from "react-hook-form";
import axios from "axios";

// In the React application, create a registration form with fields for the user's email, password, and any other information that you want to collect.

// Create a login form with fields for the user's email and password.

// Create a form submission handler for each form that will send a POST request to the backend with the form data.

// On the Node.js backend, create a route for each form submission that will handle the incoming data.

// In the route handlers, you can then validate the form data, and then save the data to a database, or authenticate the user.

// Once the user is authenticated, you can use JSON Web Token (JWT) to maintain the user's session.

// You also need to use CORS middleware to handle cross-origin resource sharing (CORS) issues between the React frontend and the Node.js backend.
function RegisterForm() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "all",
    defaultValues: {
      userName: "",
      email: "",
      password: "",
      confirm_password: "",
    }
  });

  // POST FORM DATA: https://bosctechlabs.com/send-form-data-using-axios-post-request-react/
  const onSubmit = async e => {
    e.preventDefault();
    try {
      const newUser = await axios.post("/signup", {
        username: getValues("userName"),
        email: getValues("email"),
        password: getValues("password"),
        confirm_password: getValues("confirm_password")
      });
      console.log(e);
    }
    catch(err) {
      console.log(err);
    }
  }

  console.log(errors);

  return (
    <div className="RegisterForm">
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <h2>Create an account</h2>
        <input
          {...register("userName", {
            required: "Username is Required...",
            minLength: {
              value: 3,
              message: "Username must be at least 3 characters long...",
            },
            maxLength: {
              value: 20,
              message: "Username must be at most 20 characters long...",
            },
          })}
          placeholder="Username"
        />
        <p>{errors.userName?.message}</p>
        <input
          {...register("email", {
            required: "Email is Required...",
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: "Email must be valid",
            },
          })}
          placeholder="Email"
        />
        <p>{errors.email?.message}</p>
        <input
          {...register("password", {
            required: "Password is Required...",
            pattern: {
              value:
                /^(?=.*[0-9])(?=.*[!@#$%^&*.,])[a-zA-Z0-9!@#$%^&*.,]{6,50}$/,
              message:
                "Password Must Contain Between 6-50 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character",
            },
          })}
          placeholder="Password"
        />
        <p>{errors.password?.message}</p>
        <input 
          {...register("confirm_password", {
            required: "Password is Required...",
            pattern: {
              value:
              /^(?=.*[0-9])(?=.*[!@#$%^&*.,])[a-zA-Z0-9!@#$%^&*.,]{6,50}$/,
              message:
                "Password Must Contain Between 6-50 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character",
            }
          })}
          placeholder="Confirm Password"
          />
        <input type="Submit" />
      </form>
    </div>
  );
}

export default RegisterForm;