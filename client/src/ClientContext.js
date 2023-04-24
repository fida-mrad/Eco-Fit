import {
  useState,
  useContext,
  createContext,
  useEffect,
  ReactNode,
} from "react";
import { authClientApi } from "./services/Api";

const clientContext = createContext({
  client: null,
});

const Store = () => {
  const [client, setClient] = useState(null);

  useEffect(() => {
    authClientApi
      .details()
      .then((res) => {
        // if (res.status === 200||res.status===304||res.status === 204) {
        setClient(res);
        // }
      })
      .catch((err) => {
        console.log(err.response);
        setClient(err.response);
      });
  }, []);

  return {
    client,setClient
  };
};

export const ProvideClient = ({ children }) => {
  const storeValue = Store();
  return (
    <clientContext.Provider value={storeValue}>
      {children}
    </clientContext.Provider>
  );
};

export const useClient = () => {
  return useContext(clientContext);
};
