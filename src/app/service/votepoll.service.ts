import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class VotePollService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) { }
   BaseURL= environment.BaseURL;
  getAllPosts() {
    return this.http.get(`${this.BaseURL}/posts`);
  }

  createPost(data) {
    return this.http.post(`${this.BaseURL}/posts`, data,{headers: this.headers});
  }
 
  upVote(id, votes) {
    return this.http.put(`${this.BaseURL}/${id}/upvote`, {votes: votes});
  }
 
  downVote(id, votes) {
    return this.http.put(`${this.BaseURL}/${id}/downvote`, {votes: votes});
  }
  deletePost(id) {
    return this.http.delete(`${this.BaseURL}/posts/${id}`);
  }
}
