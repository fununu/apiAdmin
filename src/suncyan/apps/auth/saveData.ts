'use strict'

import { Request } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma: PrismaClient = new PrismaClient();
export interface thespikePayload {
    [key: string]: any;
}

export const funcSaveData = async (payload: thespikePayload, Request: Request)  => {
    try {
        const user_data = JSON.parse(JSON.parse(Buffer.from(payload.sav, 'base64').toString('utf8')).data);
        
        let date = new Date();
        date.setHours(date.getHours() + 9); // 한국 표준시로 적용
        
        const create_user = await prisma.cyan.upsert({
            where: { userId: payload.uid },
            create: {
                userId: payload.uid,
                name: user_data.acname,
                type: 0,
                date: date,
            },
            update: {},
        });
        await prisma.datas.upsert({
            where: { num: create_user.num },
            create: {
                num: create_user.num,
                userId: payload.uid,
                userData: user_data,
                agent: Request.get('User-Agent'),
                update: date,
            },
            update: {
                userData: user_data,
                agent: Request.get('User-Agent'),
                update: date,
            },
        });
        await prisma.datasImportant.upsert({
            where: { num: create_user.num },
            create: {
                num: create_user.num,
                os: payload.osi,
                osLanguage: payload.osl,
                language: payload.lan,
                region: payload.reg,
                userId: payload.uid,
                money: user_data.money,
                ball: BigInt(user_data.ball),
                playtime: user_data.playtime_new,
                payed: (user_data.payed === 1),
                hack: user_data.HACK,
                HACK_code: user_data.HACK_code,
                event_Sunlight: user_data.event_Sunlight,
                wintime: user_data.wintime,
                t_score: user_data.t_score,
                players: user_data.player_namelist.length,
                teamname: user_data.our_name,
                version: user_data.version,
                update: date,
            },
            update: {
                os: payload.osi,
                osLanguage: payload.osl,
                language: payload.lan,
                region: payload.reg,
                userId: payload.uid,
                money: user_data.money,
                ball: BigInt(user_data.ball),
                playtime: user_data.playtime_new,
                payed: (user_data.payed === 1),
                hack: user_data.HACK,
                HACK_code: user_data.HACK_code,
                event_Sunlight: user_data.event_Sunlight,
                wintime: user_data.wintime,
                t_score: user_data.t_score,
                players: user_data.player_namelist.length,
                teamname: user_data.our_name,
                version: user_data.version,
                update: date,
            },
        });
    }
    catch (e) {
        console.log("받은 유저 데이터 에러>>>");
        console.log(JSON.parse(JSON.parse(Buffer.from(payload.sav, 'base64').toString('utf8')).data));
        
    }
}