import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { ResponseData } from '../../models/userData';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onRegisterSubmit(registerForm) {

    if (!registerForm.valid) {
      this.flashMessage.show('Please fill in all fields', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }

    const user = registerForm.value;

    const emailIsValid = this.validateService.validateEmail(user.email);
    if (!emailIsValid) {
      this.flashMessage.show('Please enter a valid email', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }

    this.authService.registerUser(user).subscribe((data: ResponseData) => {
      console.log('data:', data);
      if (data.success) {
        this.flashMessage.show('You are now registered, and can login', { cssClass: 'alert-success', timeout: 5000 });
        this.router.navigate(['/login']);

      } else {
        this.flashMessage.show('Somthing went wrong', { cssClass: 'alert-danger', timeout: 5000 });
        this.router.navigate(['/register']);

      }
    });

    return true;
  }
}
