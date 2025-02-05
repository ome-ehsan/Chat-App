import {create} from 'zustand'
import { axiosInstance } from '../lib/axios.js'
import toast from 'react-hot-toast';
import { useAuthState } from './authStates.js';


export const useChatStates = create( (set,get)=>({

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

    sendMessage : async(message)=>{
        const {messages,selectedUser} = get();
        try{
            const res = await axiosInstance.post(`/messages/${selectedUser._id}`, message);
            set({messages : [...messages,res.data]});
        }catch(err){
            toast.error(err.response.data.msg);
        }
    },

    startListeningForNewMessages : ()=>{
        const { selectedUser } = get();
        if(!selectedUser) return;

        const socket = useAuthState.getState().socket;

        socket.on("newMessage", (newMessage)=>{
            // storing the new message in messages state
            if( newMessage.senderId !== selectedUser._id) return;
            set( { messages : [...get().messages, newMessage]});
        })
    },

    stopListeningForNewMessages : ()=>{
        const socket = useAuthState.getState().socket;
        socket.off("newMessage");
    },

    setSelectedUser : (selectedUser) => set({selectedUser})

}))