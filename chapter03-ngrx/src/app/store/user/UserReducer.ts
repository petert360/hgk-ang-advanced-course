import { createReducer, on } from "@ngrx/store";
import { User } from "src/app/model/user";
import { errorFlush, errorItem, loadAddedItem, loadItems, loadSelectedItem, loadUpdatedItem, removeDeletedItem } from "./UserActions";

// megmondjuk, hogy a state milyen adatokat tároljon
// Userek tömbjét és hibákat
// kiegészítjük a selecteddel
export interface State {
    // s: string kulccsal bármilyen értéket fel tudunk venni a state-ben.
    [x: string]: any;
    users: { items: User[], selected?: User, error: any };
}

// létrehozzuk az initial state-et
export const initialState: State = {
    users: { items: [], error: null }
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
    on(removeDeletedItem, (state, action) => ({
        ...state,
        items: (state.items as User[]).filter(item => item.id !== action.item.id)
    })),
    on(errorItem, (state, action) => ({
        ...state,
        error: action.error
    })),
    on(errorFlush, (state, action) => ({
        ...state,
        error: null
    })),
);

export const selectItems = (state: State) => state.users.items;
export const selectError = (state: State) => state.users.error?.error;
export const selectOneItem = (state: State) => Object.assign({}, state.users.selected);