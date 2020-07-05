import { Component, OnInit } from '@angular/core';
import { VotePollService } from 'src/app/service/votepoll.service';
import { VotePoll } from 'src/app/service/models/Post.interface';
import { Data } from 'src/app/service/models/Data.interface.';
// import { BarchartComponent } from '../barchart/barchart.component';
import { Chart } from 'chart.js'; 
@Component({
  selector: 'app-votepoll',
  templateUrl: './votepoll.component.html',
  styleUrls: ['./votepoll.component.css']
})
export class VotepollComponent implements OnInit {
  data: Data[];  
  votes = [];  
  title = [];  
  barchart :any;  
  votePollList:any;  

  post = {
    title: '',
    url: ''
  };

  constructor(private votePollService: VotePollService) {
  }

  ngOnInit() {
    this.getAllPosts();
  }

  getAllPosts()
  {
    this.votePollService.getAllPosts().subscribe((data: VotePoll[]) => {
      this.votePollList = data;
    this.gettingData();

    });
  }

  addPost() {
    const newPost = {
      title: this.post.title,
      url: this.post.url,
    };
    this.votePollService.createPost(newPost).subscribe((data: VotePoll) => {
      this.votePollList.push(data);
      this.sortVotePollList();
    }, (err) => console.log(err));
    this.post = { title: '', url: ''};
  }

  upVote(post) {
    const thePost = this.votePollList.find(itm => post._id === itm._id);
    thePost.votes = thePost.votes + 1;
    this.votePollService.upVote(post._id, post.votes).subscribe((data: VotePoll) => {
      console.log(data);
    });
   
    this.sortVotePollList();
  }

  downVote(post) {
    const thePost = this.votePollList.find(itm => post._id === itm._id);
    thePost.votes = thePost.votes - 1;
      this.votePollService.upVote(post._id, post.votes).subscribe((data: VotePoll) => {
    });
    this.sortVotePollList();
  }
  
  deletePost(post) {
    this.votePollService.deletePost(post._id).subscribe((data: VotePoll) => {
    const index = this.votePollList.indexOf(post);
    this.votePollList.splice(index, 1);
    this.title.splice(index, 1);
  });
  this.sortVotePollList();
}

  sortVotePollList() {
    this.votePollList.sort((a, b) => Number(a.votes) < Number(b.votes));
    this.gettingData() 
  }


  // bar chart
  renderChart() {
    debugger;
    this.title = [...new Set(this.title)];
    // this.title = [...new Set(this.votePollList.map((x)=>{return x._id}))];
    // this.title = this.votePollList.filter((item)=>{item.id===title})
    // this.votes = [...new Set(this.votes)];
    this.barchart = new Chart('canvas', {  
      type: 'bar',  
      data: {  
        labels: this.title,  
        datasets: [  
          {  
            data:this.votes,  
            borderColor: '#3cba9f',  
            backgroundColor: [  
              "#3cb371",  
              "#0000FF",  
              "#9966FF",  
              "#4C4CFF",  
              "#00FFFF",  
              "#f990a7",  
              "#aad2ed",  
              "#FF00FF",  
              "Blue",  
              "Red",  
              "Blue"  
            ],  
            fill: true  
          }  
        ]  
      },  
      options: {  
        legend: {  
          display: false  
        },  
        scales: {  
          xAxes: [{  
            display: true  
          }],  
          yAxes: [{  
            display: true  
          }],  
        }  
      }  
    });  
  }

  gettingData() {
    this.title=[];
    this.votes=[];
    this.votePollList.forEach(x => {  
        this.title.push(x.title);  
        this.votes.push(x.votes);  
    });
  
    this.renderChart();
    this.updateChart();
  }

  updateChart () {
    this.barchart.update({
      duration: 1200,
      easing: 'easeOutBounce'
  })
  }

}
