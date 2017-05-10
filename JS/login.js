var firebaseRef = firebase.database().ref();
//firebaseRef.child("mate").set("lit");

const txtEmail = document.getElementById('txtEmail');
const txtPassword = document.getElementById('txtPassword');
const btnLogin = document.getElementById('btnLogin');
const btnSignUp = document.getElementById('btnSignUp');
const btnLogout = document.getElementById('btnLogout');

btnLogin.addEventListener('click', function(e) {
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    //sign in
    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message + "nooooo"));


})

btnSignUp.addEventListener('click', function(e) {
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    //sign Up
    const promise = auth.createUserWithEmailAndPassword(email, pass);
promise.catch(e => console.log(e.message + "nooooo"));

})

btnLogOut.addEventListener('click', function(e) {
    firebase.auth().signOut();
})

firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
        console.log(firebaseUser);
        btnLogOut.classList.remove('hide');
        loginEmailNPass.classList.add('hide');
    } else {
        console.log("Not Logged In");
        btnLogOut.classList.add('hide');
        loginEmailNPass.classList.remove('hide');
    }
})
