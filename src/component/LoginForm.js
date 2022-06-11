import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "../config/axios";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useContext(AuthContext);

  // const navigate = useNavigate();

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    // มันจะวิ่งไปที่ path ที่มี baseUrl ที่เรากำหนดตามด้วย pathที่เรากำหนดคือ /auth/login
    axios
      .post("/auth/login", { username, password })
      .then((res) => {
        console.log(res.data); // { message: "user login", token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9 }
        // localStorage เป็น Global variable ที่ต้องใช้ method setItem ในการส่งข้อมูลไปเก็บไว้ใน localStorage ซึ่งจะเก็บในรูปแบบ key-value โดย parameter ตัวที่ 1 เป็นชื่อ key parameter ตัวที่ 2 เป็น value
        // localStorage.setItem("TOKEN", token)
        // พอ login เสร็จ เอา token เก็บใน localStorage เสร็จ ให้ redirect ไปที่หน้า Home
        // navigate("/");

        login(res.data.token);
      })
      .catch((err) => {
        console.log(err);
        setError("Invalid username or password");
        setTimeout(() => setError(""), 3000);
      });
  };

  return (
    <>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmitLogin}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
}

export default LoginForm;
