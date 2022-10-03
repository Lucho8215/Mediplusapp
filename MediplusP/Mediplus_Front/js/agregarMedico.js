const agregarMedicoUrl = 'https://mediplusapp.herokuapp.com/agregarMedico';
//const agregarMedicoUrl = 'http://127.0.0.1:8000/agregarMedico';

function validateNA(val) {
    const letters = /^[A-Z a-zÁÉÍÓÚáéíóúñ]+$/;
    if (val.match(letters))
        return true;
    else
        return false;
}

function validacionId(val) {
    if (Number(val) > 1000)
        return true;
    else
        return false;
}

function datos(med) {
    med.preventDefault();//puedo quitar esto 

    const Id_Medico = document.listam.Id_Medico.value;
    const NomM = document.listam.NomM.value.trim();
    const ApeM = document.listam.ApeM.value.trim();
    const TelM = document.listam.TelM.value;
    const Especialidad = document.listam.Especialidad.value.trim();

    let result = validacionId(Id_Medico);
    if (!result) {
        alert('El codigo de medico es invalido');
        return;
    }
    result = validateNA(NomM);
    if (!result) {
        alert('Nombre no es válido');
        return;
    }
    result = validateNA(ApeM);
    if (!result) {
        alert('Apellido no es válido');
        return;
    }
    result = validacionId(TelM);
    if (!result) {
        alert('Numero de telefono no es valido');
        return;
    }
    result = validateNA(Especialidad);
    if (!result) {
        alert('La especialidad agregada no es válida');
        return;
    }

    const medico = {
        Id_Medico: Id_Medico,
        Nombres: NomM,
        Apellidos: ApeM,
        Telefono: TelM,
        Especialidad: Especialidad
    }
    console.log(medico);
    const medatos = JSON.stringify(medico);
    agregarMedico(medatos);
}

function agregarMedico(data) {
    // Petición HTTP
    fetch(agregarMedicoUrl, {
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
    message.innerText = "Medico agregado";
    
    const info = document.getElementById("info");
    info.appendChild(message);
}

function handleError() {
    document.getElementById("formData").remove();
    const message = document.createElement("p");
    message.innerText = "No se puede agregar nuevo medico en este momento, por favor intente mas tarde";
    const info = document.getElementById("info");
    info.appendChild(message);
}

// --------------------
document.listam.addEventListener("submit",datos);
