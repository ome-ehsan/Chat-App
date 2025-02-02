import {create} from 'zustand'
import { axiosInstance } from '../lib/axios.js'
import toast from 'react-hot-toast';


export const useChatStates = create( (set)=>({

    messages : [],
    users:[],
    selectedUser : null,
    isMessagesLoading : false,
    isUsersLoading : false,

    // get user
    getUsers : async()=>{
        set({isUsersLoading : true})
        try{
            const res = await axiosInstance.get("/messages/users");
            set({users : res.data});
        }catch(err){
            toast.error(err.response.data.msg);
        }finally{
            set({isUsersLoading : false});
        }
    },

    // get messages
    getMessages : async (receiverId)=>{
        set({isMessagesLoading: true});
        try{
            const res = await axiosInstance.get(`/messages/${receiverId}`);
            set({messages : res.data});
        }catch(err){
            toast.error(err.response.data.msg);
        }finally{
            set({isMessagesLoading:false});
        }

    },

    setSelectedUser : (selectedUser) => set({selectedUser})

}))