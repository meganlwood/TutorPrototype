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

// const config = {
//     apiKey: "AIzaSyDIEOu99SaPq8TSdT_ep2EqrzhaDUFJ36Y",
//     authDomain: "itutoru-megan-refactor.firebaseapp.com",
//     databaseURL: "https://itutoru-megan-refactor.firebaseio.com",
//     projectId: "itutoru-megan-refactor",
//     storageBucket: "",
//     messagingSenderId: "842705651129"
// };

var loading = true;

export function getLoggedInUser() {
    return firebase.auth().currentUser;
}

export function signOut() {
    return new Promise((resolve, reject) => {
        firebase.auth().signOut().then(resolve(true));
    })
}

export function userType(uid) {
    return new Promise((resolve, reject) => {
        var ref = firebase.database().ref('tutors');
        ref.once("value").then(snapshot => {
            console.log("came back from the ref");
            if (snapshot.child(uid + "").exists()) {
                console.log("child exists");
                resolve('tutor');
                ref.off();
                //Router = createRootNavigator(true, true);
            }
            else {
                resolve('parent');
                //Router = createRootNavigator(true, false);
            }
        });
    })
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

export function getStudent(uid) {
    return new Promise((resolve, reject) => {
        firebase.database().ref('students/' + uid).on('value', function(snapshot) {
            resolve({ id: uid, data: snapshot.val() });
        })
    })
}


export function getConversationFromKey(key) {
    console.log("getting conversation from key: " + key);


    return new Promise((resolve, reject) => {
        firebase.database().ref('conversations/' + key).on('value', function(snapshot) {
            if (snapshot.val() === null) resolve(null);
            else {
                console.log("resolving conversation: ");
                console.log(snapshot.val());
                resolve(snapshot.val());
            }
        })
    })
}

export function getConversation(other, user) {
    //search conversations and look at the first message of each conversation
    //if it is between those two users, return that conversation

    /*
        can we instead just have each user (tutor and parent) have the id of the conversation?
        all this work for nothing RIP
     */


    return new Promise((resolve, reject) => {
        firebase.database().ref('conversations/').on('value', function(snapshot) {
            //console.log(JSON.stringify(snapshot.val()));
            for (var key in snapshot.val()) {
                //key is convo id, array of messages is value

                //var messagesID = snapshot.val()[key];
                //var messages = messagesID["messages"];
                var messages = snapshot.val()[key];
                console.log("messages: " + JSON.stringify(messages));
                if (messages.length > 0) {
                    var firstMessage = messages[0];
                    getMessageInfo(firstMessage, key).then(res => {
                        //console.log("MESSAGE: " + JSON.stringify(res));
                        //if (message != null) {
                        var to = res.to;
                        var from = res.from;
                        if ((other === to && user === from) || (other === from && user === to)) {
                            console.log("found the convo!");
                            console.log("returning: " + res.key);
                            console.log("messages: " + snapshot.val()[res.key]);
                            //resolve({messages: snapshot.val()[res.key]["messages"], key: res.key});
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
            console.log(snapshot.val().message);
            resolve({to: snapshot.val().to, message: snapshot.val().message, timestamp: snapshot.val().timestamp});

        });
    });
}



// export function getUserInfo() {
//     return new Promise((resolve, reject) => {
//         firebase.database().ref('tutors/' + getLoggedInUser().uid).on('value', function(snapshot) {
// //check if null to look in students maybe
//
//             resolve(Tutor(snapshot.val().email, '', snapshot.val().name, snapshot.val().phone));
//         })
//     });
//
// }

export function addMessage2(convoKey, message, fromID, toID) {
    var messageRef = firebase.database().ref('messages/').push();
    messageRef.set({
        to: toID,
        from: fromID,
        message: message.text,
        timestamp: message.createdAt.toLocaleString()
    });
    var convoRef = firebase.database().ref("conversations/" + convoKey);
    convoRef.on('value', function(snapshot) {
        var messagesArr = snapshot.val();
        if (messagesArr === null) messagesArr = [];
        if (messagesArr.includes(messageRef.key)) {
            return;
        }
        else {
            messagesArr.push(messageRef.key);
            firebase.database().ref("conversations/").update({
                [convoKey]: messagesArr,
            })
        }
    });
}

export function addMessage(message, convoKey, currentUser, otherPerson) {
    return new Promise((resolve, reject) => {
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
            var convoRef = firebase.database().ref("conversations/").push();
            firebase.database().ref("conversations/" + convoRef.key).set({
                0: messageRef.key,
            });
/*
            var userId = firebase.auth().currentUser.uid;
            if (firebase.database().ref("tutors/" + userId) === null) {
                firebase.database().ref("students/" + userId).update({
                    haveConvo: true,
                })
            }
            else {
                firebase.database().ref("tutors/" + userId).update({
                    haveConvo: true,
                })
            }
*/
            resolve(true);
        }
        else {
            //get array using key
            //push messageRef.key to array
            var convoRef = firebase.database().ref("conversations/" + convoKey);
            console.log("convokey: " + convoKey);
            convoRef.on('value', function(snapshot) {
                //var messagesArr = snapshot.val()["messages"];]
                var messagesArr = snapshot.val();
                console.log("messages so far: " + messagesArr);
                if (messagesArr.includes(messageRef.key)) {
                    resolve(true);
                }
                else {
                    messagesArr.push(messageRef.key);
                    //set
                    console.log("messages after push: " + messagesArr);

                    firebase.database().ref("conversations/").update({
                        [convoKey]: messagesArr,
                    })
                }


            });
            resolve(true);
        }
    });




}

/*
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
        console.log("before add id: " + arr);
        console.log("id: " + id);
       arr.push(id);
       console.log("after add id: " + arr);
       firebase.database().ref("conversations/").update({
           [convoKey]: arr,
       });
       resolve(arr);
    });
}
*/

export function getStudentsWithoutTutor() {
  return new Promise((resolve, reject) => {
      firebase.database().ref('students').orderByChild('tutor').equalTo(null).once('value', function(snapshot) {
        var returnVal = [];
        snapshot.forEach(function(childSnap) {
          var item = childSnap.val();
          item.key = childSnap.key;
          returnVal.push(item);
        })
        resolve(returnVal);
      })
  });
}

export function getTutor(uid) {
    return new Promise((resolve, reject) => {
        firebase.database().ref('tutors/' + uid).on('value', function(snapshot) {
//check if null to look in students maybe

            resolve(snapshot.val());
        })
    });
}

export function getStudentsForTutor(tutorUID) {
    return new Promise((resolve, reject) => {
        firebase.database().ref('tutors/' + tutorUID).on('value', function(snapshot) {
            console.log("students for tutor are: " + JSON.stringify(snapshot.val().students));
            resolve(snapshot.val().students);
        })
    });
}

export function getParent(uid) {
    console.log("getting parent");
    return new Promise((resolve, reject) => {
        firebase.database().ref('parents/' + uid).on('value', function(snapshot) {
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


export function addStudentInfo(studentName, parentName, phone, subject, grade, city, newParent) {
    var userId = firebase.auth().currentUser.uid;
    firebase.database().ref('students/' + userId).update({
        studentName: studentName,
        subject: subject,
        grade: grade,
        city: city,
        frozen: true // "frozen" is true if they haven't been matched with a tutor yet
    });
    if (newParent) {
        firebase.database().ref('parents/' + userId).update({
            parentName: parentName,
            studentName: studentName,
            phone: phone
        });
    }
    else {
        firebase.database().ref('parents/' + userId + '/students').on('value', function(snapshot) {
            var arr = []
            if (snapshot.val() === null) {
                arr = []
            }
            else arr = snapshot.val();

            arr.push(studentName);
            firebase.database().ref('parents/' + userId + '/students').set({
                students: arr,
            })

        });
    }
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
        frozen: true, // "frozen" is true if they haven't been matched with a student yet
        students: "NULL"
    });
}

export function isSignedIn() {

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

export function connectStudentTutor(student_id, tutor_id, currentStudents) {
  return new Promise((resolve, reject) => {
    // var currentStudents = [];
    // firebase.database().ref('tutors/' + tutor_id).once('value', function(snapshot) {
    //     if (snapshot.child('students').exists()) {
    //       currentStudents = snapshot.child('students');
    //     }
    // });
    // currentStudents = Array.from(currentStudents);
    // console.log("current students: " + JSON.stringify(currentStudents));
    // currentStudents.push(student_id);
    // console.log("pushing " + student_id + " to tutor " + tutor_id);

    firebase.database().ref('tutors/' + tutor_id).update({
        frozen: false, // "frozen" is true if they haven't been matched with a student yet
        students: currentStudents
    });

    firebase.database().ref('students/' + student_id).update({
        frozen: false, // "frozen" is true if they haven't been matched with a tutor yet
        tutor: tutor_id
    });

    resolve(true);
  })
}

// export function signOut() {
//     firebase.auth().signOut().then(function () {
//         console.log('Signed Out');
//     }, function (error) {
//         console.error('Sign Out Error', error);
//     });
// }
