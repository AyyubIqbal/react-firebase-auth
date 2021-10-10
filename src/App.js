import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, updateProfile } from "firebase/auth";
import { useState } from "react";
import './App.css';
import innitialzeAuthentication from './Firebase/firebase.init';

innitialzeAuthentication()
const googleProvider = new GoogleAuthProvider();

function App() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLogin, setIsLogin] = useState(false)
  const auth = getAuth();
  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then(result => {
        const user = result.user;
        console.log(user);
      })
      .catch(error => {
        console.log(error.message);
      })
  }

  const handleNamechange = e => {
    setName(e.target.value)
  }

  const handleEmailChange = e => {
    setEmail(e.target.value);
  }
  const handlePasswordChannge = e => {
    setPassword(e.target.value);
  }
  const toggleLogin = e => {
    setIsLogin(e.target.checked);
  }
  const handleRegistration = (e) => {
    e.preventDefault()
    console.log(email, password);
    if (password.length < 6) {
      setError("Password should be at least 6 characters");
      return;
    }
    if (!/(?=.*[A-Z].*[A-Z])/.test(password)) {
      setError('Password must contain 2 uppercase');
      return;
    }

    isLogin ? prossesLogin(email, password) : createNewUser(email, password)
  }

  const prossesLogin = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(result => {
        const user = result.user;
        console.log(user);
        setError('')
      })
      .catch(error => {
        setError(error.message)
      })
  }

  const createNewUser = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(result => {
        const user = result.user;
        console.log(user);
        setError('')
        verifyEmail()
        setUserName()
      })
      .catch(error => {
        setError(error.message);
      })
  }

  const setUserName = () => {
    updateProfile(auth.currentUser, { displayName: name })
      .then(result => { })
  }
  const verifyEmail = () => {
    sendEmailVerification(auth.currentUser)
      .then(result => {
        console.log(result);
      })
  }

  const handleResetPassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {

      })
      .catch((error) => {
        setError(error.message);
      });

  }

  return (
    <div className="mx-5">
      <form onSubmit={handleRegistration}>
        <h3 className="text-primary">Please {isLogin ? "Login" : "Register"}</h3>
        {!isLogin && <div className="row mb-3">
          <label htmlFor="inputAddress" className="col-sm-2 col-form-label">Name</label>
          <div className="col-sm-10">
            <input type="text" onBlur={handleNamechange} className="form-control" placeholder="Your Name" />
          </div>
        </div>}
        <div className="row mb-3">
          <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
          <div className="col-sm-10">
            <input onBlur={handleEmailChange} type="email" className="form-control" id="inputEmail3" required />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
          <div className="col-sm-10">
            <input type="password" onBlur={handlePasswordChannge} className="form-control" id="inputPassword3" required />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-sm-10 offset-sm-2">
            <div className="form-check">
              <input onChange={toggleLogin} className="form-check-input" type="checkbox" id="gridCheck1" />
              <label className="form-check-label" htmlFor="gridCheck1">
                Already Registered?
              </label>
            </div>
          </div>
        </div>
        <div className="row mb-3 ">{error}</div>
        <button type="submit" className="btn btn-primary">{isLogin ? "Login" : "Register"}</button>
        <button onClick={handleResetPassword} type="button" className="btn btn-secondary btn-sm">Reset Password</button>
      </form>
      <div>-----------------------------------------------</div>
      <br /><br />
      <button onClick={handleGoogleSignIn}>Google sign-in</button>
    </div>
  );
}

export default App;
