import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import LoadingCard from "./Loading.jsx";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

const Users = () => {
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);
        fetch(`${API_BASE}/users`)
            .then(res => res.json())
            .then(data => {
                setUsers(data);
                setLoading(false);
            })
            .catch(() => {
                setError('Failed to fetch leaderboard data.');
                setLoading(false);
            });
    }, []);

    // Filter users based on the search query
    const filteredUsers = users.filter(
        (user) =>
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.profile.toLowerCase().includes(searchQuery.toLowerCase())
    );

    function formatName(name) {
        return name
            .split(' ')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    return (
        <div className="max-w-3xl mx-auto mt-10">
            <div className="bg-white rounded shadow p-6">
                <h2 className="text-2xl font-bold mb-4 text-center">Leaderboard</h2>
                {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}
                {loading ? (
                    <div className="text-center py-4">Loading...</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full bg-white rounded">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="p-2">Rank</th>
                                    <th className="p-2">User</th>
                                    <th className="p-2">Profile</th>
                                    <th className="p-2">Registered</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, idx) => (
                                    <tr key={user._id} className="border-t hover:bg-gray-50">
                                        <td className="p-2 text-center font-semibold">{idx + 1}</td>
                                        <td className="p-2 flex items-center">
                                            <span className="inline-block w-8 h-8 bg-gray-200 rounded-full mr-2"></span>
                                            {user.name}
                                        </td>
                                        <td className="p-2">{user.profile}</td>
                                        <td className="p-2">{new Date(user.createdAt).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Users;
