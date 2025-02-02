import {create} from 'zustand'
import { axiosInstance } from '../lib/axios.js'
import toast from 'react-hot-toast';

export const useAuthState = create( (set)=>({
    authUser : null,  
    isCheckingAuth : true,
    onlineUsers : [],


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

    updateProfile : async (data) => {
        set({isUpdatingProfile: true});
        try{
            const res = await axiosInstance.put("/auth/updateProfile", data);
            set({authUser : res.data});
            toast.success("Profile Updated Successfully");
        }catch(err){
            console.log("error in updateProfile: ", err.msg);
            toast.error(err.response.data.msg);
        }finally{
            set({ isUpdatingProfile : false});
        }
    },

    signup : async (formData)=>{
        set({isSigningUp : true });
        try {
            const res = await axiosInstance.post("auth/signup", formData);
            set({authUser:res.data});

            toast.success("Account created successfully!");
        } catch (err) {
            toast.error(err.response.data.msg);
        } finally {
            set({ isSigningUp : false});
        }
    },
    

    login : async (formData)=>{
        set({isLoggingIn : true});
        try{
            const res = await axiosInstance.post( "/auth/login", formData);
            set({authUser : res.data});
            toast.success("Logged in successfully");
        }catch(err){
            toast.error(err.response.data.msg);
        }finally{
            set({isLoggingIn : false });
        }
    },

    logout : async()=>{
        try {
            const res = await axiosInstance.post("/auth/logout");
            set({authUser : null});
            toast.success("Logged out successfully");
        } catch (err) {
            toast.error(err.response.data.msg);
        }
    }

    
})  )


