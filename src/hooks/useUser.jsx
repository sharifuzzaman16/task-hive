import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

const useUser = () => {

    const { user: firebaseUser } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const userEmail = firebaseUser?.email;
    console.log(userEmail)

    const { refetch, data: user = {} } = useQuery({
        queryKey: ['user', userEmail],
        queryFn: async () => {
            const res = await axiosPublic.get(`/user?email=${userEmail}`);
            return res.data;
        },
        enabled: !!userEmail,
    });
    return [user, refetch];

};

export default useUser;