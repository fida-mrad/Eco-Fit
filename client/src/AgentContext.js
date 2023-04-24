import { useState, useContext, createContext, useEffect } from "react";
import { authAgent } from "./services/authAgentApi";

const agentContext = createContext({
  agent: null,
});

const Store = () => {
  const [agent, setAgent] = useState(null);

  useEffect(() => {
    authAgent
      .details()
      .then((res) => {
        setAgent(res);
      })
      .catch((err) => {
        console.log(err.response);
        setAgent(err.response);
      });
  }, []);

  return {
    agent,
  };
};

export const ProvideAgent = ({ children }) => {
  const storeValue = Store();
  return (
    <agentContext.Provider value={storeValue}>{children}</agentContext.Provider>
  );
};

export const useAgent = () => {
  return useContext(agentContext);
};
