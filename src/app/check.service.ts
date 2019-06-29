import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";
import { HttpParams } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class CheckService {
  constructor(private http: HttpClient) {}

  getAnswer(dname: string): Observable<any> {
    const headers = new HttpHeaders()
      .set("X-RapidAPI-Host", "pointsdb-bulk-domain-check-v1.p.rapidapi.com")
      .set(
        "X-RapidAPI-Key",
        "51f73a205emsh03de5d2fec02455p19d2c3jsn8ebdaba1b255"
      );
    const params = new HttpParams().set("domains", dname);

    return this.http.get(
      "https://pointsdb-bulk-domain-check-v1.p.rapidapi.com/domain_check",
      { headers: headers, params: params }
    );
  }
}
