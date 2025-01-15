import React from "react";
import { Link } from "react-router-dom";

const BuyerHome = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <header className="bg-blue-600 p-4 text-white">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Buyer Dashboard</h1>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link to="/profile" className="hover:text-gray-300">
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/tasks" className="hover:text-gray-300">
                  My Tasks
                </Link>
              </li>
              <li>
                <Link to="/payment-history" className="hover:text-gray-300">
                  Payment History
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-gray-300">
                  Shop
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Side: Welcome and Profile Info */}
          <section className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Welcome, Buyer!</h2>
            <p className="text-gray-600 mb-6">
              Welcome to your buyer dashboard. Here you can view your tasks, check out available products, and track your payment history.
            </p>
            <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
              <h3 className="text-lg font-semibold">Your Profile</h3>
              <p className="text-gray-600">Name: John Doe</p>
              <p className="text-gray-600">Email: john.doe@example.com</p>
            </div>
          </section>

          {/* Right Side: Featured Products or Tasks */}
          <section className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Featured Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              

             

              
            </div>
          </section>
        </div>
      </main>

     
    </div>
  );
};

export default BuyerHome;
