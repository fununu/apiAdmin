'use strict'

import { Request, Response, NextFunction } from 'express';
import { request } from 'http';
import Redis from 'redis';
import { createClient, createCluster } from 'redis'
require('dotenv').config();

let is_Cluster: boolean = true;

const redis = createCluster({rootNodes: [ { url: process.env.REDIS_URL } ]});

/**
 * (클러스터가 없을 경우 마스터에 접속)
 */
const redis_cli = createClient({url: process.env.REDIS_URL,});


const connect = async () => {
    try {
        await redis.connect();
    }
    catch (err) {
        is_Cluster = false;
        try {
            await redis_cli.connect();
        }
        catch (err) {
            console.log("서버 기동 실패.  REDIS 서버 접속 실패" + err);
            throw {code: "-003", message: "서버 기동 실패: REDIS 서버 접속 실패."};
        }
        console.error(err);
        console.log("대체 서버 접속 시도 >");
    }
}

const middleware  = (req: Request, res: Response, next: NextFunction) => {
    if (is_Cluster) {
        // 문제 없이 정상 Redis Cluster에 접속함.
        req.Redis = redis;
    }
    else {
        // 테스트 환경 또는 Redis 가 Standalone일 경우.
        req.Redis = redis_cli;
    }   
    next();
}


export default {middleware, connect}
