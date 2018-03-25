
// Modules
const express       = require('express');
const bodyParser    = require('body-parser');
const psoCtrl       = require('../controller/psoController');

// Router
const matrixRouter = express.Router();
matrixRouter.use(bodyParser.json());

// Routes
matrixRouter.route('/')
    .all((req, res, next) => {
        cors(res);

        next();
    })

    .get(psoCtrl.optimize)

    .options((req, res, next) => {
        res.end();
    });

function cors(res) {
    res.statusCode = 200;
    res.setHeader('Content-type', 'text/html');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
}

module.exports = matrixRouter;
