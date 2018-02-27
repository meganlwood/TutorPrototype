import firebase from 'firebase';
import { Tutor } from "./Objects";

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

export function getUserInfo() {
    return new Promise((resolve, reject) => {
        firebase.database().ref('tutors/' + getLoggedInUser().uid).on('value', function(snapshot) {
//check if null to look in students maybe

            resolve(Tutor(snapshot.val().email, '', snapshot.val().name, snapshot.val().phone));
        })
    });


// firebase.database().ref('tutors/' + getLoggedInUser().uid).on('value', function(snapshot) {
// console.log("FOUND IN TUTORS: " + JSON.stringify(snapshot.val()));
// })
//
// if (firebase.database().ref('students/' + getLoggedInUser().uid) === null) {
// console.log("not in students");
// firebase.ref('tutors/' + getLoggedInUser().uid).on('value', function(snapshot) {
// console.log("FOUND IN TUTORS: " + snapshot.val());
// })
// }
}

export function initialize() {
    firebase.initializeApp(config);
}

export function createStudent(email, password) {
    console.log("creating student");
    return new Promise((resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
                var userId = firebase.auth().currentUser.uid;
                firebase.database().ref('parents/' + userId).set({
                    email: email,
                });
                resolve(true);
            })
            .catch((error) => {
                console.log("there was an error");
                resolve(error.message);
            });
    });
}

export function createTutor(email, password) {
    console.log("logged in user before creation: " + getLoggedInUser())


    return new Promise((resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
                firebase.database().ref('tutors/' + getLoggedInUser().uid).set({
                    email: email,
                });
                resolve(true);

            })
            .catch((error) => {
                reject(error.message);
            });

    });
}


export function addStudentInfo(studentName, parentName, phone, subject, grade, city) {
    var userId = firebase.auth().currentUser.uid;
    firebase.database().ref('students/' + userId).update({
        studentName: studentName,
        subject: subject,
        grade: grade,
        city: city,
        frozen: true // "frozen" is true if they haven't been matched with a tutor yet
    });

    firebase.database().ref('parents/' + userId).update({
        parentName: parentName,
        studentName: studentName,
        phone: phone
    });
}

export function addTutorInfo(name, phone, subjects, exp, degree, city) {
    console.log("logged in user before adding info: " + getLoggedInUser())
    var userId = firebase.auth().currentUser.uid;
    console.log("adding tutor info, user is " + userId);
    firebase.database().ref('tutors/' + userId).update({
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
                resolve(true);
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
    firebase.auth().signOut().then(function () {
        console.log('Signed Out');
    }, function (error) {
        console.error('Sign Out Error', error);
    });
}