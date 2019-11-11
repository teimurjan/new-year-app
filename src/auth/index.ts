import firebase from "firebase";

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID
};

class Firebase {
  auth: firebase.auth.Auth;

  constructor(c: typeof config = config) {
    firebase.initializeApp(c);

    this.auth = firebase.auth();
  }

  googleSignIn = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().languageCode = "ru";

    const { credential, user } = await this.auth.signInWithPopup(provider);

    return { credential, user };
  };

  signOut = () => this.auth.signOut();

  listenAuthChanges = (cb: (user: firebase.User | null) => void) => {
    return this.auth.onAuthStateChanged(cb);
  };
}

export default Firebase;
