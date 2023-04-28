import { useState, useContext, createContext, useEffect } from "react";
import { authAdmin } from "./Services/authAdminApi";

const adminContext = createContext({
  admin: null,
});

const Store = () => {
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    authAdmin
      .details()
      .then((res) => {
        setAdmin(res);
      })
      .catch((err) => {
        setAdmin(err.response);
      });
  }, []);

  return {
    admin,
  };
};

export const ProvideAdmin = ({ children }) => {
  const storeValue = Store();
  return (
    <adminContext.Provider value={storeValue}>{children}</adminContext.Provider>
  );
};

export const useAdmin = () => {
  return useContext(adminContext);
};
