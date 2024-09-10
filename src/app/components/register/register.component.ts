import { Component, inject, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
})
export class RegisterComponent implements OnInit {
  public page_title: string;
  public user: User;
  public status: string = '';
  private _userService = inject(UserService);

  constructor() {
    this.page_title = "Sign Up";
    this.user = new User(1, '', '', '', '', 'ROLE_USER', '');
  }

  ngOnInit() {

  }

  onSubmit() {
    this._userService.register(this.user).subscribe({
      next: (data: any) => {
        if(data.status  = 'success')
        {
          this.status = 'success';
         // form.reset();
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
