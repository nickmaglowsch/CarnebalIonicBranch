import { Observable } from 'rxjs/Observable';
import { MyApp } from './../../app/app.component';
import { User } from './user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthProvider {
    currentUser: User;
    constructor(public http: HttpClient) {
    }

    public login(cpf, senha) {
        let loginData = new FormData();
        loginData.append('cpf', cpf);
        loginData.append('senha', senha);
        return Observable.create(
            observer => {
                this.http.post(MyApp.URL + 'login.php', loginData)
                    .subscribe(
                        data => {
                            if (data !== 0) {
                                this.currentUser = new User(data[0].cdFuncionario, data[0].foto, data[0].primeiroLogin, data[0].nomeFuncionario);
                            }
                            observer.next(data);
                            observer.complete();
                        });

            }
        )
    }

    public firstLogin(cpf, senha) {
        let loginData = new FormData();
        loginData.append('cpf', cpf);
        loginData.append('senha', senha);
        return Observable.create(
            observer => {
                this.http.post(MyApp.URL + 'firstLogin.php', loginData)
                    .subscribe(
                        data => {
                            if (data !== 0) {
                                this.currentUser = new User(data[0].cdFuncionario, data[0].foto, data[0].primeiroLogin, data[0].nomeFuncionario);
                            }
                            observer.next(data);
                            observer.complete();
                        });

            }
        )
    }

    public getUserInfo(): User {
        return this.currentUser;
    }



}
