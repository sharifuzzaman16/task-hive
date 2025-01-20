import axios from 'axios';
import React from 'react';

const axiosPublic = axios.create({
    baseURL: "https://task-hive-server-two.vercel.app"
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;