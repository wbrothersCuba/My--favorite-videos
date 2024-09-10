import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { VideoService } from '../../services/video.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  providers: [UserService, VideoService],
  imports: [CommonModule, FormsModule, RouterModule]
})
export class HomeComponent implements OnInit {
  public page_title: string;
  public identity?: any;
  public token: string | null = '';
  public status: string = '';
  public videos: any;
  public page?: number;
  public next_page?: number;
  public prev_page?: number;
  public number_pages?: number[];


  private _userService = inject(UserService);
  private _videoService = inject(VideoService);
  private _route = inject(ActivatedRoute);
  private _router = inject(Router);

  constructor() {
    this.page_title = "My Favorite Videos";
  }


  ngOnInit() {
    this.loadUser();
    this.actualPageVideos();
  }

  actualPageVideos() {
    this._route.params.subscribe(params => {
      var page = +params['page'];
      console.log(params['videos']);
      if (!page) {
        page = 1;
        this.prev_page = 1
        this.next_page = 2;
      }
      this.getVideos(page);
    });
  }

  loadUser() {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  getVideos(page: number) {
    this._videoService.getVideos(this.token!, page).subscribe({
      next: (data: any) => {
        if (data.status == 'success') {
          this.videos = data.videos;
          var number_pages = [];
          for (var i = 1; i <= data.total_pages; i++) {
            number_pages.push(i);
          }
          this.number_pages = number_pages;
          if (page >= 2) {
            this.prev_page = page - 1;
          } else {
            this.prev_page = 1;
          }
          if (page < data.total_pages) {
            this.next_page = page + 1;
          } else {
            this.next_page = data.total_pages;
          }
        }
      }, error: (error: any) => {
        this.status = 'error';
        console.log(error);
      }
    });
  }

  getThumb(url: string, size = null) {
    var video, results, thumburl;
    if (url === null) {
      return '';
    }
    results = url.match('[\\?&]v=([^&#]*)');
    video = (results === null) ? url : results[1];
    if (size != null) {
      thumburl = 'http://img.youtube.com/vi/' + video + '/' + size + '.jpg';
    } else {
      thumburl = 'http://img.youtube.com/vi/' + video + '/mqdefault.jpg';
    }
    return thumburl;
  }

  deleteVideo(id: number) {
    this._videoService.delete(this.token!, id).subscribe({
      next: (data: any) => {
        this.actualPageVideos();
        this._router.navigate(['/home']);
      }, error: (error: any) => {
        console.log(error)
      }
    })
  }

}
