import * as firebase from 'firebase/app';
import 'firebase/firestore';

const app = firebase.initializeApp({
    apiKey: "AIzaSyDR3ZveC-Vw5_UAQU46EB7x-Y4zN7saSI4",
    authDomain: "hallo-ecommerce.firebaseapp.com",
    databaseURL: "https://hallo-ecommerce.firebaseio.com",
    projectId: "hallo-ecommerce",
    storageBucket: "hallo-ecommerce.appspot.com",
    messagingSenderId: "805450606923",
    appId: "1:805450606923:web:f883bd947bc9272767e0ce"
});

export function getFirebase(){
    return app;
}

export function getFirestore(){
    return firebase.firestore(app);
}