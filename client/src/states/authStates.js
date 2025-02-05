import {create} from 'zustand'
import { axiosInstance } from '../lib/axios.js'
import toast from 'react-hot-toast';
import {io} from 'socket.io-client';

const SERVER_URL = "http://localhost:8000";

export const useAuthState = create( (set,get)=>({
    authUser : null,  
    isCheckingAuth : true,
    onlineUsers : [],
    socket : null,

    checkAuth: async()=>{
        try{
            const res = await axiosInstance.get("/auth/check");
            set({authUser : res.data});
            get().connectSocket();
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
            get().connectSocket();
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
            get().connectSocket();
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
            get().disconnectSocket();
        } catch (err) {
            toast.error(err.response.data.msg);
        }
    },

    connectSocket : ()=>{
        const {authUser} = get();
        if( !authUser || get().socket?.connected ) return ;
        const socket = io(SERVER_URL, {
            query : {
                userId : authUser._id
            }
        });
        socket.connect();
        set( { socket : socket});

        socket.on("getActiveUsers", (activeUserIds)=>{
            set( { onlineUsers : activeUserIds});
        })

    },
    disconnectSocket : ()=>{
        if( get().socket?.connected ) get().socket.disconnect();
    }

    
})  )


