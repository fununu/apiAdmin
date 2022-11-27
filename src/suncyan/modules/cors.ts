'use strict'

// CORS 구성
import express from 'express';

var corsOptions = {
    origin: 'localhost:8344',
    optionsSuccessStatus: 200
}

// White List 관리
var allowlist = [
    'http://192.168.10.101:8344',
];

export default (req: express.Request, next: express.NextFunction) => {
    var corsOptions;
    var header = req.header('Origin');
    if (typeof(header) === 'string' && allowlist.indexOf(header) !== -1) {
        corsOptions = { origin: true }
    } 
    else {
        corsOptions = { origin: false }
    }
    next();
}
