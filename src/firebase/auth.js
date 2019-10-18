import firebase, { auth, db } from 'firebase.js'

export const getStarted = (email, actionCodeSettings, errHandler, completionHandler) => {
  auth.signOut()
  auth.sendSignInLinkToEmail(email, actionCodeSettings)
    .then(() => {
      completionHandler()
    })
    .catch((err) => {
      console.log(err)
      errHandler()
    })
}

export const userExists = (email, completionHandler) => {
  db.collection('users').doc(email).get()
    .then((snapshot) => {
      console.log(snapshot.exists)
      const exists = snapshot.exists
      if (exists) {
        auth.currentUser.updateProfile({
          displayName: snapshot.data().fullName
        })
      }
      completionHandler(exists)
    })
    .catch((err) => {
      console.log(err)
    })
}

export const fullNameExists = (email, completionHandler) => {
  db.collection('users').doc(email).get()
    .then((doc) => {
      if (!doc.exists || doc.data().fullName === '') {
        console.log('full name does not exist')
        completionHandler()
      }
    })
    .catch((err) => {
      console.log(err)
    })
}

export const registerNewUser = (name, email, whatsApp, phoneNumber, errHandler, completionHandler) => {
  let data = {
    fullName: name,
    email: email,
    whatsApp: whatsApp,
    phoneNumber: phoneNumber,
    creationDate: firebase.firestore.FieldValue.serverTimestamp(),
  }

  if (!whatsApp) {
    data.phoneNumber = ''
  }
  else {
    data.phoneNumber = data.phoneNumber.replace(/\s/g, '')
  }

  db.collection('users').doc(email).set(data)
    .then(() => {
      // window.localStorage.setItem('emailForSignIn', email);
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
