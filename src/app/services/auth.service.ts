import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, first, tap } from 'rxjs/operators';

import { User } from '../models/User';
import { ErrorHandlerService } from './error-handler.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = "http://localhost:3000/auth";

  isUserLoggedIn$ = new BehaviorSubject<boolean>(false);
  userId: Pick<User, "aid"> | undefined;

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  constructor(
    private http: HttpClient, 
    private errorHandlerService: ErrorHandlerService,
    private router: Router) {}

    signup(user: Omit<User, "aid">): Observable<User> {
      return this.http
      .post<User>(`${this.url}/signup`, user, this.httpOptions)
      .pipe(
        first(),
        tap(() => {
          this.router.navigate(['/']);
        }),
        catchError(this.errorHandlerService.handlerError<User>("signup"))
      );
  }
  
  login(
    email: Pick<User, "email">,
    password: Pick<User, "password">
  ): Observable<{
    token: string;
    userId: Pick<User, "aid">;
  }> {
    return this.http
      .post<{ token: string; userId: Pick<User, "aid"> }>(`${this.url}/login`, { email, password }, this.httpOptions)
      .pipe(
        first(),
        tap((tokenObject) => {
          this.userId = tokenObject.userId;
          localStorage.setItem("token", tokenObject.token);
          this.isUserLoggedIn$.next(true);
          this.router.navigate(["posts"]);
          // this.router.navigate(["posts"], { queryParams: { userId: tokenObject.userId } });
        }),
        catchError(
          this.errorHandlerService.handlerError<{
            token: string;
            userId: Pick<User, "aid">;
          }>("login")
        )
      );
  }

  getCurrentUser(): Observable<any[]> {
    return this.http.get<any[]>(this.url);
  }
}
