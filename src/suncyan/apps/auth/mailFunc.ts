'use strict'

import { Request } from 'express'
import { PrismaClient } from '@prisma/client'
import crypto from 'crypto'

const prisma = new PrismaClient()
export interface thespikePayload {
    [key: string]: any;
}

export const mailFunc = async (payload: thespikePayload, Request: Request)  => {
    switch (payload.fnc) {
        case 'getMailList':
            getMailList(payload, Request);
            break; 
        case 'sendMail' :
            sendMail(payload, Request);
            break;
    }
}

const getMailList = async (payload: thespikePayload, Request: Request)  => {
    const a = await prisma.mailBox.findMany({

    })
}

const sendMail = async (payload: thespikePayload, Request: Request)  => {
    let date = new Date();
    date.setHours(date.getHours() + 9); // 한국 표준시로 적용
    try {
        const mail_id: string = "tsp-" + Math.random().toString(18).slice(2).toUpperCase();
        const a = await prisma.mailBox.create({
            data: {
                userId: payload.uid,
                mailId: mail_id,
                message: payload.data.message,
                item: payload.data.item,
                sender: payload.data.sender,
                state: 0,
                date: date,
            },
        })
    }
    catch (err) {
        console.error(err);
        console.log("mailData 값 결여 혹은 userId겹침");
        return "mailData 값 결여 혹은 userId겹침";
    }
}
