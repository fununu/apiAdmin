import express from 'express';
import cors from 'cors';
import red from './modules/redis'; 

export default async ({app} : {app: express.Application}) => {
    /**
     * 프로세스 설정
     */
    let isAllowKeepAlive = true;
    app.use(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        if (!isAllowKeepAlive) {
            res.set('Connection', 'close');
        }
        next();
    });

    app.get('/status', (req: any, res: any) => {res.status(200).end();});
    app.head('/status', (req: any, res: any) => {res.status(200).end();});
    
    /**
     * 미들웨어  적용
     */
    app.use(cors(require('./modules/cors')));
    app.use(express.json({limit: "1mb"}));
    app.use(express.urlencoded({limit: "1mb", extended: true }));
    app.use('/', express.static('public/javascripts/bin'))
    app.use('/', express.static('public/css/'))
    
    app.use(require('morgan')('dev'));
    app.use(red.middleware);
    
    /*
     * 라우터 설정
     */
    app.use(require('./expressRouter'))

    return app;
}