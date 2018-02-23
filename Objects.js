

export function Tutor(email, password, name, phone) {
    const tutorObj = new Object();
    tutorObj.email = email;
    tutorObj.password = password;
    tutorObj.name = name;
    tutorObj.students = [];
    tutorObj.subjects = [];
    tutorObj.phone = phone;
    //add timesheets later
    return tutorObj;
}

function addStudent(tutorObj, studentObj) {
    tutorObj.students.add(studentObj);
}

function addSubject(personObj, subject) {
    personObj.subjects.add(subject);
}


export function Student(email, password, name, grade, age, school) {
    const studentObj = new Object();
    studentObj.email = email;
    studentObj.password = password;
    studentObj.name = name;
    studentObj.grade = grade;
    studentObj.age = age;
    studentObj.school = school;
    studentObj.tutor = ""
    studentObj.subjects = []

}

function addTutor(studentObj, tutorObj) {
    studentObj.tutor = tutorObj;
}

function Connection(studentObj, tutorObj, location) {
    const conn = new Object();
    conn.student = studentObj;
    conn.tutor = tutorObj;
    conn.location = location;
    conn.messages = [];
}

function addMessage(conn, message) {
    conn.messages.add(message)
}

function Message(to, from, content, timestamp) {
    const message = new Object();
    message.sender = from;
    message.receiver = to;
    message.content = content;
    message.timestamp = timestamp;
}


