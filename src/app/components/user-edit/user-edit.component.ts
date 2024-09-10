import { Component, inject, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  standalone: true,
  providers: [UserService],
  imports: [CommonModule, FormsModule, RouterModule],
})
export class UserEditComponent implements OnInit {
  public page_title: string;
  public user: User;
  public status: string='';
  public identity: any;
  public token;
  private _userService = inject(UserService);

  constructor() {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.page_title = 'User settings';
    this.user = new User(this.identity.sub,
      this.identity.name,
      this.identity.surname,
      this.identity.email,
      '',
      'ROLE_USER',
      '');
  }

  ngOnInit() {
  }

  onSubmit() {
    this._userService.update(this.token, this.user).subscribe({
      next: (data: any)  => {
        if (data && data.status == 'success') {
          this.status = "success";
          this.identity = data.user;
          this.user = data.user;
          localStorage.setItem('identity', JSON.stringify(this.identity));
        }else{
          this.status = "error"
        }
      }, error: (error: any) => {
        this.status = "error",
        console.log(error);
      },
  });
  }

}
