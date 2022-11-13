const expess = require('express');
const app = expess();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const patientsRoute = require('./routes/patients');

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

app.use('/pacientes', patientsRoute);

app.use((req,res,next)=>{
    const erro = new Error('Rota não encontrada');
    erro.status = 404;
    next(erro);
})

app.use((error, req, res, next)=>{
    res.status(error.status || 500);
    return res.send({
        erro: {
            message: "" + error.message
        }
    });
});

module.exports = app;