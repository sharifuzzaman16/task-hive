import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../../../context/AuthProvider';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';

const PaymentHistory = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const userEmail = user?.email;

    const { data: payments = [], isLoading, error } = useQuery({
        queryKey: ['payment', userEmail],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments?email=${userEmail}`);
            return res.data;
        },
        enabled: !!userEmail, // Ensures the query only runs if userEmail exists
    });

    if (isLoading) {
        return <p>Loading payments...</p>;
    }

    if (error) {
        return <p>Error loading payments. Please try again later.</p>;
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">My Payments</h1>
            <div className="bg-white shadow rounded overflow-hidden">
                <table className="min-w-full table-auto">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="text-left px-4 py-2">Payment</th>
                            <th className="text-left px-4 py-2">Coins</th>
                            <th className="text-left px-4 py-2">Date</th>
                            <th className="text-left px-4 py-2">Transaction Id</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((payment) => (
                            <tr key={payment._id} className="border-t">
                                <td className="px-4 py-2">${payment.price}</td>
                                <td className="px-4 py-2">{payment.coins}</td>
                                <td className="px-4 py-2">{new Date(payment.date).toLocaleDateString()}</td>
                                <td className="px-4 py-2">{payment.transactionId}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;
