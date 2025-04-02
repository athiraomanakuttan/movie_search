import axios from "axios";
import { toast } from "react-toastify";
import { MovieType } from "../type/type";
const BACKEND_URI = import.meta.env.VITE_BACKEND_URI || 'http://localhost:8000'

// search a new movie
export const searchMovie = async (query: string, currentPage:number = 1) => {
    if (!query.trim()) {
        toast.error("Please enter a valid string");
        return null; 
    }

    try {
        const response = await axios.get(`${BACKEND_URI}/search?query=${encodeURIComponent(query)}&page=${currentPage}`);
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

// get favoriate movie list

export const getFavoriteList = async ()=>{
    try {
        const response = await axios.get(`${BACKEND_URI}/favorites`)
        return response.data
    } catch (error) {
        toast.error("Error while fetching data")
    }
}

// add movie to favoarite list

export const addToFavorite = async (movie:MovieType)=>{
    try {
        const response = await axios.post(`${BACKEND_URI}/favorites`,{movie})
        return response.data
    } catch (error) {
        toast.error("unable to add movie to list")
    }
}

// remove movie to favoarite list

export const removeFromFavorite = async (id:string)=>{
    try {
        const respose =  await axios.put(`${BACKEND_URI}/favorites/${id}`)
        return respose.data
    } catch (error) {
        toast.error("unable to remove movie from list")
        
    }
}