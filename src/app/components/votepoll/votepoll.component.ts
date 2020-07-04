import { Component, OnInit } from '@angular/core';
import { VotePollService } from 'src/app/service/votepoll.service';
import { Post } from 'src/app/service/models/Post.interface';

@Component({
  selector: 'app-votepoll',
  templateUrl: './votepoll.component.html',
  styleUrls: ['./votepoll.component.css']
})
export class VotepollComponent implements OnInit {

  postList;

  post = {
    title: '',
    url: ''
  };
  
  constructor(private postsService: VotePollService) {
  }

  ngOnInit() {
    this.getAllPosts();
  }
  getAllPosts()
  {
    this.postsService.getAllPosts().subscribe((data: Post[]) => {
      this.postList = data;
    });
  }
  addPost() {
    const newPost = {
      title: this.post.title,
      url: this.post.url,
    };
    this.postsService.createPost(newPost).subscribe((data: Post) => {
      this.postList.push(data);
      this.sortPosts();
    }, (err) => console.log(err));
    this.post = { title: '', url: ''};
  }
  upVote(post) {
    const thePost = this.postList.find(itm => post._id === itm._id);
    thePost.votes = thePost.votes + 1;
    this.postsService.upVote(post._id, post.votes).subscribe((data: Post) => {
    // this.postsService.upVote(post).subscribe((data: Post) => {
      // console.log(data);
    });
    this.sortPosts();
  }
  downVote(post) {
    const thePost = this.postList.find(itm => post._id === itm._id);
    thePost.votes = thePost.votes - 1;
      this.postsService.upVote(post._id, post.votes).subscribe((data: Post) => {
      // console.log(data);
    });
    this.sortPosts();
  }
  deletePost(post) {
    this.postsService.deletePost(post._id).subscribe((data: Post) => {
    const index = this.postList.indexOf(post);
    this.postList.splice(index, 1);
  });
}
  sortPosts() {
    this.postList.sort((a, b) => Number(a.votes) < Number(b.votes));
  }
}
