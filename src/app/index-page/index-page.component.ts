import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";
import { FieldsService } from '../fields.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ExcelService } from '../excel.service';

@Component({
  selector: 'app-index-page',
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.css']
})
export class IndexPageComponent implements OnInit {

  constructor(private FieldsList: FieldsService, private router: Router, private excelService: ExcelService) {

  }

  submitted = false;
  generate_response = null;
  ReportLink = null;
  errMsg = null;

  log(x) {
    //console.log(x)
  }

  onSubmit(form: NgForm) {
    this.errMsg = null;
    //console.log(form.value);
    //this.FieldsList.regerateRoport(form.value).subscribe(data => {
    //console.log(data);
    //this.router.navigateByUrl('/studentlogin');
    //form.reset();
    //}, err => {
    // console.log(err);
    //});

    let dateType = 'none';
    if ($('input[name=dateType]:checked').val() != null) {
      dateType = $('input[name=dateType]:checked').val();
      //console.log("dateType----->" + dateType);

      if (dateType === "Onetime" && ($('#datetimepicker_oneTime_input').val() === "")) {
        // console.log("dateType Condition----->Onetime C");
        this.errMsg = "Please select Date&time";
        return false;
      } else if (dateType === "Recurring" &&
        (($('#datetimepicker_RecurringFrom_input').val() === "")
          || ($('#datetimepicker_RecurringTo_input').val() === ""))) {
        this.errMsg = "Both recurring dates are required.";
        return false;
        //console.log("dateType Condition----->Recurring C");
      }

    } else {
      this.errMsg = "Please select any date and time.";
      return false;
    }
    console.log("form.value--->."+JSON.stringify(form.value));
    var generate_res = this.FieldsList.regerateRoport(form.value);
    //console.log("Renerate reporting is working.");
    //console.log("Returun value--->" + generate_res);
    var obj_generate = JSON.parse(generate_res);
    this.generate_response = obj_generate;
    this.ReportLink = obj_generate.Message;


  }


  fld_list_json = null;
  countries = null;
  filters = null;

  title = 'Result : Page';

  reg_submit() {
    let reg_name = $("#reg_name").val();
    let b_date = $("#b_date").val();
    //alert(b_date);
    //alert(reg_name);
    if ((reg_name === "123") && (b_date === "2020-03-16")) {
      window.location.assign("./home-page");
    }
    else {
      alert("Invalid Registration details.");
    }
  }





  ngOnInit(): void {

    this.errMsg = null;
    //console.log("datetimepicker set");
    // $("#datepicker1").datetimepicker({
    //   autoclose: true,
    //   todayHighlight: true
    // }).datepicker('update', new Date());
    //$('#datepicker1').datetimepicker();
    this.isLoggedIn();
  }

  getFieldsList(): void {

    var res = this.FieldsList.getFields();
    //console.log("result");
    //console.log("value--->" + res);
    var obj = JSON.parse(res);
    this.fld_list_json = obj;
    this.countries = [{
      id: 'field 1',
      name: 'field 1',
      code: 'field 1'
    },
    {
      id: 'field 2',
      name: 'field 2',
      code: 'field 2'
    },
    {
      id: 'field 3',
      name: 'field 3',
      code: 'field 3'
    },
    {
      id: 'field 4',
      name: 'field 4',
      code: 'field 4'
    },
    {
      id: 'field 5',
      name: 'field 5',
      code: 'field 5'
    },
    {
      id: 'field 6',
      name: 'field 6',
      code: 'field 6'
    }];

    this.filters = [{
      id: 'filters 1',
      name: 'filters 1',
      code: 'filters 1'
    },
    {
      id: 'filters 2',
      name: 'filters 2',
      code: 'filters 2'
    },
    {
      id: 'filters 3',
      name: 'filters 3',
      code: 'filters 3'
    }];
  }

  exportData: any = [{
    eid: 'TM001',
    ename: 'Ravi',
    esal: 1000
  }, {
    eid: 'TM002',
    ename: 'Rajesh',
    esal: 2000
  }, {
    eid: 'TM003',
    ename: 'Rama',
    esal: 3000
  }];

  isLoggedIn(): boolean {
    const userDetails = JSON.parse(localStorage.getItem('admiinDetails'));
    if (userDetails) {
      this.getFieldsList();
      return true;
    } else {
      this.router.navigateByUrl('/login');
      //return false;
    }
  }

  logout() {
    localStorage.removeItem('admiinDetails');
    this.router.navigateByUrl('/login');
  }
  reload_home() {
    this.router.navigateByUrl('/home-page');
  }
  load_contact() {
    this.router.navigateByUrl('/contact');
  }
  load_faq() {
    this.router.navigateByUrl('/faq');
  }
  load_about() {
    this.router.navigateByUrl('/about');
  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.exportData, 'Report-Generation');
  }

}


