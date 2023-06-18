import React, { useState, useEffect, useRef } from "react";
import Keycloak from "keycloak-js";
import { useNavigate } from "react-router-dom";

const client = new Keycloak({
  url: import.meta.env.VITE_KEYCLOAK_URL,
  realm: import.meta.env.VITE_KEYCLOAK_REALM,
  clientId: import.meta.env.VITE_KEYCLOAK_CLIENT,
});

const useAuth = () => {
  const navigate = useNavigate();
  const isRun = useRef(false);
  const [token, setToken] = useState(null);
  const [isLoggedIn, setLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (isRun.current) return;

    isRun.current = true;
    client
      .init({
        onLoad: "login-required",
      })
      .then((res) => {
        setLogin(res);
        setToken(client.token);
        setIsAdmin(client.hasRealmRole("app-admin"));
      });
  }, []);

  function logOut() {
    navigate("/");
    client.logout();
  }

  function logIn() {
    client.login();
  }

  return [isLoggedIn, token, logIn, logOut, isAdmin];
};

export default useAuth;
