import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }
    
    register(user: User) {
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        const url = "https://api.cvc19.penciljar.studio/api/v1/auth/register/";
        return this.http.post(proxyurl + url, user);
    }
}