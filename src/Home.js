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
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <a className="nav-link active" aria-current="page" href="/profile">Home</a>
                        {userEmail && <span className="nav-link active">{userEmail}</span>}
                        {userEmail && <button className="btn btn-danger ms-3" onClick={handleLogout}>Logout</button>}
                        <button className="btn btn-success ms-5" onClick={handleSignup}>Signup</button>
                        <button className="btn btn-success ms-2" onClick={handleLogin}>login</button>
                    </div>
                </div>
            </div>
        </nav>
    </div> 
    )
}

export default Home;
