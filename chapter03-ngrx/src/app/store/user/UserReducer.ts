import { createReducer, on } from "@ngrx/store";
import { User } from "src/app/model/user";
import { errorItem, loadItems, loadSelectedItem } from "./UserActions";

// megmondjuk, hogy a state milyen adatokat tároljon
// Userek tömbjét és hibákat
// kiegészítjük a selecteddel
export interface State {
    // s: string kulccsal bármilyen értéket fel tudunk venni a state-ben.
    [x: string]: any;
    users: { items: User[], selected?: User, error: string };
}

// létrehozzuk az initial state-et
export const initialState: State = {
    users: { items: [], error: '' }
};

export const UserReducer = createReducer(
    initialState,
    on(loadItems, (state, action) => ({
        ...state,
        items: action.items
    })),
    on(loadSelectedItem, (state, action) => ({
        ...state,
        selected: action.selected
    })),
    on(errorItem, (state, action) => ({
        ...state,
        error: action.message
    })),
);

export const selectItems = (state: State) => state.users.items;
export const selectError = (state: State) => state.users.error;
export const selectOneItem = (state: State) => Object.assign({}, state.users.selected);