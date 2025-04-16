import { useState } from "react";

const SendMessageCard = ({ selectedUserId, onMessageSent }) => {
  const [messageText, setMessageText] = useState("");
  

    

  return (
    <>
      <textarea
        className="w-full border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows={4}
        placeholder="Type your message..."
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
      />
      <button
        className="mt-4 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Send Message
      </button>
    </>
  );
};

export default SendMessageCard;
