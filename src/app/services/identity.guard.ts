import { inject ,Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { UserService } from "./user.service";

@Injectable()
export class IdentityGuard implements CanActivate{

    private _router = inject(Router);
    private _userService= inject(UserService);

    constructor(){}

    canActivate(){
        let identity = this._userService.getIdentity();
        if(identity)
            return true;
        else{
            this._router.navigate(['/signin']);
        return false;
        }
    }
}