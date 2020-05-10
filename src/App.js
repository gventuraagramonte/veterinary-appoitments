import React, { Fragment, useState, useEffect } from "react";
import Formulario from "./components/Formulario";
import Cita from "./components/Cita";

function App() {
  //Citas en localStorage
  let citasIniciales = JSON.parse(localStorage.getItem("citas"));
  if (!citasIniciales) {
    citasIniciales = [];
  }
  //Arreglo de citas=>Lo que se va mostrar mientras se vaya creando
  const [citas, guardarCitas] = useState(citasIniciales);

  // Use Effect para realizar ciertas operacions cuando el state cambia
  useEffect(() => {
    let citasIniciales = JSON.parse(localStorage.getItem("citas"));
    if (citasIniciales) {
      localStorage.setItem("citas", JSON.stringify(citas));
    } else {
      localStorage.setItem("citas", JSON.stringify([]));
    }
  }, [citas]);

  //Funcion que tome las citas actuales y agregue la nueva
  const crearCita = (cita) => {
    guardarCitas([...citas, cita]);
  };

  //Funcion que elimina una cita por su id
  const eliminarCita = (id) => {
    const nuevasCitas = citas.filter((cita) => cita.id !== id);
    // como ya se tiene un arreglo solamente queda quitarle lo que no queremos
    guardarCitas(nuevasCitas);
  };

  //Mensaje condicional
  const titulo = citas.length === 0 ? "No hay citas" : "Administra tus citas";
  return (
    <Fragment>
      <h1>Adminstrador de Pacientes</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario crearCita={crearCita} />
          </div>
          <div className="one-half column">
            <h3>{titulo}</h3>
            {citas.map((cita) => (
              <Cita key={cita.id} cita={cita} eliminarCita={eliminarCita} />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
