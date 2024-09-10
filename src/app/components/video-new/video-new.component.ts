import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router'
import { UserService } from '../../services/user.service';
import { Video } from '../../models/video';
import { VideoService } from '../../services/video.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-video-new',
  templateUrl: './video-new.component.html',
  styleUrls: ['./video-new.component.css'],
  standalone: true,
  providers: [UserService, VideoService],
  imports: [CommonModule, FormsModule, RouterModule],
})
export class VideoNewComponent implements OnInit {
public page_title: string;
public identity;
public token: string | null = '';
public video: Video;
public status: string = '';

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _videosService: VideoService
  ) {
    this.page_title= 'Add a favorite video';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.video = new Video(1,Number(this.identity!.id),'','','','',null,null);
   }

  ngOnInit() {
  }

  onSubmit(/*form*/){
    this._videosService.create( this.token,this.video).subscribe({
      next: (data: any) => {
        if(data.status = 'success')
        {
          this.status = 'success';
          //form.reset();
          this._router.navigate(['/home']);
        }else{
          this.status = 'error';
        }
      }, error: (error: any) => {
        this.status = 'error';
        console.log(error);
      }
  });
  }
}
