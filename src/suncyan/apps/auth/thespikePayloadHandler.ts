'use strict'

import { Request } from 'express'
import { PrismaClient } from '@prisma/client'

import { funcSaveData } from './saveData';
import { mailFunc } from './mailFunc'; 

const prisma: PrismaClient = new PrismaClient();
export interface thespikePayload {
    [key: string]: any;
}

export const payloadHandler = async (payload: thespikePayload, Request: Request)  => {
    if (payload.fnc == "test") {
        console.log("테스트연결 완료");
    }
    Request.Redis.set(`user:${payload.uid}:key`, "online", {EX: 3600});
    
    mailFunc(payload, Request);
    
    if (payload.fnc == "anal") {
        funcSaveData(payload, Request);
        //console.log(`인증되었습니다. [UID: ${user_data.uid}:${payload.uid}]`);
    }    
}
