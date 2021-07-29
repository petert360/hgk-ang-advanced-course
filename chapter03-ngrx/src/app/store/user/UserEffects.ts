import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { UserService } from 'src/app/service/user.service';
import { ERROR_ITEM, getItems, getOneItem, LOAD_ITEMS, LOAD_SELECTED_ITEM } from './UserActions';

@Injectable()
export class UserEffect {
    // létrehozunk egy creatEffect fv-t:
    loadItems$ = createEffect((): Observable<Action> => {
        return this.actions$.pipe(
            // megadjuk, melyik típus esetén - jelenleg getItems-re fut le
            ofType(getItems),
            switchMap(() => this.userService.get()),
            // olyan formátumra hozzuk őket, ahogy az action megköveteli.
            switchMap(users => of({ type: LOAD_ITEMS, items: users })),
            // hiba esetén az errorItems eseményt triggerlejük, és elkapjuk a hibát
            // a ''-ben lévő névnek meg kll egyeznie az esemény nevével
            catchError(error => of({ type: ERROR_ITEM, message: error })),
        );
    });

    getOneItem$ = createEffect((): Observable<Action> => {
        return this.actions$.pipe(
            ofType(getOneItem),
            switchMap(action => this.userService.get(action.id)),
            switchMap(user => of({ type: LOAD_SELECTED_ITEM, selected: user })),
            catchError(error => of({ type: ERROR_ITEM, message: error })),
        );
    });

    constructor(
        private actions$: Actions,
        private userService: UserService,
    ) { }

}