import React, { useContext } from 'react';
import useUser from '../../../../hooks/useUser';
import { AuthContext } from '../../../../context/AuthProvider';

const Profile = () => {
    const [user] = useUser();
    const { availableCoin, email, name, photo, role, _id } = user;
    const {logOut} = useContext(AuthContext)

    return (
            <div className="w-full p-8 min-h-screen">
                {/* Welcome Message */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-800">Welcome back, {name}!</h1>
                    <p className="text-gray-600 mt-2">Here's a quick overview of your profile.</p>
                </div>

                {/* Profile Content */}
                <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-6">
                    {/* Profile Photo */}
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-500">
                        <img src={photo} alt={name} className="w-full h-full object-cover" />
                    </div>

                    {/* User Information */}
                    <div className="flex-1 text-center md:text-left">
                        <h2 className="text-2xl font-bold text-gray-800">{name}</h2>
                        <p className="text-gray-600 mt-2">{email}</p>
                        <p className="text-gray-600 mt-1">Role: {role}</p>
                        <p className="text-gray-600 mt-1">User ID: {_id}</p>
                    </div>

                    {/* Available Coins */}
                    <div className="bg-blue-50 p-6 rounded-lg text-center">
                        <p className="text-sm text-blue-600">Available Coins</p>
                        <p className="text-3xl font-bold text-blue-800">{availableCoin}</p>
                    </div>
                </div>

                {/* Additional Information or Actions */}
                <div className="mt-8 border-t border-gray-200 pt-6">
                    <h2 className="text-xl font-semibold text-gray-800">Additional Information</h2>
                    <p className="text-gray-600 mt-2">
                        Here you can add more details about the user, such as their bio, recent activities, or any other relevant information.
                    </p>
                    <div className="mt-4">
                        <button onClick={logOut} className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition duration-300">
                            Logout
                        </button>
                    </div>
                </div>
            </div>
    );
};

export default Profile;