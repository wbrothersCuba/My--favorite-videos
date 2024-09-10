import { inject, Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { Video } from "../models/video";
import { global } from "./global";


@Injectable()
export class VideoService {
    public url: string;
    private _http = inject(HttpClient);

    constructor( ) {
        this.url = global.url;
    }

    create(token: string | null, video: Video): Observable<any> {
        video.url= video.url.indexOf("&")!= -1 ? video.url.slice(0 ,video.url.indexOf("&")): video.url;
        let json = JSON.stringify(video);
        let params = 'json=' + json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Authorization', token!);
        return this._http.post(this.url + '/video/new', params, { headers: headers });
    }

    getVideos(token:string, page: number): Observable<any> {
        if (!page)
            page = 1;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Authorization', token);
        return this._http.get(this.url + '/video/list?page='+page, { headers: headers });
    }

    getVideo(token:string, id:Number): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Authorization', token);
        return this._http.get(this.url + '/video/detail/' + id, { headers: headers });
    }

    update(token:string, video: Video): Observable<any> {
        video.url= video.url.indexOf("&")!= -1 ? video.url.slice(0 ,video.url.indexOf("&")): video.url;
        let json = JSON.stringify(video);
        let params = 'json=' + json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Authorization', token);
        return this._http.put(this.url + '/video/edit/' + video.id, params, { headers: headers });
    }

    delete(token:string, id: number): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Authorization', token);
        return this._http.delete(this.url +'/video/remove/' + id, { headers: headers });
    }

}