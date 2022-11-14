const mockApi = "https://637160d507858778617bac42.mockapi.io/api/v1/users";
const results = document.getElementById("results");
var myModal = new bootstrap.Modal(document.getElementById('dataModal'), []);


document.addEventListener("DOMContentLoaded", () => {
  listar();
  document.querySelectorAll(".btn-disable").forEach(element => {
    element.disabled  = true;
  });
});

document.getElementById("btnSendChanges").addEventListener("click", () => {
    modificar();
});

document.querySelectorAll(".agregar").forEach((input) =>{
   input.addEventListener("change", () => {
        ableButton("btnPost", ".agregar");
    }); 
});

document.querySelectorAll(".eliminar").forEach((input) =>{
    input.addEventListener("change", () => {
         ableButton("btnDelete",".eliminar");
     }); 
 });

 document.querySelectorAll(".editar").forEach((input) =>{
    input.addEventListener("change", () => {
         ableButton("btnPut",".editar");
     }); 
 });

function ableButton(btn, id)
{
    let btnAgregar = document.getElementById(btn);
    btnAgregar.disabled = Array.prototype.some.call(document.querySelectorAll(id), (x) => x.value === "");
}

document.getElementById("btnGet1").addEventListener("click", () => {
    listar()
});

document.getElementById("btnPut").addEventListener("click", () => {
    cargarModificar();
});


function cargarModificar(){
    let id = document.getElementById("inputPutId").value;

    fetch(mockApi + "/" + id).then((response) => {
        if (response.ok) {
            return response.json();
        }
        showAlert();
    }).then(data => {
       
        document.getElementById("inputPutNombre").value = data.nombre;
        document.getElementById("inputPutApellido").value = data.apellido;
        myModal.show();
    }).catch((error) => {
        showAlert();
        console.log(error);
    });
}

function listar() {
    let input = document.getElementById("inputGet1Id").value;
    results.innerHTML = "";
    let url = mockApi;
    if(input.length>0){
        url +="/";
    }
    fetch(url + input).
    then((response) => {
        if (response.ok) {
            return response.json();
        } 
        showAlert();
    }).then(data => {
        if(Array.isArray(data)) {
            data.forEach(element => {
                results.innerHTML += ` { "id": ${element.id},  "nombre": ${element.nombre}, "apellido": ${element.apellido} } <br>`;
            });
        }else{
            results.innerHTML = ` { "id": ${data.id},  "nombre": ${data.nombre}, "apellido": ${data.apellido} } <br>`;
        }
    }).catch((error) => {
        showAlert();
        console.log(error);
    });
}

function agregar() {
  let xnombre = document.getElementById("inputPostNombre").value;
  let xapellido = document.getElementById("inputPostApellido").value;

  fetch(mockApi, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ nombre: xnombre, apellido: xapellido })
    }).then(response => {
        if (response.ok) {
            results.innerHTML = `usuario agregado <br>`;
            document.getElementById("inputPostNombre").value = "";
            document.getElementById("inputPostApellido").value = "";
            listar();
            return;
        }
        showAlert();
    }).catch((error) =>{
        showAlert();
        console.log(error);
    });
}

function modificar() {
    let id = document.getElementById("inputPutId").value;
    let nombre = document.getElementById("inputPutNombre").value;
    let apellido = document.getElementById("inputPutApellido").value;

    fetch(mockApi + "/" + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "nombre": nombre, "apellido": apellido })
    }).then(response2 => {
        if (response2.ok) {
            myModal.hide();
            document.getElementById("inputPutId").value="";
            document.getElementById("inputPutNombre").value="";
            document.getElementById("inputPutApellido").value="";
            listar();
            return;
        }
        showAlert();
    }).catch((error) => {
        showAlert();
        console.log(error);
    });
}

function eliminar() {
    let id = document.getElementById("inputDelete").value;
    fetch(mockApi + "/"+ id,{method:'DELETE'}).
    then(response => {
        if(response.ok) {
            listar();
        }else {
            showAlert();
        }
    }).catch((error) => {
        showAlert();
        console.log(error);
    });
    
}

function showAlert(){
    document.getElementById('alert-message').style.display="block";
    setTimeout(() => {
        document.getElementById('alert-message').style.display="none";
      }, 3000)
}