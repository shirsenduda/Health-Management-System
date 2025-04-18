import { useContext, useState } from "react";

const SendMessageCard = () => {
  // const { sendMessageHandler } = useContext(AdminContext);
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
      <input
        type="file"
        accept="image/*"
        className="mt-2"
        onChange={(e) => setImageFile(e.target.files[0])}
      />
      <button
        onClick={handleSend}
        className="mt-4 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Send Message
      </button>
    </>
  );
};

export default SendMessageCard;
