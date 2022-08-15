import React, { useEffect } from "react";
import "./css/Header.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import { toast } from "react-toastify";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoggedOut } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    if (isLoggedOut && !user) {
      toast.success("Logged Out Successfully");

      dispatch(reset());
    }
  });

  return (
    <div className="header">
      <div className="header-container-1">
        <Link to="/" className="header-link">
          Support Desk App
        </Link>
      </div>

      <div className="header-container-2">
        <ul className="subheader-container-2">
          {user ? (
            <>
              <li>
                {user.isStaff === false ? (
                  <Link to="/create" className="nav-link">
                    Create Refund
                  </Link>
                ) : null}
              </li>

              <li>
                <Link to="/refunds" className="nav-link">
                  Refunds
                </Link>
              </li>

              <li>
                <Link to="/" onClick={onLogout} className="nav-link">
                  Logout
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="nav-link">
                  login
                </Link>
              </li>

              <li>
                <Link to="/register" className="nav-link">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Header;
