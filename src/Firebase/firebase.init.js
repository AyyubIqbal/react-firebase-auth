import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebase.config";

const innitialzeAuthentication = () => {
    const app = initializeApp(firebaseConfig);
}
export default innitialzeAuthentication;