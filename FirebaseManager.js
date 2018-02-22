import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyBsjlF4FNxju6ise_-PRyyD2ZhPVwyoev4",
    authDomain: "itutoru-ef7e2.firebaseapp.com",
    databaseURL: "https://itutoru-ef7e2.firebaseio.com",
    projectId: "itutoru-ef7e2",
    storageBucket: "itutoru-ef7e2.appspot.com",
    messagingSenderId: "115499384435"
};

var loading = true;

export function getLoggedInUser() {
    return firebase.auth().currentUser;
}

export function initialize() {
    firebase.initializeApp(config);
}

export function isSignedIn() {


    console.log("called isSignIn");

    return new Promise((resolve, reject) => {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                console.log("is Sign in is returning USER IS SIGNED IN");
                resolve(true);
                // console.log("after resolve");
            }
            else {
                resolve(false);
            }
        })
    })

}

export function signIn(email, password) {
    return new Promise((resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                resolve(true);
            })
            .catch((error) => {
                resolve(error.message);
            });
    })


}

export function createUser(email, password) {
    return new Promise((resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
                resolve(true);
            })
            .catch((error) => {
                resolve(error.message);
            })
    });
}

export function signOut() {
    firebase.auth().signOut().then(function() {
        console.log('Signed Out');
    }, function(error) {
        console.error('Sign Out Error', error);
    });
}