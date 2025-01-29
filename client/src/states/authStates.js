import {create} from 'zustand'
import { axiosInstance } from '../lib/axios.js'

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
    isUpdatingProfile : false 
})  )


