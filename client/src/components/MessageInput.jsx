import React, { useRef } from 'react'
import { useState } from 'react'
import { useChatStates } from '../states/chatStates';
import {Send, Image, X} from 'lucide-react'


const MessageInput = () => {
  // message typing state
  const [ message, setMessage ] = useState("");
  // image preview state
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const {sendMessage} = useChatStates();
  // handle image change
  const handleImageChange = (e)=>{
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };
  // handle image close 
  const removeImage = ()=>{
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };
  // handle message send
  const handleSendMessage = async(e)=>{
    e.preventDefault();
    e.preventDefault();
    if (!message.trim() && !imagePreview) return;

    try {
      await sendMessage({
        text: message.trim(),
        image: imagePreview,
      });

      // Clear form
      setMessage("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  
  return (
    <div className="p-4 w-full">

      {/* image preview */}
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
              flex items-center justify-center"
              type="button"
            >
              <X className="size-3 cursor-pointer" />
            </button>
          </div>
        </div>
      )}

      {/* message input */}
      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            className="w-full input input-bordered rounded-lg input-sm sm:input-md"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />

          <button
            type="button"
            className={`hidden sm:flex btn btn-circle
                     ${imagePreview ? "text-emerald-500" : "text-zinc-400"}`}
            onClick={() => fileInputRef.current?.click()}
          >
            <Image size={20} />
          </button>
        </div>
        <button
          type="submit"
          className="btn btn-sm btn-circle"
          disabled={!message.trim() && !imagePreview}
        >
          <Send size={22} />
        </button>
      </form>

      

    </div>
  )
}

export default MessageInput