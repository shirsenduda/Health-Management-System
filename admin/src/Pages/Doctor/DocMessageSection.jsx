import React, { useState } from 'react'

const DocMessageSection = () => {
  const [messages, setMessages] = useState([
    { sender: 'doctor', text: 'Hello! How can I help you today?' },
    { sender: 'patient', text: 'I have a headache since morning.' },
  ])
  const [newMessage, setNewMessage] = useState('')

  const handleSend = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { sender: 'doctor', text: newMessage }])
      setNewMessage('')
    }
  }

  return (
    <div className="flex flex-col h-full  max-w-full mx-auto">
      {/* Message List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-100">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 rounded-lg max-w-[70%] ${
              msg.sender === 'doctor'
                ? 'bg-blue-500 text-white self-end ml-auto'
                : 'bg-white text-gray-800'
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="flex items-center p-3 border-t bg-white">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 border rounded-lg px-3 py-2 mr-2 outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Send
        </button>
      </div>
    </div>
  )
}

export default DocMessageSection
