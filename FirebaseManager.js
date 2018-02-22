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

export function createStudent(email, password) {
    console.log("creating student");
    return new Promise((resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
                resolve(true);
                console.log("successfully created student");
            })
            .catch((error) => {
                console.log("there was an error");
                resolve(error.message);
            });

        var userId = firebase.auth().currentUser.uid;
        firebase.database().ref('students/' + userId).set({
            email: email,
        });

    });
}

export function createTutor(email, password) {
    return new Promise((resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
                resolve(true);
            })
            .catch((error) => {
                resolve(error.message);
            });

        var userId = firebase.auth().currentUser.uid;
        firebase.database().ref('tutors/' + userId).set({
            email: email,
        });
        console.log("created user with id: " + userId);

    });
}


export function addStudentInfo(name, phone, subject, grade, city) {
    var userId = firebase.auth().currentUser.uid;
    firebase.database().ref('students/' + userId).set({
        name: name,
        phone: phone,
        subject: subject,
        grade: grade,
        city: city,
        frozen: true // "frozen" is true if they haven't been matched with a tutor yet
    });
}

export function addTutorInfo(name, phone, subjects, exp, degree, city) {
    var userId = firebase.auth().currentUser.uid;
    console.log("adding tutor info, user is " + userId);
    firebase.database().ref('tutors/' + userId).set({
        name: name,
        phone: phone,
        subjects: subjects,
        city: city,
        exp: exp,
        degree: degree,
        frozen: true // "frozen" is true if they haven't been matched with a student yet
    });
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