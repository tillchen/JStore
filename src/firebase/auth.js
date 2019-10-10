import firebase, { auth, db } from 'firebase.js'

export const getStarted = (email, actionCodeSettings, errHandler, completionHandler) => {
  auth.signOut()
  auth.sendSignInLinkToEmail(email, actionCodeSettings)
    .then(() => {
      window.localStorage.setItem('emailForSignIn', email)
      completionHandler()
    })
    .catch((err) => {
      console.log(err)
      errHandler()
    })
}

export const registerNewUser = (name, email, errHandler, completionHandler) => {
  let data = {
    fullName: name,
    email: email,
    joinDate: firebase.firestore.FieldValue.serverTimestamp(),
    postsActive: {}
  }

  db.collection('users').doc(email).set(data)
    .then(() => {
      window.localStorage.setItem('emailForSignIn', email);
      completionHandler()
    })
    .catch((err) => {
      console.log(err)
      errHandler()
    })
}

export const anonymousSignIn = (errHandler) => {
  auth.signInAnonymously().catch((err) => {
    console.log(err)
    errHandler()
  });
}

export const anonymousUserHandler = () => {
  auth.onAuthStateChanged(user => {
    if (user) {
      console.log(user)
      return user
    }
  }) 
}
