const mockApi = "https://6363e9fb8a3337d9a2ec4742.mockapi.io/users/";
const results = document.getElementById("results");

document.addEventListener("DOMContentLoaded", () => {
  listar();
});

document.getElementById("btnSendChanges").addEventListener("click", () => {
    modificar();
});

document.getElementById("btnGet1").addEventListener("click", () => {
    listar()
});

document.getElementById("btnPut").addEventListener("click", () => {
    cargarModificar();
});


function cargarModificar(){
    let id = document.getElementById("inputPutId").value;

    fetch(mockApi + id).then((response) => {
        if (response.ok) {
            return response.json();
        }
        results.innerHTML = "El usuario no existe o ha ocurrido un error";
    }).then(data => {
        document.getElementById("inputPutNombre").value = data.name;
        document.getElementById("inputPutApellido").value = data.lastname;
        var myModal = new bootstrap.Modal(document.getElementById('dataModal'), []);
        myModal.show();
    }).catch((error) => {
        console.log(error);
    });
}

function listar() {
    let input = document.getElementById("inputGet1Id").value;
    results.innerHTML = "";

    fetch(mockApi + input).then((response) => {
        if (response.ok) {
            return response.json();
        }
        results.innerHTML = "El usuario no existe o ha ocurrido un error";
    }).then(data => {
        if(Array.isArray(data)) {
            data.forEach(element => {
                results.innerHTML += ` { "id": ${element.id},  "name": ${element.name}, "lastname": ${element.lastname} } <br>`;
            });
        }else{
            results.innerHTML = ` { "id": ${data.id},  "name": ${data.name}, "lastname": ${data.lastname} } <br>`;
        }
    }).catch((error) => {
        console.log(error);
    });
}

function agregar() {
  let nombre = document.getElementById("inputPostNombre").value;
  let apellido = document.getElementById("inputPostApellido").value;

  fetch(mockApi, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf=8'
    },
    body: JSON.stringify({ "name": nombre, "lastname": apellido })
    }).then(response => {
        if (response.ok) {
            return response.json();
        }
        results.innerHTML = "Ha ocurrido un error";
    })
    .then(data => {
        results.innerHTML = ` { "id": ${data.id} } <br>`;
    }).catch((error) =>{console.log(error)});
}

function modificar() {
    let id = document.getElementById("inputPutId").value;
    let nombre = document.getElementById("inputPutNombre").value;
    let apellido = document.getElementById("inputPutApellido").value;
  
    fetch(mockApi + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json; charset=utf=8'
      },
      body: JSON.stringify({ "name": nombre, "lastname": apellido })
    })
      .then(response => response.json())
      .then(response => console.log(JSON.stringify(response)));
}

function eliminar() {
    let id = document.getElementById("inputDelete").value;
    fetch(mockApi + id,{method:'DELETE'}).
    then(response => {
        if(response.ok) {
            listar();
        }else if(response.status == 404){
            results.innerHTML = "Usuario no existe";
        }else{
            results.innerHTML = "Ocurrio un error!!";
        }
    }).catch((error) => {
        console.log(error);
    });
}