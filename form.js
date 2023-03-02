  // Obtener referencia al formulario
  const form = document.querySelector('#mi-formulario');

  // Agregar un evento de escucha para cuando se envíe el formulario
  form.addEventListener('submit', (event) => {
    // Prevenir que el formulario se envíe por defecto
    event.preventDefault();

    // Crear un objeto FormData con los datos del formulario
    const formData = new FormData(form);

    // Agregar el archivo JSON al objeto FormData
    const fileInput = document.querySelector('#archivo');
    formData.append('archivo', fileInput.files[0]);

    // Crear una nueva solicitud AJAX
    const xhr = new XMLHttpRequest();

    // Configurar la solicitud AJAX
    xhr.open('POST', form.action);

    // Enviar la solicitud AJAX con el objeto FormData
    xhr.send(formData);
  });