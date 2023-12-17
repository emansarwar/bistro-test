import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://bistro-server-n6lahsl0f-emansarwar3-gmailcom.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;