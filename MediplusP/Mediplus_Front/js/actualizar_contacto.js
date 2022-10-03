//const actualizarPacienteUrl = 'https://mediplusapp.herokuapp.com/actualizarPaciente/';
//const actualizarPacienteUrl = 'http://127.0.0.1:8000/actualizarPaciente/';
const datosPacienteUrl = 'https://mediplusapp.herokuapp.com/datosPaciente/';

document.getElementById('actm').onblur(datosPaciente());

function validateNA(val) {
    const letters = /^[A-Z a-zÁÉÍÓÚáéíóúñ]+$/;
    if (val.match(letters))
        return true;
    else
        return false;
}

function validacionId(val) {
    if (Number(val) > 999)
        return true;
    else
        return false;
}

function validacionEdad(val) {
    if (Number(val) < 100)
        return true;
    else
        return false;
}

function datosPaciente() {
    numero = document.getElementById('actm').value;
    console.log(datosPacienteUrl + numero,"hola"); 
  fetch(datosPacienteUrl + numero)
    .then(response => {
      console.log(response);
      if (response.ok)
        return response.text()
      else
        throw new Error(response.status);
    })
    .then(data => {
      console.log("Datos: " + data);
      if (data.includes("No existe Paciente con ese numero de cédula")) {
      handleError(data);
      }
      paciente = JSON.parse(data);
      verdatos(paciente);
    })
    .catch(error => {
      console.error("ERROR: ", error.message);
      handleError();
    });
}

function verdatos(data){
    document.getElementById("Contacto").value = data.Contacto;
    document.getElementById("Parentezco").value = data.Parentezco;
    document.getElementById("TelC").value = data.Tel_Contacto;
}

function datos(med) {
    med.preventDefault();//puedo quitar esto 
    const Contacto = document.actualizar.Contacto.value.trim();
    const Parentezco = document.actualizar.Parentezco.value.trim();
    const TelC = document.actualizar.TelC.value.trim();

    if (Contacto){
        result = validateNA(Contacto);
        if (!result) {
        alert('El dato agregado no es válido');
        return;
        }
    }
    if (Parentezco){
        result = validateNA(Parentezco);
        if (!result) {
        alert('El dato agregado no es válido');
        return;
        }
    }
    if (TelC){
        result = validacionId(TelC);
        if (!result) {
        alert('Numero de telefono no es valido');
        return;
        }
    }

    const medico = {
        Contacto: Contacto,
        Parentezco: Parentezco,
        TelC: TelC

        
    }
    console.log(medico);
    const medatos = JSON.stringify(medico);
    actualizarMedico(medatos);
}

function actualizarMedico(data) {
    // Petición HTTP
    fetch(actualizarPacienteUrl + numero, {
        method: "PUT",
        headers: {
            "Content-Type": "aplication/json"
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
            alert('Datos Actualizados');
        })
        .catch(error => {
            console.error("ERROR: ", error.message);
            alert('Error en los datos');
        });
} 

// --------------------
document.actualizar.addEventListener("submit",datos);