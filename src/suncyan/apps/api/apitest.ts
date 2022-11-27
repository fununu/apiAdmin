'use strict'

import {Request, Response, Router} from 'express'
import fs from 'fs';

const router: Router = Router();
require('dotenv').config();


router.get('/', async (req: Request, res: Response) => {
    let read_template = fs.readFile('public/html/test.htm', 'utf8', (err, data) => {

        res.end(data);
    })
    
});
router.get('/a', async (req: Request, res: Response) => {
    res.send(JSON.stringify({
        TEST: "TYYYYYYYYYYS"
    }));
    
});

module.exports = router;