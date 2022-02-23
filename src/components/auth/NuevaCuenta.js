import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AlertaContext from "../../context/alertas/alertaContext";
import AuthContext from "../../context/autenticacion/authContext";

const NuevaCuenta = (props) => {
  //Extraer los valores del context
  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;
  const authContext = useContext(AuthContext);
  const { mensaje, autenticado, registrarUsuario } = authContext;

  const navigate = useNavigate();

  //En caso de que el usuario se haya registrado o autenticado o sea un registro duplicado
  useEffect(() => {
    if (autenticado) {
      navigate("/proyectos"); // Si es true autenticado, se manda al dashboard
    }

    if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.categoria);
    }
    // eslint-disable-next-line
  }, [mensaje, autenticado, navigate]);

  // Estado para iniciar sesión
  const [usuario, guardarUsuario] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmar: "",
  });

  // Para extraer de usuario
  const { nombre, email, password, confirmar } = usuario;

  const onChange = (e) => {
    guardarUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  // Cuando el usuario quiera iniciar sesión
  const onSubmit = (e) => {
    e.preventDefault();

    //Validar que no haya campos vacios
    if (
      nombre.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      confirmar.trim() === ""
    ) {
      mostrarAlerta("Todos los campos son obligatorios", "alerta-error");
      return;
    }
    //Password minimo de 6 caracteres
    if (password.length < 6) {
      mostrarAlerta(
        "La contraseña debe ser al menos de 6 caracteres",
        "alerta-error"
      );
      return;
    }

    //Los 2 passwords son iguales
    if (password !== confirmar) {
      mostrarAlerta("Las contraseñas tienen que ser iguales", "alerta-error");
      return;
    }

    //Pasarlo al action
    registrarUsuario({
      nombre,
      email,
      password,
    });
  };

  return (
    <div className="form-usuario">
      {alerta ? (
        <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>
      ) : null}
      <div className="contenedor-form sombra-dark">
        <h1>Crea una cuenta</h1>

        <form onSubmit={onSubmit}>
          <div className="campo-form">
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              placeholder="Tu Nombre"
              value={nombre}
              onChange={onChange}
            />
          </div>
          <div className="campo-form">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Tu Email"
              value={email}
              onChange={onChange}
            />
          </div>

          <div className="campo-form">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={onChange}
            />
          </div>
          <div className="campo-form">
            <label htmlFor="confirmar">Confirmar Contraseña</label>
            <input
              type="password"
              id="confirmar"
              name="confirmar"
              placeholder="Repite tu contraseña!"
              value={confirmar}
              onChange={onChange}
            />
          </div>

          <div className="campo-form">
            <input
              type="submit"
              className="btn btn-primario btn-block"
              value="Registrarme"
            />
          </div>
        </form>

        <Link to={"/"} className="enlace-cuenta">
          Volver a Iniciar Sesión
        </Link>
      </div>
    </div>
  );
};

export default NuevaCuenta;
