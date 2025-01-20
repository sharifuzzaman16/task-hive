import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import useAxiosPublic from '../../../../../hooks/useAxiosPublic';
import { AuthContext } from '../../../../../context/AuthProvider';
import Swal from 'sweetalert2';
import useUser from '../../../../../hooks/useUser';

const CheckoutForm = () => {

    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState('');
    const location = useLocation();
    const price = location.state.price;
    const coins = location.state.coins;
    const axiosPublic = useAxiosPublic();
    const [clientSecret, setClientSecret] = useState('')
    const [user, refetch] = useUser();

    useEffect(() => {
        if (price > 0) {
            axiosPublic.post('/create-payment-intent', { price: price })
                .then(res => {
                    setClientSecret(res.data.clientSecret)
                })
        }
    }, [axiosPublic, price])

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return
        }
        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            setError(error.message)
        } else {
            setError('');
        }
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })
        if (confirmError) {
            Swal.fire({
                position: "center",
                icon: "error",
                title: `${confirmError.message}`,
                showConfirmButton: false,
                timer: 1500
              });
        } else {
            if (paymentIntent.status === 'succeeded') {

                const payment = {
                    email: user.email,
                    price: price,
                    coins: coins,
                    date: new Date(),
                    transactionId: paymentIntent.id,

                }
                const res = await axiosPublic.post('/payments', payment)
                if(res.data.insertedId){
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Payment successful!",
                        showConfirmButton: false,
                        timer: 1500
                      });
                    refetch();
                }
            }
        }
    }

    return (
        <div className="flex items-center mt-24 justify-center">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Complete Payment</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Card Element */}
                    <div className="border border-gray-300 rounded-md p-4 bg-gray-50 focus-within:ring-2 focus-within:ring-bg-primary">
                        <CardElement
                            className="outline-none bg-transparent text-gray-800"
                            options={{
                                style: {
                                    base: {
                                        fontSize: "16px",
                                        color: "#333",
                                        "::placeholder": { color: "#888" },
                                    },
                                    invalid: { color: "#e74c3c" },
                                },
                            }}
                        />
                    </div>

                    {/* Submit Button */}
                    <p className='text-error-red'>{error && error}</p>
                    <button
                        type="submit"
                        disabled={!stripe || !clientSecret}
                        className={`w-full py-3 text-white text-lg font-medium rounded-md ${stripe ? "bg-bg-primary" : "bg-gray-400 cursor-not-allowed"
                            }`}
                    >
                        Pay {price}$
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CheckoutForm;