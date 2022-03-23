import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	updateProfile,
} from 'firebase/auth';
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../service/firebaseConfig';

export const signUp = createAsyncThunk(
	'authData/signUp',
	async ({ email, password, userName }, { rejectWithValue }) => {
		try {
			let response = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);
			updateProfile(auth.currentUser, { displayName: userName });
			await setDoc(doc(db, 'users', response.user.uid), {
				userName: userName,
				uid: response.user.uid,
				createdAt: new Date(),
				isOnline: true,
			});
			const loggedInUser = {
				userName: userName,
				uid: response.user.uid,
				email: email,
			};
			return loggedInUser;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const signIn = createAsyncThunk(
	'authData/signIn',
	async (payload, { rejectWithValue }) => {
		try {
			let response = await signInWithEmailAndPassword(
				auth,
				payload.email,
				payload.password
			);
			const ref = doc(db, 'users', response.user.uid);
			updateDoc(ref, {
				isOnline: true,
			});
			const loggedInUser = {
				userName: response.user.displayName,
				uid: response.user.uid,
				email: response.user.email,
			};
			return loggedInUser;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const logOut = createAsyncThunk(
	'authData/logOut',
	async (payload, { rejectWithValue }) => {
		try {
			const ref = doc(db, 'users', payload);
			await updateDoc(ref, {
				isOnline: false,
			});
			signOut(auth);
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

const initState = {
	currentUser: null,
	isAuth: false,
	isLoading: false,
	error: null,
};

//slice
const authSlice = createSlice({
	name: 'authData',
	initialState: initState,
	reducers: {
		setCurrentUser(state, { payload }) {
			state.isAuth = true;
			state.error = null;
			state.currentUser = payload;
		},
	},
	extraReducers: {
		[signUp.pending]: (state) => {
			state.isLoading = true;
		},
		[signUp.fulfilled]: (state, { payload }) => {
			state.isLoading = false;
			state.isAuth = true;
			state.error = null;
			state.currentUser = payload;
		},
		[signUp.rejected]: (state, { payload }) => {
			state.isLoading = false;
			state.isAuth = false;
			state.currentUser = null;
			state.error = payload;
		},
		[signIn.pending]: (state) => {
			state.isLoading = true;
		},
		[signIn.fulfilled]: (state, { payload }) => {
			state.isLoading = false;
			state.isAuth = true;
			state.error = null;
			state.currentUser = payload;
		},
		[signIn.rejected]: (state, { payload }) => {
			state.isLoading = false;
			state.isAuth = false;
			state.currentUser = null;
			state.error = payload;
		},
		[logOut.fulfilled]: (state) => {
			state.isAuth = false;
			state.currentUser = null;
			state.error = null;
		},
		[logOut.rejected]: (state, { payload }) => {
			state.error = payload;
		},
	},
});

export const { setCurrentUser } = authSlice.actions;
export default authSlice.reducer;
