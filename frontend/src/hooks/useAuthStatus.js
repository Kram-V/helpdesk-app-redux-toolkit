import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export const useAuthStatus = () => {
  const { user } = useSelector((state) => state.auth);

  const [loggedIn, setLoggedIn] = useState(true);

  useEffect(() => {
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [user]);

  return { loggedIn };
};
