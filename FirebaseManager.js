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

export function getLoggedInUserPromise() {
    return new Promise((resolve, reject) => {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                resolve(user);
            } else {
                // No user is signed in.
                reject(null);
            }
        });
    })


}

export function getConversation(other, user) {
    console.log("~~IN GET NEW CONVERSATION")
    //search conversations and look at the first message of each conversation
    //if it is between those two users, return that conversation
    return new Promise((resolve, reject) => {
        firebase.database().ref('conversations/').on('value', function(snapshot) {

            //console.log(JSON.stringify(snapshot.val()));
            for (var key in snapshot.val()) {
                //key is convo id, array of messages is value
                console.log("key: " + key);
                var messages = snapshot.val()[key];
                if (messages.length > 0) {
                    var firstMessage = messages[0];
                    console.log("first message: " + firstMessage);
                    getMessageInfo(firstMessage, key).then(res => {
                        //console.log("MESSAGE: " + JSON.stringify(res));
                        //if (message != null) {
                        var to = res.to;
                        var from = res.from;
                        console.log("from: " + from + ", to: " + to + "key: " + res.key);
                        console.log("other: " + other + ", user: " + user);
                        if ((other === to && user === from) || (other === from && user === to)) {
                            console.log("found the convo!");
                            console.log("returning: " + res.key);
                            console.log("messages: " + snapshot.val()[res.key]);
                            resolve({messages: snapshot.val()[res.key], key: res.key});
                        }
                        //}
                    });

                }
            }
        })

        //CANNOT have a conversation without messages, so return null. once someone sends a message, then update
        //if it did not find the conversation, create a new one using push
    });
}


export function getMessageInfo(firstMessage, key) {
    console.log("~~in message info: " + firstMessage);
    return new Promise((resolve, reject) => {
        firebase.database().ref('messages/' + firstMessage).on('value', function(snapshot) {
            console.log("Conversation: " + JSON.stringify(snapshot.val()));
            var json = JSON.parse(JSON.stringify(snapshot));
            //console.log("message info for message" + firstMessage + ":" + json["from"]);
            resolve({from: json["from"], to: json["to"], key: key});

        });

        //CANNOT have a conversation without messages, so return null. once someone sends a message, then update
        //if it did not find the conversation, create a new one using push
    });
}


export function getMessage(messageID) {
    console.log("message id: " + messageID);
    return new Promise((resolve, reject) => {
        firebase.database().ref('messages/' + messageID).on('value', function(snapshot) {
            console.log("GETMESSAGE:  message = " + JSON.stringify(snapshot));
            console.log(snapshot.val().message);
            resolve({to: snapshot.val().to, message: snapshot.val().message, timestamp: snapshot.val().timestamp});

        });
    });
}



export function getUserInfo() {
    return new Promise((resolve, reject) => {
        firebase.database().ref('tutors/' + getLoggedInUser().uid).on('value', function(snapshot) {
//check if null to look in students maybe

            resolve(Tutor(snapshot.val().email, '', snapshot.val().name, snapshot.val().phone));
        })
    });

}

export function addMessage(message, convoKey, currentUser, otherPerson) {
    return new Promise((resolve, reject) => {
        //sender is current logged in user, other person is other person
        var messageRef = firebase.database().ref("messages/").push();
        console.log("message: " + messageRef.key + "\nto: " + otherPerson + ", from: " + currentUser.name + ", message: " + message[0].text + " timestamp: " + message[0].createdAt);
        messageRef.set({
            to: otherPerson,
            from: currentUser.name,
            message: message[0].text,
            timestamp: message[0].createdAt.toLocaleString(),
        });
        console.log("convokey: " + convoKey);
        if (convoKey === '') {
            console.log("convokey is empty");
            var convoRef = firebase.database().ref("conversations/").push();
            convoRef.set({
                0: messageRef.key,
            })
            resolve(true);
        }
        else {
            //get array using key
            //push messageRef.key to array
            var convoRef = firebase.database().ref("conversations/" + convoKey);
            console.log("convokey: " + convoKey);
            convoRef.on('value', function(snapshot) {
                var messagesArr = snapshot.val();
                console.log("messages so far: " + messagesArr);
                messagesArr.push(messageRef.key);
                //set
                console.log("messages after push: " + messagesArr);

                firebase.database().ref("conversations/").update({
                    [convoKey]: messagesArr,
                })

            });
            resolve(true);
        }
    });




}

export function addMessagetoMessages(message) {
    return new Promise((resolve, reject) => {
        var messageRef = firebase.database().ref("messages/").push();
        console.log("message: " + messageRef.key + "\nto: " + otherPerson + ", from: " + currentUser.name + ", message: " + message[0].text + " timestamp: " + message[0].createdAt);
        messageRef.set({
            to: otherPerson,
            from: currentUser.name,
            message: message[0].text,
            timestamp: message[0].createdAt.toLocaleString(),
        });
        resolve(messageRef);
    });

}

export function createConvo(messageId) {
    return new Promise((resolve, reject) => {
        var convoRef = firebase.database().ref("conversations/").push();
        convoRef.set({
            0: messageId,
        });
        resolve(convoRef != null);
    });

}

export function addToConvo(messageId, convoKey) {
    return new Promise((resolve, reject) => {
        var convoRef = firebase.database().ref("conversations/" + convoKey);
        console.log("convokey: " + convoKey);
        convoRef.on('value', function(snapshot) {
            updateMessages(snapshot.val(), messageId, convoKey).then(res => {
                resolve(res);
            });
        });
    });
}

export function updateMessages(arr, id, convoKey) {
    return new Promise((resolve, reject) => {
       arr.push(id);
       firebase.database().ref("conversations/").update({
           [convoKey]: arr,
       });
       resolve(arr);
    });
}


export function getTutor(uid) {
    return new Promise((resolve, reject) => {
        firebase.database().ref('tutors/' + uid).on('value', function(snapshot) {
//check if null to look in students maybe

            resolve(snapshot);
        })
    });
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