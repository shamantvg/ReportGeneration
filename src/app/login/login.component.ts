import { Component, OnInit } from '@angular/core';
import { FieldsService } from '../fields.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import * as $ from "jquery";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private FieldsList: FieldsService, private router: Router) { }

  error: string = null;

  adminLogin(form: NgForm) {
    this.error = null;

    let adminId = $("#adminId").val();
    let pswd = $("#pswd").val();
    //alert(b_date);
    //alert(reg_name);
    if ((adminId === "SG00681675") && (pswd === "Shamant@123")) {
      //console.log(form.value);
      localStorage.setItem('admiinDetails', JSON.stringify(form.value));
      this.router.navigateByUrl('/home-page');
    }
    else {
      this.error = "Invalid Admin Id or Password.";
    }


    //this.FieldsList.regerateRoport(form.value).subscribe(data => {
    //console.log(data);
    //this.router.navigateByUrl('/studentlogin');
    //form.reset();
    //}, err => {
    // console.log(err);
    //});

    //var generate_res = this.FieldsList.regerateRoport(form.value);
    //console.log("Renerate reporting is working.");
    //console.log("Returun value--->"+generate_res);
    //var obj_generate = JSON.parse(generate_res);
    //this.generate_response = obj_generate;
    //this.ReportLink = obj_generate.Message;

    /*this.error = null;
    console.log(form.value);
    this.auth.loginadmin(form.value).subscribe(data => {
      console.log('Response of login', data);
      if (data && data.description === 'Login successfull') {
        localStorage.setItem('userDetails' , JSON.stringify(data));
        this.router.navigateByUrl('/adminhomepage');
      }
      form.reset();
    }, err => {
      console.log(err);
      this.error = err.error.message;

    });*/

  }


  ngOnInit(): void {
  }

}
