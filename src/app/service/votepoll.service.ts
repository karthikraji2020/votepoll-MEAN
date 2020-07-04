import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class VotePollService {


  dataURL:string = './assets/data/questions.json';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private httpClient: HttpClient){}

  ngOnInit(){
   
  }

  getTopics() {
    return this.httpClient.get(`${this.dataURL}`, {headers: this.headers});
  }

  getQuestions() {
    return this.httpClient.get(`${this.dataURL}`, {headers: this.headers});
  }
}
