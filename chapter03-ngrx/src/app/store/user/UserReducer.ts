import { createReducer, on } from "@ngrx/store";
import { User } from "src/app/model/user";
import { errorItem, loadItems } from "./UserActions";

// megmondjuk, hogy a state milyen adatokat tároljon
// Userek tömbjét és hibákat
export interface State {
    users: { items: User[], error: string };
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
    on(errorItem, (state, action) => ({
        ...state,
        error: action.message
    })),
);

export const selectItems = (state: State) => state.users.items;
export const selectError = (state: State) => state.users.error;