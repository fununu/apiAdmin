import suncyan from './suncyan/suncyan'
import express  from 'express'
import process from 'process';



async function Run() {
    const app: express.Express = express();

    const port: Number = 8344;
    await suncyan( app );
    const server = app.listen(port, () => {
        if (process.send)
            process.send("ready");
        console.log(`더 스파이크 서버 정상 실행되었습니다. :${8344}`);
    }).on('error', (err: any) => {
        console.log('에러:' + JSON.stringify(err));
    });

    /**
     * 프로세스 처리
     */

    process.on('SIGINT', function () {
        server.close (() => {
            console.log('SIGINT: server closed');
            process.exit(0);
        })
    });
}

Run();

