import cors from 'cors';
import cds from '@sap/cds';
import http from 'http';
import express, { Express } from 'express';

const dotenv = require('dotenv');

dotenv.config();

interface ServerOptions {
  app?: Express;
  port?: number;
}

export default async function cds_server(options: ServerOptions) {
  const origin = process.env.ORIGINS || 'http://localhost:4200';
  const app: Express = options.app || express();

  const corsOptions = {
    origin: origin,
    optionsSuccessStatus: 200,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: 'Content-Type, Sap-Messages, sap-messages',
    credentials: true,
    preflightContinue: false,
  };

  app.use(express.json());
  app.use(cors(corsOptions));

  // Cargar y preparar los modelos
  const csn = await cds.load('*');
  cds.model = cds.linked(csn);

  // Conectar a la base de datos si es requerida
  if (cds.requires.db) {
    await cds.connect.to('db');
    console.info('Conexión a la base de datos establecida');
  }

  // Servir todos los servicios declarados en los modelos
  await cds.serve('all').in(app);

  // Crear y configurar el servidor HTTP
  const server = http.createServer(app);
  server.listen(options.port || 8000, () => {
    console.info(`Servidor escuchando en el puerto ${options.port || 8000}`);
  });
}