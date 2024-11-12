import cds_server from './server.js'; // Importar la función cds_server


async function main() {
  // Definir las opciones del servidor
  const options = {
    port: 8000, // Puerto deseado
  };

  // Iniciar el servidor
  await cds_server(options);
}

main().catch((error) => {
  console.error('Error al iniciar la aplicación:', error);
});