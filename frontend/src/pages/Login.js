import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./css/Login.css";
import { useSelector, useDispatch } from "react-redux";
import { login, reset } from "../features/auth/authSlice";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate("/");
      toast.success("Signed In Successfully");
    }

    dispatch(reset());
  });

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const data = {
      email,
      password,
    };

    dispatch(login(data));
  };

  return (
    <div className="login-form-container">
      <h1 className="login-text">Login</h1>

      <form onSubmit={onSubmit} className="login-form">
        <p className="input-container">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={onChange}
            name="email"
            required
            placeholder="Email"
          ></input>
        </p>

        <p className="input-container">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={onChange}
            name="password"
            required
            placeholder="Password"
          ></input>
        </p>

        <button className="login-btn">Login</button>
      </form>
    </div>
  );
};

export default Login;
