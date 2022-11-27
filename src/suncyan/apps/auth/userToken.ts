'use strict'
/**
 * 선시안 API 표준 규격 토큰 모듈
 * 버전: 1.0.1
 */

import Crypto from 'crypto'
import Ciphers from '../../modules/normalSuncyanCiphers'

namespace T {
    export interface Token {
        ticket: string;
        SHARED_SECRET: string;
    }
    export interface encodedToken {
        token: string;
        SHARED_SECRET: string;
    }
    
    /**
     * 일반 JWT 데이터 형태
     */
    export interface JWT {
        header: string;
        payload: string;
        sign: string;
    }
}

export interface sToken {
    tokenReadGCM (token: T.Token): T.JWT;
    tokenReadCBC (token: T.Token): T.JWT;
    tokenWriteCBC_Base64 (encodedToken: T.encodedToken): {base64IV: string, base64Data: string};
    tokenVerify ({JWT, SIGN} : {JWT: T.JWT, SIGN: string}): boolean;
}
const T: sToken = {
    tokenWriteCBC_Base64: (encodedToken: T.encodedToken)=> {
        const r = Ciphers.encrypt_AES256CBC(Buffer.from(encodedToken.token), encodedToken.SHARED_SECRET);
        const base64IV: string = r.IV.toString('base64').replace(/=+$/, '');
        const base64Data: string = r.encryptedData.toString('base64').replace(/=+$/, '');
        
        return {base64IV, base64Data};
    },
    /**
     * 
     * @param token 
     * @returns 
     */
    tokenReadGCM: (token: T.Token) => {
        try {
            const token_parse: string[] = token.ticket.split('.');
            const clearToken: string[] = Ciphers.decrypt_AES256GCM(token_parse[1], token_parse[0], token_parse[2], token.SHARED_SECRET).split('.');

            const jwt: T.JWT = {
                header: clearToken[0],
                payload: clearToken[1],
                sign: clearToken[2],
            }
    
            return jwt;
        }
        catch (err) {
            console.log("암호 해독 GCM 에러발생: " + err);
            return {header: "", payload: "", sign: ""};
        }
    },
    tokenReadCBC: (token: T.Token) => {
        try {
            const token_parse: string[] = token.ticket.split('.');

            // Hmac 으로 무결성 확인 후 출력
            if (token_parse[2] === Crypto.createHmac('sha256', token.SHARED_SECRET).update(token_parse[0] + '.' +token_parse[1]).digest('base64').replace('=', '')) {
                const clearToken: string[] = Ciphers.decrypt_AES256CBC(Buffer.from(token_parse[1], 'base64'), token.SHARED_SECRET, Buffer.from(token_parse[0], 'base64')).toString('utf8').split('.');
                
                
                const jwt: T.JWT = {
                    header: clearToken[0],
                    payload: clearToken[1],
                    sign: clearToken[2],
                }
        
                return jwt;
            }
            else
                throw {message: "Hmac 키와 CBC 암호화 값이 일치하지 않음."};

        }
        catch (err: any) {
            console.log("암호 해독 CBC 에러발생: ");
            console.log(err);
            
            return {header: "", payload: "", sign: ""};
        }
    },
    tokenVerify: ({JWT, SIGN} : {JWT: T.JWT, SIGN: string}) => {
        if (JWT.sign === Crypto.createHmac('sha256', SIGN).update(JWT.header + '.' + JWT.payload).digest('base64').replace('=', '')) {
            return true;
        }
        else {
            console.log("앱 사인 일치하지 않음");
            return false;
        }
    },
    
}

export default T;