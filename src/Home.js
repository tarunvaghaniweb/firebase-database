import { auth } from './firebase';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Navbar</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" onClick={handleSignup}>Signup</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" onClick={handleLogin}>Login</a>
                            </li>
                            {userEmail && (
                                <li className="nav-item">
                                    <button className="nav-link btn btn-link" onClick={handleLogout}>Logout</button>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Home;
