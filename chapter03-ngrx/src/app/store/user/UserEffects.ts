import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { UserService } from 'src/app/service/user.service';
import { addItem, ERROR_ITEM, getItems, getOneItem, LOAD_ADDED_ITEM, LOAD_ITEMS, LOAD_SELECTED_ITEM, LOAD_UPDATED_ITEM, updateItem } from './UserActions';

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
            withLatestFrom(this.store$),
            switchMap(([action, store]) => {
                // Innentől hibás az alkalmazás
                const cache = store.users?.items?.find(item => item.id === action.id);
                return cache ? of(cache) : this.userService.get(action.id);
            }),
            switchMap(user => of({ type: LOAD_SELECTED_ITEM, selected: user })),
            catchError(error => of({ type: ERROR_ITEM, message: error })),
        );
    });

    updateItem$ = createEffect((): Observable<Action> => {
        return this.actions$.pipe(
            ofType(updateItem),
            switchMap(action => this.userService.update(action.item)),
            switchMap(user => of({ type: LOAD_UPDATED_ITEM, item: user })),
            catchError(error => of({ type: ERROR_ITEM, message: error })),
        );
    });

    addItem$ = createEffect((): Observable<Action> => {
        let lastAction = null;
        return this.actions$.pipe(
            ofType(addItem),
            tap(action => lastAction = action),
            switchMap(action => this.userService.create(action.item)),
            switchMap(() => this.userService.query(`email=${lastAction.item.email}`)),
            switchMap(user => of({ type: LOAD_ADDED_ITEM, item: user })),
            catchError(error => of({ type: ERROR_ITEM, message: error })),
        );
    });



    constructor(
        private actions$: Actions,
        private userService: UserService,
        private store$: Store<any>,
    ) { }

}