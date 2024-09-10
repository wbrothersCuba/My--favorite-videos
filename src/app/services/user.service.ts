import { inject, Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { User } from "../models/user";
import { global } from "./global";

@Injectable({
    providedIn: 'root'
  })
export class UserService {
    public url: string;
    public identity: any;
    public token: any;
    private localStorageKey= 'identity';
    private _http = inject(HttpClient);

    constructor() {
        this.url = global.url;
    }

    register(user:User): Observable<any> {
        let json = JSON.stringify(user);
        let params = 'json=' + json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.post(this.url + '/user/signup', params, { headers: headers });
    }

    signin(user: User, gettoken: boolean | null = null): Observable<any> {
        if (gettoken != null)
            (user as any).gettoken = "true";
        let json = JSON.stringify(user);
        let params = 'json=' + json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.post(this.url + '/user/signin', params, { headers: headers });
    }

    getIdentity() {
        let identity = JSON.parse(localStorage.getItem(this.localStorageKey)as string);
        if (identity && identity != 'undefined') {
            this.identity = identity;
        } else {
            this.identity = null;
        }
        return this.identity;
    }

    getToken() {
        let token =localStorage.getItem('token');
        if (token && token != 'undefined') {
            this.token = token;
        } else {
            this.token = null;
        }
        return this.token;
    }

    update(token:string | null , user: User ):Observable<any>{
        let json = JSON.stringify(user);
        let params = 'json=' + json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                        .set('Authorization', token!);
        return this._http.put(this.url + '/user/edit', params, { headers: headers });
    }

}