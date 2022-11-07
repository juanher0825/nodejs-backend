import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import debug from 'debug';
import routes from './routes/index.js';
import connect from './utils/connection.js'

dotenv.config()

const app = express();
const port = Number(process.env.PORT) || 3000;
const debuglog = debug('app')

app.use(express.json())
app.use(cors())


//Routing
routes(app);
connect();
app.get('/', (req, res) => {
    res.send('Servidor con Express :)');
});

app.listen(port, () => {
    debuglog('Application running')
    console.log('El servidor esta escuchando en el puerto' + ' ' + port);
});
