import { Component, inject,  OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'
import { UserService } from '../../services/user.service';
import { Video } from '../../models/video';
import { VideoService } from '../../services/video.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-video-edit',
  templateUrl: '../video-new/video-new.component.html',
  styleUrls: ['./video-edit.component.css'],
  standalone: true,
  providers: [UserService, VideoService],
  imports: [CommonModule, FormsModule, RouterModule],
})
export class VideoEditComponent implements OnInit {
  public page_title: string;
  public identity;
  public token:string | null = '';
  public video?: Video;
  public status: string='';

  private _userService = inject(UserService);
  private _route = inject(ActivatedRoute);
  private _router = inject(Router);
  private _videosService = inject(VideoService);

  constructor() {
    this.page_title = 'Edit a favorite video';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit() {
    this.video = new Video(1, this.identity!.id, '', '', '', '', null, null);
    this.getVideo();
  }

  getVideo() {
    this._route.params.subscribe(params => {
      var id = +params['id'];
      this._videosService.getVideo(this.token!, id).subscribe({
        next: (data: any) => {
          if (data.status == 'success') {
            this.video = data.video;
          }else{
            this._router.navigate(['/home']);
          }
        }, error: (error: any) => {
          console.log(error);
        }
    });
    });
  }

  onSubmit(){
    this._videosService.update(this.token!, this.video!).subscribe({
      next: (data: any) => {
        if (data.status = 'success') {
          this.status = 'success';
          //form.reset();
          this._router.navigate(['/home']);
        } else {
          this.status = 'error';
        }
      }, error: (error: any) => {
        this.status = 'error';
        console.log(error);
      }
  });
  }

}
