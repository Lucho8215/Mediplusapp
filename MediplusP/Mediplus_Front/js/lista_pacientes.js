const listaPacientesUrl = 'https://mediplusapp.herokuapp.com/listaPacientes';
//const listaPacientesUrl = 'http://127.0.0.1:8000/listaPacientes';
pacientes = [];

function listaPacientes() {
  fetch(listaPacientesUrl)
    .then(response => {
      console.log(response);
      if (response.ok)
        return response.text()
      else
        throw new Error(response.status);
    })
    .then(data => {
      console.log("Datos: " + data);
      pacientes = JSON.parse(data);
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
    <th>Parentesco</th>
    <th>Telefono Contacto</th>
    
    `;
    
  lisp.push(rotulos);

  pacientes.forEach((pac) => {
    const lis = document.createElement("tr");
    lis.innerHTML = `
      <td>${pac.Cedula}</td>
      <td>${pac.Nombres}</td>
      <td>${pac.Apellidos}</td>
      <td>${pac.FechaNto}</td>
      <td>${pac.Edad}</td>
      <td>${pac.Telefono}</td>
      <td>${pac.Direccion}</td>
      <td>${pac.Contacto}</td>
      <td>${pac.Parentezco}</td>
      <td>${pac.Tel_Contacto}</td>
     
      `;
    lisp.push(lis);
  });
  document.getElementById("cargando").remove();
  const info = document.getElementById("info-pacientes");
  lisp.forEach(lis => info.appendChild(lis));
}

function handleError() {
  document.getElementById("cargando").remove();
  const message = document.createElement("p");
  message.innerText = "No se pudo cargar la información. Intente más tarde.";
  const info = document.getElementById("info-pacientes");
  info.appendChild(message);
}

//-----------------------------------

document.addEventListener("DOMContentLoaded", listaPacientes);