import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Issue } from '../models/issue'

@Injectable({
  providedIn: 'root'
})
export class IssueService {

  constructor(private http: HttpClient) { }
    
    createIssue(issue: Issue, auth_token: string) {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Token '+auth_token
        });
        let options = { headers: headers };
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        const url = "https://api.cvc19.penciljar.studio/api/v1/issues/";
        return this.http.post(proxyurl + url,issue,options);
    }
}
