import {create} from 'zustand'
import { axiosInstance } from '../lib/axios.js'
import toast from 'react-hot-toast';

export const useAuthState = create( (set)=>({
    authUser : null,  // will be used in app.jsx
    isCheckingAuth : true,


    checkAuth: async()=>{
        try{
            const res = await axiosInstance.get("/auth/check");
            set({authUser : res.data});
        }catch(err){
            console.log("error in checkAuth : ", err);
            set({ authUser : null});
        } finally{
            set( {isCheckingAuth : false} );
        }
    },



    isLoggingIn : false,
    isSigningUp : false,
    isUpdatingProfile : false ,

    signup : async (formData)=>{
        set({isSigningUp : true });
        try {
            const res = await axiosInstance.post("auth/signup", formData);
            set({authUser:res.data});

            toast.success("Account created successfully!");
        } catch (err) {
            toast.error(err.response.data.message);
        } finally {
            set({ isSigningUp : false});
        }
    },

    logout : async()=>{
        try {
            const res = await axiosInstance.post("/auth/logout");
            set({authUser : null});
            toast.success("Logged out successfully");
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }

    
})  )


