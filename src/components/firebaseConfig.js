import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyAEOiM02AFcWSAcLJLtwVq06vX-VJu3gvo",
	authDomain: "shopping-cart-30f0c.firebaseapp.com",
	projectId: "shopping-cart-30f0c",
	storageBucket: "shopping-cart-30f0c.appspot.com",
	messagingSenderId: "1071722044938",
	appId: "1:1071722044938:web:21710ca9f5a356f75889f3",
};

firebase.initializeApp(firebaseConfig);
export default firebase;
