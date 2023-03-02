// Obtener referencia al formulario
const form = document.querySelector('#mi-formulario');

// Agregar un evento de escucha para cuando se envíe el formulario
form.addEventListener('submit', (event) => {
  // Prevenir que el formulario se envíe por defecto
  event.preventDefault();

  // Crear un objeto FormData con los datos del formulario
  const formData = new FormData(form);

  // Crear una instancia de la API de Gmail
  gapi.load('client:auth2', () => {
    gapi.client.init({
      apiKey: 'API_KEY',
      clientId: 'CLIENT_ID',
      discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest'],
      scope: 'https://www.googleapis.com/auth/gmail.compose'
    }).then(() => {
      // Obtener los datos del formulario
      const para = formData.get('para');
      const asunto = formData.get('asunto');
      const mensaje = formData.get('mensaje');
      const archivo = formData.get('archivo');

      // Crear un mensaje MIME
      const message = new gapi.client.gmail.users.messages.send({
        userId: 'me',
        resource: {
          raw: makeMessage(para, asunto, mensaje, archivo)
        }
      });

      // Enviar el mensaje
      message.execute((response) => {
        console.log(response);
      });
    });
  });
});

// Función para crear un mensaje MIME
function makeMessage(to, subject, body, attachment) {
  const boundary = 'myboundary';

  const messageParts = [];

  // Parte del mensaje de texto
  const textPart = [
    `To: ${to}`,
    `Subject: ${subject}`,
    '',
    body
  ].join('\n');

  messageParts.push(textPart);

  // Parte del archivo adjunto
  if (attachment) {
    const attachmentPart = [
      `--${boundary}`,
      `Content-Type: ${attachment.type}`,
      `Content-Transfer-Encoding: base64`,
      `Content-Disposition: attachment; filename="${attachment.name}"`,
      '',
      attachment.base64,
      ''
    ].join('\n');

    messageParts.push(attachmentPart);
  }

  // Combinar las partes del mensaje
  const message = messageParts.join(`\n--${boundary}\n`);

  
  const encodedMessage = btoa(message);

  // Devolver el mensaje MIME
  return encodedMessage;
}