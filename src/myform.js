import { useNavigate, useParams } from "react-router-dom";
import axios from "./authConfig/axios";

const MyForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    login(e.target.email.value, e.target.password.value);
    //logout();

    console.log(e.target.email.value);
    console.log(e.target.password.value);
  };
  /*
  const { login } = useAuth({
    middleware: 'guest',
    redirectIfAuthenticated: '/dashboard'
  })*/
  let navigate = useNavigate();
  const csrf = () => axios.get("/sanctum/csrf-cookie");

  const login = async (mail, pass) => {
    await csrf();
    console.log(csrf());

    axios
      .post("/login", { email: mail, password: pass })
      .then(() => {
        navigate("/second");
        localStorage.setItem("islogin", "true");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const logout = async () => {
    await csrf();
    console.log(csrf());

    axios
      .post("/logout")
      .then(() => {
        navigate("/login");
        localStorage.removeItem("islogin");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="App">
      <form className="form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" placeholder="nome@email.com.br" />
        </div>
        <div className="input-group">
          <label htmlFor="password">password</label>
          <input type="password" name="password" />
        </div>
        <button className="primary">Login</button>
      </form>
      <button onClick={login}>Log in</button>
      <button onClick={logout}>Log out</button>
    </div>
  );
};

export default MyForm;
