import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class VotePollService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) { }

  getAllPosts() {
    return this.http.get('/api/posts');
  }
  // createPost(data) {
  //   return this.http.post('/api/posts',  data);
  // }
  createPost(data) {
    return this.http.post('https://votepollsystem.herokuapp.com/testapi/posts', data,{headers: this.headers});
  }
 
  upVote(id, votes) {
    return this.http.put(`/api/posts/${id}/upvote`, {votes: votes});
  }
 
  downVote(id, votes) {
    return this.http.put(`/api/posts/${id}/downvote`, {votes: votes});
  }
  deletePost(id) {
    return this.http.delete(`/api/posts/${id}`);
  }
}
