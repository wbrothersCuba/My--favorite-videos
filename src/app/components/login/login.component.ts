import { Component, inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule]
})
export class LoginComponent implements OnInit {
  public page_title: string;
  public user: User;
  public identity?: User | null;
  public status: string = '';
  public token: string | null = '';

  private _userService = inject(UserService);

  constructor(
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.page_title = "Sign In";
    this.user = new User(1, '', '', '', '', 'ROLE_USER', '');
  }

  ngOnInit() {
    this.logout();
  }

  onSubmit() {
    this._userService.signin(this.user).subscribe({
      next: (data: any) => {
        if (!data.status || data.status != 'error') {
          this.status = 'success';
          this.identity = data;
          this._userService.signin(this.user, true).subscribe({
            next: (data: any) => {
              if (!data.status || data.status != 'error') {
                this.token = data;
                localStorage.setItem('token', this.token!);
                localStorage.setItem('identity', JSON.stringify(this.identity));
                this._router.navigate(['/home']);
              } else {
                this.status = 'error';
              }
            }, error: (error: any) => {
              this.status = 'error';
              console.log(error);
            }
          })

        } else {
          this.status = 'error';
        }
      }, error: (error: any) => {
        this.status = 'error';
        console.log(error);
      }
    });
  }

  logout() {
    this._route.params.subscribe(params => {
      let sure = +params['sure'];
      if (sure == 1) {
        localStorage.removeItem('identity');
        localStorage.removeItem('token');
        this.identity = null;
        this.token = null;
        this._router.navigate(['/home']);
      }
    })
  }

}
