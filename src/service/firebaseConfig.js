import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
	apiKey: 'AIzaSyD1x-Veb_MxNkpgMrDR-jLvJNrKXNJSfT0',
	authDomain: 'chat-with-me-8ee48.firebaseapp.com',
	projectId: 'chat-with-me-8ee48',
	storageBucket: 'chat-with-me-8ee48.appspot.com',
	messagingSenderId: '307115419370',
	appId: '1:307115419370:web:56b54ef5110c14b703d993',
};

const firebase = initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore();
const storage = getStorage();

export { firebase, auth, db, storage };
