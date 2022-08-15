import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./css/Register.css";
import { useSelector, useDispatch } from "react-redux";
import { register, reset } from "../features/auth/authSlice";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { name, email, password, confirmPassword } = formData;

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

      toast.success("Registered and Signed In Successfully");
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

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
    } else {
      const data = {
        name,
        email,
        password,
      };

      dispatch(register(data));
    }
  };

  return (
    <div className="register-form-container">
      <h1 className="register-text">Register</h1>

      <form onSubmit={onSubmit} className="register-form">
        <p className="input-container">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={onChange}
            name="name"
            required
            placeholder="Name"
            id="register-input"
          ></input>
        </p>

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

        <p className="input-container">
          <label>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={onChange}
            name="confirmPassword"
            required
            placeholder="Confirm Password"
          ></input>
        </p>

        <button className="register-btn">Register</button>
      </form>
    </div>
  );
};

export default Register;
