import axios from 'axios';

const axiosSecure = axios.create({
    baseURL: "https://task-hive-server-two.vercel.app"
});



const useAxiosSecure = () => {
    return axiosSecure;
};

export default useAxiosSecure;
