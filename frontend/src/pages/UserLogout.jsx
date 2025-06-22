import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserLogout = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate('/login');
            return;
        }

       

        axios.get(`${import.meta.env.VITE_API_URL}/users/logout`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((response) => {
            if (response.status === 200) {
                localStorage.removeItem('token');
                navigate('/login');
            }
        }).catch((error) => {
            console.error("Logout failed:", error);
            navigate('/login'); 
        });

    }, []);

    return <div>Logging out...</div>;
};

export default UserLogout;
