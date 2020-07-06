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
    const i = this.title.indexOf(post.title);
    const I = this.votes.indexOf(post.votes);
    this.title.splice(i, 1);
    this.votes.splice(I, 1);
  });
  this.sortVotePollList();
}

  sortVotePollList() {
    this.votePollList.sort((a, b) => Number(a.votes) < Number(b.votes));
    this.gettingData() 
  }


  // bar chart
  renderChart() {
    this.title = [...new Set(this.title)];
    // var ctx = document.getElementById('canvas').getContext('2d');
    this.barchart = new Chart('canvas', {  
      type: 'bar',  
      data: {  
        labels: this.title,  
        datasets: [  
          {  
            data:this.votes,  
            backgroundColor: [  
              'rgba(153, 102, 255, 0.7)',
              'rgba(255, 99, 132, 0.7)',
              'rgba(54, 162, 235, 0.7)',
              'rgba(255, 206, 86, 0.7)',
              'rgba(75, 192, 192, 0.7)',
              'rgba(153, 02, 255, 0.7)',
              'rgba(13, 102, 255, 0.7)',
              'rgba(131, 102, 25, 0.7)',
              'rgba(313, 102, 255, 0.7)',
              'rgba(255, 159, 164, 0.7)'
            ],  
            fill: true  
          }  
        ]  
      },  
      options: {  
        maintainAspectRatio: false,
                responsive: true,
                title: {
                    display: true,
                    text: "Vote Poll",
        },
        legend: {  
          display: false,  
          position: 'bottom',
        }, 
        scales: {  
          xAxes: [{  
            display: true  ,
             ticks: {
                  fontColor: "black",
                  fontSize: 14,
                  stepSize: 1,
                  beginAtZero: true
              }
          }],  
          yAxes: [
        {               
       ticks: {
              fontColor: "black",
              fontSize: 14,
              beginAtZero: true,
              min: 0
              },
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
