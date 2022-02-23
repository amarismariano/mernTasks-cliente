import React, { useContext, useState } from "react";
import proyectoContext from "../../context/proyectos/proyectoContext";

const NuevoProyecto = () => {
  //Obtener state del formulario
  const proyectosContext = useContext(proyectoContext);
  const {
    formulario,
    errorformulario,
    mostrarFormulario,
    agregarProyecto,
    mostrarError,
  } = proyectosContext;

  //State para proyecto
  const [proyecto, guardarProyecto] = useState({
    nombre: "",
  });

  //Extraer Nombre de Proyecto
  const { nombre } = proyecto;

  //Lee contenidos del input
  const onChangeProyecto = (e) => {
    guardarProyecto({
      ...proyecto,
      [e.target.name]: e.target.value,
    });
  };

  //Cuando usuario envia proyecto
  const onSubmitProyecto = (e) => {
    e.preventDefault();

    // Validar el proyecto
    if (nombre === "") {
      mostrarError();
      return;
    }
    //Agregar al state
    agregarProyecto(proyecto);

    // Reiniciar el form
    guardarProyecto({
      nombre: "",
    });
  };

  //Mostrar el formulario
  const onClickHandler = () => {
    mostrarFormulario();
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-primario btn-block"
        onClick={onClickHandler}
      >
        Nuevo proyecto
      </button>
      {formulario ? (
        <form className="formulario-nuevo-proyecto" onSubmit={onSubmitProyecto}>
          <input
            type="text"
            className="input-text"
            placeholder="Nombre proyecto"
            name="nombre"
            value={nombre}
            onChange={onChangeProyecto}
          />

          <input
            type="submit"
            className="btn btn-primario btn-block"
            value="Agregar Proyecto"
          />
        </form>
      ) : null}
      {errorformulario ? (
        <p className="mensaje error">El nombre del proyecto es obligatorio</p>
      ) : null}
    </>
  );
};

export default NuevoProyecto;
