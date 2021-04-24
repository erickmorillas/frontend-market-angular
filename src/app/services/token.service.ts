import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class TokenService {

    constructor() { }

    saveToken(dataUser: any, token: string) {
        localStorage.setItem("DATA_USER", JSON.stringify(dataUser));
        localStorage.setItem("ACCESS_TOKEN", token);
    }

    getToken() {
        return localStorage.getItem('ACCESS_TOKEN');
    }

    getUser() {
        return localStorage.getItem('DATA_USER');
    }

    removeToken(): void {
        localStorage.removeItem("ACCESS_TOKEN");
        localStorage.removeItem("DATA_USER");
    }
}
