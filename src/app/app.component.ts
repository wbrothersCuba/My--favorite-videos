import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { UserService } from './services/user.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'videos-angular';
  public identity: any;
  public token: any;

  constructor(
    private _userService: UserService
  ) {

  }
  ngOnInit() {
    this.loadUser()
  }


  ngDoCheck() {
    this.loadUser()
  }

  loadUser() {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

}
