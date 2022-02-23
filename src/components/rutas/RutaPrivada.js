import React, { useContext, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../../context/autenticacion/authContext";

const RutaPrivada = () => {
  const authContext = useContext(AuthContext);
  const { autenticado, cargando, usuarioAutenticado } = authContext;

  useEffect(() => {
    usuarioAutenticado();
    // eslint-disable-next-line
  }, []);

  if (autenticado) {
    return autenticado ? <Outlet /> : <Navigate to="/" />;
  } else {
    return cargando ? <Outlet /> : <Navigate to="/" />;
  }
};

export default RutaPrivada;
