import { X } from "lucide-react";
import { useAuthState } from "../states/authStates";
import { useChatStates } from "../states/chatStates";


const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStates();
  const { onlineUsers } = useAuthState();
  
  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img src={selectedUser.profilePicture || "/avatar.png"} alt={selectedUser.fullName} />
            </div>
          </div>

          {/* Selected user info */}
          <div>
            <h3 className="font-medium">{selectedUser.fullName}</h3>
            <p className="text-sm text-base-content/70">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* Close button to close the chat*/}
        <button onClick={() => setSelectedUser(null)}>
          <X className="cursor-pointer"/> 
        </button>
      </div>
    </div>
  );
};
export default ChatHeader;
