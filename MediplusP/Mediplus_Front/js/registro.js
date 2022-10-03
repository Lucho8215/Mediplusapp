//const datosPacienteUrl = 'https://mediplusapp.herokuapp.com/datosPaciente/';
const datosPacienteUrl = 'http://127.0.0.1:8000/datosPaciente/';

paciente = [];

function datosPaciente() {
    id = document.getElementById('cedula').value;
    console.log(datosPacienteUrl + id);
  fetch(datosPacienteUrl + id)
    .then(response => {
      console.log(response);
      if (response.ok)
        return response.text()
      else
        throw new Error(response.status);
    })
    .then(data => {
      console.log("Datos: " + data);
      if (data.includes("No existe paciente con ese numero de cédula")) {
        handleError(data);
      }
      paciente = JSON.parse(data);
      conpac();
    })
    .catch(error => {
      console.error("ERROR: ", error.message);
      handleError();
    });
}

function conpac() {
  const lisp = [];
  const rotulos = document.createElement("tr");
  rotulos.innerHTML = `
    <th>Cedula</th>
    <th>Nombres</th>
    <th>Apellidos</th>
    <th>Fecha de Nacimiento</th>
    <th>Edad</th>
    <th>Telefono</th>
    <th>Direccion</th>
    <th>Contacto</th>
    <th>Parentezco</th>
    <th>Telefono Contacto</th>`;
  lisp.push(rotulos);
  //paciente.forEach((pac) => {
    const lis = document.createElement("tr");
    lis.innerHTML = `
      <td>${paciente.Cedula}</td>
      <td>${paciente.Nombres}</td>
      <td>${paciente.Apellidos}</td>
      <td>${paciente.FechaNto}</td>
      <td>${paciente.Edad}</td>
      <td>${paciente.Telefono}</td>
      <td>${paciente.Direccion}</td>
      <td>${paciente.Contacto}</td>
      <td>${paciente.Parentezco}</td>
      <td>${paciente.Tel_Contacto}</td>
      `;
    lisp.push(lis);
  //});
  if(document.getElementById("info-pacientes"))document.getElementById("info-pacientes").innerHTML="";
  if(document.getElementById("cargando"))document.getElementById("cargando").remove();
  const info = document.getElementById("info-pacientes");
  lisp.forEach(lis => info.appendChild(lis));
}

function handleError(err) {
    document.getElementById("cargando").remove();
    const message = document.createElement("p");
    if (err)
      message.innerText = err;
    else
      message.innerText = "No se pudo cargar la información. Intente más tarde.";
    const info = document.getElementById("info-pacientes");
    info.appendChild(message);
  }