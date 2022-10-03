const agregarPacienteUrl = 'https://mediplusapp.herokuapp.com/agregarPaciente';
//const agregarPacienteUrl = 'http://127.0.0.1:8000/agregarPaciente';

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

function validate_edad(val) {
    if (Number(val) < 100)
        return true;
    else
        return false;
}


function datosp(med) {
    med.preventDefault();

    const Cedula = document.listap.Cedula.value;
    const NomP = document.listap.NomP.value.trim();
    const ApeP = document.listap.ApeP.value.trim();
    const FechaNto = document.listap.FechaNto.value;
    const Edad = document.listap.Edad.value;
    const TelP = document.listap.TelP.value;
    const Direccion = document.listap.Direccion.value.trim();
    const Contacto = document.listap.Contacto.value.trim();
    const Parentezco = document.listap.Parentezco.value.trim();
    const TelC = document.listap.TelC.value;
    const Id_Medico = document.listap.Id_Medico.value;

    let result = validate_id(Cedula);
    if (!result) {
        alert('Cédula no es válida');
        return;
    }
    result = validate_names(NomP);
    if (!result) {
        alert('Nombre(s) no válido(s)');
        return;
    }
    result = validate_names(ApeP);
    if (!result) {
        alert('Apellido(s) no válido(s)');
        return;
    }
    result = validate_edad(Edad);
    if (!result) {
        alert('Edad no válida');
        return;
    }
    result = validate_id(TelP);
    if (!result) {
        alert('Telefono no válido');
        return;
    }
    result = validate_names(Contacto);
    if (!result) {
        alert('Contacto no válido');
        return;
    }
    result = validate_names(Parentezco);
    if (!result) {
        alert('Parentesco no válido');
        return;
    }
    result = validate_id(TelC);
    if (!result) {
        alert('Telefono no válida');
        return;
    }
    result = validate_id(Id_Medico);
    if (!result) {
        alert('Cédula no es válida');
        return;
    }
    

    const paciente = {
        Cedula: Cedula,
        Nombres: NomP,
        Apellidos: ApeP,
        FechaNto: FechaNto,
        Edad: Edad,
        Telefono: TelP,
        Direccion: Direccion,
        Contacto: Contacto,
        Parentezco: Parentezco,
        Tel_Contacto: TelC,
        Id_Medico: Id_Medico,
    }
    console.log(paciente);
    const pacdatos = JSON.stringify(paciente);
    agregarPaciente(pacdatos);
}

function agregarPaciente(data) {
    fetch(agregarPacienteUrl, {
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
    message.innerText = "Paciente agregado";
    const info = document.getElementById("info");
    info.appendChild(message);
}

function handleError() {
    document.getElementById("formData").remove();
    const message = document.createElement("p");
    message.innerText = "No se puede agregar nuevo paciente en este momento, por favor intente mas tarde";
    const info = document.getElementById("info");
    info.appendChild(message);
}

// --------------------
document.listap.addEventListener("submit",datosp);