import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Check if import paths are correct
import { NavLink, useNavigate } from 'react-router-dom';
import { auth ,database, set,ref} from './firebase';
import './App.css';

const Profile = () => {
    const navigate = useNavigate();
    const [fullname, setFullname] = useState('');
    const [city, setCity] = useState('');
    const [pincode, setPincode] = useState('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
   
    const onLogin = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                    // Check if all fields are filled
          if (!fullname || !age  || !city || !pincode || !email) {
            throw new Error("All fields are required.");
          }
      
          // Check if age is a number
          if (isNaN(age)) {
            throw new Error("Age must be a number.");
          }
      
          // Check if pincode is exactly 6 digits
          if (pincode.length !== 6 || isNaN(pincode)) {
            throw new Error("Pincode must be exactly 6 digits.");
          }
                // Store user profile data in the database
                const userData = {
                    fullname: fullname,
                    city: city,
                    pincode: pincode,
                    age: age,
                    email: email
                };
                // Push data to the database under 'users' node
                set(ref(database, `users/${user.uid}`), userData)
                    .then(() => {
                        alert("User data stored successfully");
                        // Navigate to the home page
                        navigate("/home");
                    })
                    .catch((error) => {
                        console.error(error.code, error.message);
                        alert(error.message);
                    });
            })
            .catch((error) => {
                console.error(error.code, error.message);
                alert(error.message);
            });
    }

    return (
        <>
            <main >
                <section>
                    <div style={{marginTop:'90px'}}>
                        <p className=''> Data Store In Real-time Database </p>

                        <form style={{marginTop:'30px'}} onSubmit={onLogin}> {/* Use onSubmit event of the form for form submission */}
                            <div>
                                <label htmlFor="fullname">Full-name</label>
                                <input
                                    type="text"
                                    value={fullname}
                                    onChange={(e) => setFullname(e.target.value)}
                                    required
                                    placeholder="Your Full-Name"
                                />
                            </div>

                            <div>
                                <label htmlFor="city">City</label>
                                <input
                                    type="text"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    required
                                    placeholder="Your City"
                                />
                            </div>
                            <div>
                                <label htmlFor="pincode">Pincode</label>
                                <input
                                    type="number"
                                    value={pincode}
                                    onChange={(e) => setPincode(e.target.value)}
                                    required
                                    placeholder="Your Pincode"
                                />
                            </div>
                            <div>
                                <label htmlFor="age">Age</label>
                                <input
                                    type="number"
                                    value={age}
                                    onChange={(e) => setAge(e.target.value)}
                                    required
                                    placeholder="Your age"
                                />
                            </div>
                            <div>
                                <label htmlFor="email-address">Email address</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    placeholder="Email address"
                                />
                            </div>
                            <div>
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    placeholder="Password"
                                />
                            </div>

                            <button type="submit">Submit</button>
                        </form>

                    </div>
                </section>
            </main>
        </>
    )
}
export default Profile;