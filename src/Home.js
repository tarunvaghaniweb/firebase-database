import { auth } from './firebase';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
function Home() {
    const [userEmail, setUserEmail] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUserEmail(user.email);
            } else {
                setUserEmail(null);
            }
        }, (error) => {
            console.error('Error in authentication state change:', error.message);
        });

        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        try {
            await auth.signOut();
            // Redirect to the login page or perform any other action after logout
            navigate('/Login');
        } catch (error) {
            console.error('Error signing out:', error.message);
        }
    };

    const handleSignup = () => {
        navigate('/Signup');
    }

    const handleLogin = () => {
        navigate('/Login');
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <a className="navbar-brand" href="#">Navbar</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav mx-auto">
                        <a className="nav-link active" id='tex' aria-current="page" href="/profile">Home</a>
                        <div className='text-center '>

                            {userEmail && <span className="nav-link active">{userEmail}</span>}
                           
                        </div>
                        <div className='text-center'>
                        {userEmail && <button className="btn btn-danger btn-sm ms-3 me-3" onClick={handleLogout}>Logout</button>}

                        </div>
                        <div className='text-center'>
                            <button className="btn btn-success btn-sm me-3 " id='bt' onClick={handleSignup}>Signup</button>
                        </div>
                        <div className='text-center'>
                            <button className="btn btn-success btn-sm me-3 " id='bt1' onClick={handleLogin}>Login</button>
                        </div>


                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Home;
