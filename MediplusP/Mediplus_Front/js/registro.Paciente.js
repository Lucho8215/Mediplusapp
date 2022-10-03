const agregar_pacienteUrl = 'https://mediplusapp.herokuapp.com/agregar_paciente/';
//const agregar_pacienteUrl = 'http://127.0.0.1:8000/agregar_paciente/';

    function agregar_paciente() {
        fetch(agregar_pacienteUrl)
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




function validate_names(val) {
    const letters = /^[A-Z a-zÁÉÍÓÚáéíóúñ]+$/;
    if (val.match(letters))
        return true;
    else
        return false;
}

function validate_id(val) {
    if (Number(val) > 1000)
        return true;
    else
        return false;
}
function collectData(evt) {
    evt.preventDefault();
//function collectData(med) {
  //  med.preventDefault();

    const Cedula = document.registro.Cedula.value;
    const NomP = document.registro.NomP.value;
    const ApeP = document.registro.ApeP.value;
    const FechaNto = document.FechaNto.Cedula.value;
    const Edad = document.registro.Edad.value;
    const TelP = document.registro.TelP.value;
    const Direccion = document.registro.Direccion.value;
    const Contacto = document.registro.Contacto.value;
    const Parentezco = document.registro.Parentezco.value;
    const TelC = document.registro.TelC.value;
    const Id_Medico = document.registro.Id_Medico.value;


    let result = validate_id(Cedula);
    if (!result) {
        alert('Cédula no es válida');
        return;
    }
    result = validate_names(NomP);
    if (!result) {
        alert('Nombre no es válido');
        return;
    }
    result = validate_names(ApeP);
    if (!result) {
        alert('Apellido no es válido');
        return;
    }
  //  result = validate_password(password);
   // if (!result) {
     //   alert('Contraseña no es válida. Debe tener al menos 5 caracteres.');
       // return;
    }

    const customer = {
        Cedula: Cedula,
        NomP: NomP,
        ApeP: ApeP,
        FechaNto: document.FechaNto.Cedula,
        Edad: Edad,
        TelP: TelP,
        Direccion: Direccion,
        Contacto: Contacto,
        Parentezco: Parentezco,
        TelC: TelC,
        Id_Medico: Id_Medico
      //  password: password
    }
    console.log(customer);
    const dataToSend = JSON.stringify(customer);
    agregar_paciente(dataToSend);


function saveCustomer(data) {
    // Petición HTTP
    fetch(agregar_paciente, {
        method: "POST",
        headers: {
            "Content-Type": "text/json"
        },
        body: data
    })
        .then(response => {
            console.log(response);
            if (response.ok)
                return response.text()
            else
                throw new Error(response.text());
        })
        .then(data => {
            console.log(data);
            handleSuccess();
        })
        .catch(error => {
            console.error("ERROR: ", error.message);
            handleError();
        });
}

function handleSuccess() {
    document.getElementById("formData").remove();
    const message = document.createElement("p");
    message.innerText = "usuario creado exitosamente.";
    const info = document.getElementById("info");
    info.appendChild(message);
}

function handleError() {
    document.getElementById("formData").remove();
    const message = document.createElement("p");
    message.innerText = "No se pudo crear el usuario. Intente luego.";
    const info = document.getElementById("info");
    info.appendChild(message);
}

// --------------------
document.registro.addEventListener("submit", collectData);