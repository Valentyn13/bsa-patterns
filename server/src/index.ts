import { createServer } from 'http';
import { Server, Socket } from 'socket.io';

import path = require('path');
import lists from './assets/mockData';
import Database from './data/database';
import CardHandler from './handlers/card.handler';
import ListHandler from './handlers/list.handler';
import ReorderService from './services/reorder.service';
import FileObserver from './observer/observer';
import formatDate from './helpers/date.helpers';
import ProxyReorderLogger from './proxy/reorder-proxy-logger';
import ConsoleObserver from './observer/console-observer';

const PORT = 3003;

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

const date = formatDate(new Date().toISOString());
const logPath = path.join(__dirname, 'logs', `${date}.txt`);

const db = Database.Instance;
const reorderService = new ProxyReorderLogger(new ReorderService(), logPath);

if (process.env.NODE_ENV !== 'production') {
  db.setData(lists);
}

const listHandler = new ListHandler(io, db, reorderService);
const cardHandler = new CardHandler(io, db, reorderService);

const consoleObserver = new ConsoleObserver();
const fileObserver = new FileObserver(logPath);

cardHandler.subscribe(consoleObserver);
cardHandler.subscribe(fileObserver);

listHandler.subscribe(consoleObserver);
listHandler.subscribe(fileObserver);

const onConnection = (socket: Socket): void => {
  listHandler.handleConnection(socket);
  cardHandler.handleConnection(socket);
};

io.on('connection', onConnection);

httpServer.listen(PORT, () => console.log(`Listening on port: ${PORT}`));

export default httpServer;
