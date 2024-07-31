import React, { useState, useEffect } from 'react';
import logo from '../../assests/logo.svg';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { users, userDetailsById } from '../../api/users';

const Header = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkUser = async () => {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                const userInfo = JSON.parse(storedUser);
                setUser(userInfo);
                if(userInfo.uuid){
                    try {
                        const response = await userDetailsById(userInfo.uuid);
                        if (response) {
                            setUser(response);
                        }
                    } catch (error) {
                        console.error('Failed to fetch user details', error);
                    }
                }
            }
            setLoading(false);
        };

        checkUser();
    }, []);

    const clearStorage = () => {
        localStorage.clear();
        sessionStorage.clear();
    };

    const handleLogoClick = (event) => {
        event.preventDefault();
        navigate("/");
        // clearStorage();
    };

    const onSuccess = async (credentialResponse) => {
        try {
            const decoded = jwtDecode(credentialResponse.credential);
            const userInfo = {
                name: decoded.name,
                email: decoded.email,
                imageUrl: decoded.picture,
                id: decoded.sub
            };
            const apiUserData = await users(userInfo);
            setUser(apiUserData);
            localStorage.setItem('user', JSON.stringify(apiUserData));
            window.location.reload();
        } catch (error) {
            console.error('Google login failed', error);
        }
    };

    const onError = () => {
        console.log('Login Failed');
    };

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('user');
        clearStorage();
        console.log('Logged out successfully');
        window.location.reload();
    };

    return (
        <header className="col-md-12">
            <div className='row align-items-center'>
                <div className='col-md-10 px-5'>
                    <span className="fw-bold fs-4 logo gradient-text" role='button' onClick={handleLogoClick}>
                        <img src={logo} className='img-fluid pe-2 logo' style={{ height: '35px' }} alt="AI Guru" />
                        AI Guru
                    </span>
                </div>

                <div className='col-md-2 text-center'>
                    {loading ? (
                        <p>Loading...</p>
                    ) : user ? (
                        <div className="d-flex align-items-center justify-content-end">
                            <img src={user.imageUrl} alt={user.name} className="rounded-circle me-2" style={{ width: '30px', height: '30px' }} />
                            <span className="me-2">Hi, {user?.name?.split(' ')[0]}</span>
                            <button onClick={handleLogout} className='gradient-type-btn px-3 py-1 border-0'>Logout</button>
                        </div>
                    ) : (
                        <GoogleLogin
                            onSuccess={onSuccess}
                            onError={onError}
                            useOneTap
                        />
                    )}
                </div>
            </div>
        </header>
    );
};

export default React.memo(Header);
