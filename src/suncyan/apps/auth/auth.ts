'use strict'

import {Request, Response, Router} from 'express'
import { PrismaClient } from '@prisma/client'
import requestIp from 'request-ip'
import normalCiphers from '../../modules/normalSuncyanCiphers'
import base64URL from '../../modules/base64URL'
import userToken from './userToken'

import { payloadHandler } from './thespikePayloadHandler'

const prisma: PrismaClient = new PrismaClient();
const router: Router = Router();
require('dotenv').config();


var THESPIKE_SHARED_SECRET: string;

try {
    if (process.env.THESPIKE_SHARED_SECRET !== undefined)
        THESPIKE_SHARED_SECRET = process.env.THESPIKE_SHARED_SECRET;
    else
        throw {code: 0, message: "환경변수 더스파이크 공유 키가 존재하지 않음."};
}
catch (err: any) {
    console.error(err);
}


var SUNCYAN_THESPIKE_SIGN: string;
try {
    if (process.env.SUNCYAN_THESPIKE_SIGN !== undefined)
        SUNCYAN_THESPIKE_SIGN = process.env.SUNCYAN_THESPIKE_SIGN; // HMAC 서명용
    else
        throw {code: 0, message: "환경변수 더스파이크 서명 키가 존재하지 않음."};
}
catch (err: any) {
    console.error(err);
}
type udata =  {
    num: bigint | null
    userData: Object | null

} | null;
type userData = {
    [key: string]: string
    HACK: any
    HACK_code: any
} | any;

router.get('/t', async (req: Request, res: Response) => {
    try {
        
        // for (let i = 1; i < 40000; i++) {
        //     var a: udata = await prisma.datas.findFirst({
        //         where: {num: i},
        //         select: {num: true, userData: true},
        //     });
        //     if (a !== null && a !== undefined && typeof(a.num) == 'bigint' && a.userData != null) {
        //         var b: userData = a.userData;
        //         try {
        //             await prisma.datasImportant.update({
        //                 where: {num: a.num},
        //                 data: {hack: b.HACK, HACK_code: b.HACK_code},
        //             });
        //         }
        //         catch(err) {
        //             console.log(err);
        //         }
        //     }
            
        //     console.log("실행됨: "+ i);
        // }
        const w = await req.Redis.get('counter');
        console.log("요청수: " + await req.Redis.get('counter'));
    }
    catch (err) {
        console.log("에러발생!!" + err);
    }

    res.send("SSS~!");
});

router.get('/ttst', async (req: Request, res: Response) => {
    res.send(Math.random().toString(18).slice(2).toUpperCase());
});

router.get('/w', async (req: Request, res: Response) => {
    const json = 
    {
      "version": {
        "gpg":{
          "version":[0],
          "url":"market://details?id=com.daerisoft.thespikerm"
        },
        "ios":{
          "version":["0"],
          "url":"https://itunes.apple.com/app/id1510097347"
        }
      },
        "server":{
          "available": false,
          "min_time": 30,
          "text": "ERR"
        },
        "gift":{
          "r0":{
            "reward":{"payType":1,"payValue":100},
            "text": "출시기념 선물지급"
          },
          "r1":{
            "reward":{"payType":1,"payValue":100},
            "text": "출시기념 선물지급"
          }
        }
    };

    var A = normalCiphers.encrypt_AES256CBC(Buffer.from(JSON.stringify(json)), "THESPIKEisSUNcNUNUmorGOD@@#!@#$~");
    let a: string = A.IV.toString('base64').replace(/=/g, "");
    let b: string = A.encryptedData.toString('base64').replace(/=/g, "");
    let c: string = normalCiphers.HMAC256_base64(a + "." + b, THESPIKE_SHARED_SECRET)
    const response = base64URL.base64_urlencode(a + "." + b + "." + c);

    res.send(response);
    
});
router.post('/d', async (req: Request, res: Response) => {
    try {
        const request = req.body;
        let received_ticket = "";
        var algorithm_mod: string = "gcm";
        if (typeof(request.t) !== 'string') {
            if (typeof(request.tc) !== 'string') {
                throw {err: "토큰값 없음"};
            }
            else {
                received_ticket = request.tc;
                algorithm_mod = "cbc";
            }
        }
        else {
            received_ticket = request.t;
            algorithm_mod = "gcm";
        }

        await req.Redis.set('counter', Number(await req.Redis.get('counter')) + 1);
        const ticket = base64URL.base64_urldecode(received_ticket); // 일반 BASE64로 디코딩

        var tokenReader: Function = algorithm_mod === 'gcm' ? userToken.tokenReadGCM : userToken.tokenReadCBC;
        const JWT: userToken.JWT = tokenReader({ticket, THESPIKE_SHARED_SECRET});

        const useForVerify = {
            JWT: JWT, SIGN: SUNCYAN_THESPIKE_SIGN
        }
        if (userToken.tokenVerify(useForVerify)) {
            /**
             * 정상 발급된 토큰: 인증됨
             */
            const payload = JSON.parse(Buffer.from(JWT.payload, 'base64').toString('utf8')); //페이로드 값 추출
            await payloadHandler(payload, req);
            
            // const KEY: String = `user:${payload.uid}:data:sha`; //

            // await req.Redis.set(KEY, "hi", {EX: 10});
            // console.log(KEY + "+++++++" + await req.Redis.get(KEY));
            // console.log(await req.Redis.get("we"));
            // console.log(await req.Redis.ttl(KEY));
            
        }
        else{
            /**
             * 비정상 토큰 : 인증실패
             */
            console.log("인증실패 IP:" + requestIp.getClientIp(req));
        }
        res.send("OK.");
    }
    catch (err: any) {
        console.log("에러 발생함2" + err);
        // let mes: object = {};
        // if (typeof (err) == 'object' && err !== null) {
        //     mes = err;
        // }
        // console.log("에러 발생함2" + JSON.stringify(mes));
        res.send("NO.");
    }
});


router.post('/appverify', async (req: Request, res: Response) => {
    console.log("POST 받음");
    res.send("a");
});

module.exports = router;