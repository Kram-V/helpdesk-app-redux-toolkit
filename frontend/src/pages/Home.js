import React from "react";
import "./css/Home.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="home-container">
      {user ? (
        <>
          <h1 className="h1-header">
            Welcome, <span className="username-text">{user.name}!</span>
          </h1>

          {user.isStaff === false ? (
            <p>
              Please do not hesitate to ask a question on how to refund your
              money.
            </p>
          ) : (
            <p>
              Please assist our customers to make them satisfied about our
              services
            </p>
          )}
        </>
      ) : (
        <>
          <h1 className="h1-header">
            Need Some <span className="help-text">Help?</span>
          </h1>

          <p>
            Feel free to ask any questions or services that we provide to help
            you
          </p>

          <Link to="/register">
            <button className="sign-up-btn">Sign Up</button>
          </Link>
        </>
      )}
    </div>
  );
};

export default Home;
