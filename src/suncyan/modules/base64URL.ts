'use strict'

export interface base64URL {
    base64_urlencode (base64_string: string): string;
    base64_urldecode (base64_url: string): string;
}
/** 
 * @param base64_string
 * @returns BASE64 인코딩된 문자열을 URL용으로 인코딩
 */
export const base64_urlencode = (base64_string: string): string => {
    return base64_string.replace(/\+/g, '-') // Convert '+' to '-'
    .replace(/\//g, '_') // Convert '/' to '_'
    .replace(/=+$/, ''); // Remove ending '='
}

/**
 * 
 * @param base64_url URL에서 받아온 BASE64 String
 * @returns 일반 BASE64 인코딩으로 변환
 */
export const base64_urldecode = (base64_url: string): string => {
    return base64_url.replace(/\-/g, '+') // Convert '-' to '+'
    .replace(/\_/g, '/'); // Convert '_' to '/'
}
const base64URL_functions: base64URL = {
    base64_urlencode: base64_urldecode,
    base64_urldecode: base64_urldecode,
}

export default base64URL_functions;