import {createSlice, PayloadAction} from '@reduxjs/toolkit'
export interface CredentialState {
    username: string;
    password: string;
}

const initialState: CredentialState = {
    username: '',
    password: '',
};

export const credentialSlice = createSlice({
    name: 'credential',
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<CredentialState>) => {
            state.username = action.payload.username;
            state.password = action.payload.password;
            return state;
        },
        resetCredentials: (state) => {
            state = initialState;
            return state;
        }
    }
});

export const {setCredentials, resetCredentials} = credentialSlice.actions;
export default credentialSlice.reducer;
