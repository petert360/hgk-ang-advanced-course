import { createReducer, on } from "@ngrx/store";
import { User } from "src/app/model/user";
import { errorItem, loadAddedItem, loadItems, loadSelectedItem, loadUpdatedItem } from "./UserActions";

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
    on(loadUpdatedItem, (state, action) => ({
        ...state,
        items: ((users): User[] => {
            const i = users.items.findIndex((item: User) => item.id === action.item.id);
            const newItems = [...users.items];
            newItems[i] = action.item;
            return newItems;
        })(state)
    })),
    on(loadAddedItem, (state, action) => ({
        ...state,
        items: (state.items as User[]).concat(action.item)
    })),
    on(errorItem, (state, action) => ({
        ...state,
        error: action.message
    })),
);

export const selectItems = (state: State) => state.users.items;
export const selectError = (state: State) => state.users.error;
export const selectOneItem = (state: State) => Object.assign({}, state.users.selected);