import axios from "axios";
import { toast } from "react-toastify";
const BACKEND_URI = import.meta.env.VITE_BACKEND_URI || 'http://localhost:8000'
export const searchMovie = async (query: string) => {
    if (!query.trim()) {
        toast.error("Please enter a valid string");
        return null; 
    }

    try {
        const response = await axios.get(`${BACKEND_URI}/api/movies/search?query=${encodeURIComponent(query)}`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const errorMessage = error.response?.data?.message || "Something went wrong";
            toast.error(errorMessage);
        } else {
            toast.error("An unexpected error occurred");
        }
        return null; 
    }
};
