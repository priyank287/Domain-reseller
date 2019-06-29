import { FormGroup, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { FormBuilder } from "@angular/forms";
import { CheckService } from "./check.service";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  public answer = [];
  avail: boolean;

  constructor(
    private _formBuilder: FormBuilder,
    private _checkService: CheckService,
    private _http: HttpClient
  ) {
    console.log("service working fine");
  }

  registrationForm: FormGroup;

  submitted = false;

  ngOnInit() {
    this.registrationForm = this._formBuilder.group({
      domainName: ["", Validators.required]
    });
  }

  onsubmit() {
    this.submitted = true;

    if (this.registrationForm.invalid) {
      return alert("empty input!");
    }

    this._checkService
      .getAnswer(this.registrationForm.value.domainName)
      .subscribe(data => {
        this.answer = data;
        console.log(data.availability[this.registrationForm.value.domainName]);
        if (data.availability[this.registrationForm.value.domainName]) {
          this.avail = true;
        } else {
          this.avail = false;
        }
      });
  }
}
