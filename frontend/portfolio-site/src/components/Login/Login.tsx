// Login.tsx
import React, { useEffect, useState } from 'react';
import styles from './Login.module.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import logImg from './log.svg';
import registerImg from './register.svg';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  useEffect(() => {
    const sign_in_btn = document.querySelector('#sign-in-btn');
    const sign_up_btn = document.querySelector('#sign-up-btn');
    const container = document.querySelector(`.${styles.container}`);
  
    const handleSignUp = () => container?.classList.add(styles['sign-up-mode']);
    const handleSignIn = () => container?.classList.remove(styles['sign-up-mode']);
  
    sign_up_btn?.addEventListener('click', handleSignUp);
    sign_in_btn?.addEventListener('click', handleSignIn);

    fetchUsers();

    return () => {
      sign_up_btn?.removeEventListener('click', handleSignUp);
      sign_in_btn?.removeEventListener('click', handleSignIn);
    };
  }, []);

  const [users, setUsers] = useState<any[]>([]);
  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:5000/users");
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error("Fehler beim Laden der User:", error);
    }
  };

  // Login state
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register state
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    setMessageType('');

    try {
      const res = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: registerUsername,
          email: registerEmail,
          password: registerPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.message === "User already exists") {
          setMessage("Du hast bereits ein Konto. Logge dich ein.");
        } else {
          setMessage(data.message || "Fehler bei der Registrierung.");
        }
        setMessageType("error");
        return;
      }

      setMessage("Registrierung erfolgreich!");
      setMessageType("success");
      navigate('/');
    } catch (error) {
      setMessage("Ein Fehler ist aufgetreten.");
      setMessageType("error");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    setMessageType('');
    
    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: loginUsername,
          password: loginPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
      if (data.message === "User not found") {
        setMessage("Bitte registriere dich zuerst.");
      } else if (data.message === "Wrong password") {
        setMessage("Falsches Passwort.");
      } else {
        setMessage(data.message || "Fehler beim Login.");
      }
      setMessageType("error");
      return;
    }

      setMessage('Erfolgreich eingeloggt!');
      setMessageType('success');
      navigate('/');
    } catch (error) {
      setMessage("Ein Fehler ist aufgetreten.");
      setMessageType('error');
    } finally {
      setIsLoading(false);
    }
  };
  
  const navigate = useNavigate();
  
  if (messageType === 'success') {
    navigate('/');
  }
  

  return (
    <><div className={styles.container}>
      <div className={styles['forms-container']}>
        <div className={styles['signin-signup']}>
          <form className={styles['sign-in-form']} onSubmit={handleLogin}>
            <h2 className={styles.title}>Sign in</h2>
            <div className={styles['input-field']}>
              <i className="fas fa-user"></i>
              <input type="text" placeholder="Username" onChange={(e) => setLoginUsername(e.target.value)} value={loginUsername} />
            </div>
            <div className={styles['input-field']}>
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Password" onChange={(e) => setLoginPassword(e.target.value)} value={loginPassword} />
            </div>
            <input type="submit" value="Login" className={`${styles.btn} ${styles.solid}`} id="sign-in-btn"/>
            {message && (
              <div className={messageType === 'success' ? styles.successMessage : styles.errorMessage}>
                {message}
              </div>)}
            <p className={styles['social-text']}>Or Sign in with social platforms</p>
            <div className={styles['social-media']}>
              <a href="#" className={styles['social-icon']}><i className="fab fa-facebook-f"></i></a>
              <a href="#" className={styles['social-icon']}><i className="fab fa-twitter"></i></a>
              <a href="#" className={styles['social-icon']}><i className="fab fa-google"></i></a>
              <a href="#" className={styles['social-icon']}><i className="fab fa-linkedin-in"></i></a>
            </div>
          </form>

          <form className={styles['sign-up-form']} onSubmit={handleRegister}>
            <h2 className={styles.title}>Sign up</h2>
            <div className={styles['input-field']}>
              <i className="fas fa-user"></i>
              <input type="text" placeholder="Username" value={registerUsername} onChange={(e) => setRegisterUsername(e.target.value)} />
            </div>
            <div className={styles['input-field']}>
              <i className="fas fa-envelope"></i>
              <input type="email" placeholder="Email" value={registerEmail} onChange={(e) => setRegisterEmail(e.target.value)} />
            </div>
            <div className={styles['input-field']}>
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Password" value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)} />
            </div>
            <input type="submit" className={styles.btn} value="Sign up" id="sign-up-btn" />
            <p className={styles['social-text']}>Or Sign up with social platforms</p>
            <div className={styles['social-media']}>
              <a href="#" className={styles['social-icon']}><i className="fab fa-facebook-f"></i></a>
              <a href="#" className={styles['social-icon']}><i className="fab fa-twitter"></i></a>
              <a href="#" className={styles['social-icon']}><i className="fab fa-google"></i></a>
              <a href="#" className={styles['social-icon']}><i className="fab fa-linkedin-in"></i></a>
            </div>
          </form>
        </div>
      </div>

      <div className={styles['panels-container']}>
        <div className={`${styles.panel} ${styles['left-panel']}`}>
          <div className={styles.content}>
            <h3>New here?</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, ex ratione. Aliquid!</p>
            <button className={`${styles.btn} ${styles.transparent}`} id="sign-up-btn">Sign up</button>
          </div>
          <img src={logImg} className={styles.image} alt="Log in illustration" />
        </div>
        <div className={`${styles.panel} ${styles['right-panel']}`}>
          <div className={styles.content}>
            <h3>One of us?</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum laboriosam ad deleniti.</p>
            <button className={`${styles.btn} ${styles.transparent}`} id="sign-in-btn">Sign in</button>
          </div>
          <img src={registerImg} className={styles.image} alt="Register illustration" />
        </div>
      </div>
    </div><div className="user-list">
        <h2>Registrierte User:</h2>
        <ul>
          {users.map((user, index) => (
            <li key={index}>
              {user.username} – {user.email}
            </li>
          ))}
        </ul>
      </div></>
  );
};

export default Login;
