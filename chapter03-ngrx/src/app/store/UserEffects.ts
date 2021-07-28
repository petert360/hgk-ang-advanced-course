import { Injectable } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { UserService } from '../service/user.service';
import { getItems } from './UserActions';

@Injectable()
export class UserEffect {
    // ha a UserActions esemény bekövetkezik, akkor fog ez az effect lefutni,
    loadItems$ = this.actions$.pipe(
        // megadjuk, melyik típus esetén - jelenleg getItems-re fut le
        ofType(getItems),
        switchMap(() => this.userService.get()),
        // olyan formátumra hozzuk őket, ahogy az action megköveteli.
        switchMap(users => of({ type: '[User] load items', items: users })),
        // hiba esetén az errorItems eseményt triggerlejük, és elkapjuk a hibát
        // a ''-ben lévő névnek meg kll egyeznie az esemény nevével
        catchError(error => of({ type: '[User] error item', message: error })),
    );

    constructor(
        private actions$: Actions,
        private userService: UserService,
    ) { }

}