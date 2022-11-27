// Loader 기능

import expressLoader from './express';
import { PrismaClient } from '@prisma/client';
import redis from './modules/redis'

export default async ( expressApp: any ) => {

    const prisma: PrismaClient = new PrismaClient();
    console.log("Prisma 로드 중...");
    await prisma.$connect();
    console.log("Prisma 문제없음...OK");

    console.log("REDIS 로드 중...");
    await redis.connect();
    console.log("REDIS 문제없음...OK");

    console.log("Express 로드중...");
    const app = await expressLoader({app: expressApp});
    console.log("Express Loaded...OK");
};
