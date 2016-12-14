import { Injectable } from '@angular/core';

@Injectable()
export class ICookieService {
    check(key: string): boolean { return null; }
    get(key: string): string { return null; }
    getAll(): any { return null; }
    getObject(key: string): any { return null; }
    set(key: string, value: string, expires?: number, path?: string, domain?: string, secure?: boolean): void { return null; }
    setObject(key: string, value: any, expires?: number, path?: string, domain?: string, secure?: boolean): void { return null; }
    delete(key: string, path?: string, domain?: string) { return null; }
    deleteAll(path?: string, domain?: string): any { return null; }
}

@Injectable()
export class CookieService implements ICookieService {

	/**
	 * Checks the existence of a single cookie by it's key
	 *
	 * @param  {string} key Identification of the cookie
	 * @returns existence of the cookie
	 */
    check(key: string): boolean {
        key = encodeURIComponent(key);
        let regexp = new RegExp('(?:^' + key + '|;\\s*' + key + ')=(.*?)(?:;|$)', 'g');
        let exists = regexp.test(document.cookie);
        return exists;
    }

	/**
	 * Retrieves a single cookie by it's key
	 *
	 * @param  {string} key Identification of the Cookie
	 * @returns The Cookie's value
	 */
    get(key: string): string {
        if (this.check(key)) {
            key = encodeURIComponent(key);
            let regexp = new RegExp('(?:^' + key + '|;\\s*' + key + ')=(.*?)(?:;|$)', 'g');
            let result = regexp.exec(document.cookie);
            return decodeURIComponent(result[1]);
        } else {
            return '';
        }
    }

    getObject(key: string): any {
        // smallest valid json string is 2 chars : {}
        try {
            let objStr = this.get(key);
            return (objStr === undefined || objStr.length < 2) ? null : JSON.parse(objStr);
        } catch (error) {
            return null;
        }
    }

	/**
	 * Retrieves a a list of all cookie avaiable
	 *
	 * @returns Object with all Cookies
	 */
    getAll(): any {
        let cookies: any = {};
        if (document.cookie && document.cookie !== '') {
            let split = document.cookie.split(';');
            for (let i = 0; i < split.length; i++) {
                let currCookie = split[i].split('=');
                currCookie[0] = currCookie[0].replace(/^ /, '');
                cookies[decodeURIComponent(currCookie[0])] = decodeURIComponent(currCookie[1]);
            }
        }

        return cookies;
    }

	/**
	 * Save the Cookie
	 *
	 * @param  {string} key Cookie's identification
	 * @param  {string} value Cookie's value
	 * @param  {number} expires Cookie's expiration date in days from now. If it's undefined the cookie is a session Cookie
	 * @param  {string} path Path relative to the domain where the cookie should be avaiable. Default /
	 * @param  {string} domain Domain where the cookie should be avaiable. Default current domain
	 * @param  {boolean} secure If true, the cookie will only be available through a secured connection
	 */
    set(key: string, value: string, expires?: number, path?: string, domain?: string, secure?: boolean): void {
        let cookieStr = encodeURIComponent(key) + '=' + encodeURIComponent(value) + ';';

        if (expires) {
            let dtExpires = new Date(new Date().getTime() + expires * 1000 * 60 * 60 * 24);
            cookieStr += 'expires=' + dtExpires.toUTCString() + ';';
        }
        if (path) {
            cookieStr += 'path=' + path + ';';
        }
        if (domain) {
            cookieStr += 'domain=' + domain + ';';
        }
        if (secure) {
            cookieStr += 'secure;';
        }
        document.cookie = cookieStr;
    }

    setObject(key: string, value: any, expires?: number, path?: string, domain?: string, secure?: boolean): void {
        this.set(key, JSON.stringify(value), expires, path, domain, secure);
    }

	/**
	 * Removes specified Cookie
	 *
	 * @param  {string} key Cookie's identification
	 * @param  {string} path Path relative to the domain where the cookie should be avaiable. Default /
	 * @param  {string} domain Domain where the cookie should be avaiable. Default current domain
	 */
    delete(key: string, path?: string, domain?: string) {
        // If the cookie exists
        if (this.get(key)) {
            this.set(key, '', -1, path, domain);
        }
    }

	/**
	 * Delete all cookie avaiable
	 */
    deleteAll(path?: string, domain?: string): any {
        let cookies: any = this.getAll();
        for (let key in cookies) {
            if (cookies.hasOwnProperty(key)) {
                this.delete(key, path, domain);
            }
        }

    }

}

export class MockCookieService implements ICookieService {
    data = {};
    check(key: string): boolean {
        return this.data[key] !== undefined && this.data[key] !== null;
    }
    get(key: string): string {
        return this.data[key].toString();
    }
    getAll(): any {
        return this.data;
    }
    getObject(key: string): any {
        return JSON.parse(this.get(key));
    }
    set(key: string, value: string, expires?: number, path?: string, domain?: string, secure?: boolean): void {
        this.data[key] = value;
    }
    setObject(key: string, value: any, expires?: number, path?: string, domain?: string, secure?: boolean): void {
        this.set(key, value);
    }
    delete(key: string, path?: string, domain?: string) {
        delete this.data[key];
    }
    deleteAll(path?: string, domain?: string): any {
        this.data = {};
    }
}
