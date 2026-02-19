import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Send, User, Bot, Loader2, Sparkles, MoreHorizontal, Paperclip, Phone, Video, Info, Image, Heart, Mic, Smile } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

const ChatWindow = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMsg: Message = { role: 'user', content: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setLoading(true);

        try {
            const response = await axios.post(process.env.NEXT_PUBLIC_BFF_URL || 'http://localhost:3001/chat', {
                message: input,
                history: messages.map(m => ({ role: m.role, content: m.content }))
            });

            const botMsg: Message = { role: 'assistant', content: response.data.response_message };
            setMessages(prev => [...prev, botMsg]);
        } catch (error) {
            console.error('Error sending message:', error);
            setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I'm having trouble connecting to the service." }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-[700px] w-full max-w-4xl bg-white shadow-2xl rounded-3xl overflow-hidden border border-gray-100 mb-10">
            {/* Header */}
            <div className="px-4 py-3 border-b flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md z-10">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 p-[2px]">
                        <div className="w-full h-full rounded-full bg-white p-[1px]">
                            <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                                <Bot size={20} className="text-gray-600" />
                            </div>
                        </div>
                    </div>
                    <div>
                        <h2 className="font-bold text-sm tracking-tight">AION Intelligence</h2>
                        <p className="text-[11px] text-gray-500 font-medium">Active now</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 text-gray-700">
                    <Phone size={22} className="cursor-pointer hover:opacity-50 transition-opacity" />
                    <Video size={24} className="cursor-pointer hover:opacity-50 transition-opacity" />
                    <Info size={24} className="cursor-pointer hover:opacity-50 transition-opacity" />
                </div>
            </div>

            {/* Chat Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-2 scroll-smooth">
                <AnimatePresence>
                    {messages.length === 0 && (
                        <div className="h-full flex flex-col items-center justify-center text-center p-8">
                            <div className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center mb-4">
                                <Bot size={40} className="text-gray-300" />
                            </div>
                            <h3 className="font-bold text-xl">AION AI</h3>
                            <p className="text-gray-500 text-sm mt-1">Smart Customer Support v2.0</p>
                            <button className="mt-4 px-4 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-bold transition-colors">
                                View Profile
                            </button>
                        </div>
                    )}
                    {messages.map((msg, idx) => (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            key={idx}
                            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`flex items-start gap-2 max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                {msg.role === 'assistant' && (
                                    <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center shrink-0 mt-2">
                                        <Bot size={14} className="text-gray-500" />
                                    </div>
                                )}
                                <div className={`px-4 py-2.5 rounded-[22px] text-[15px] leading-snug ${msg.role === 'user'
                                    ? 'ig-gradient text-white rounded-br-[4px]'
                                    : 'bg-gray-100 text-black rounded-bl-[4px]'
                                    }`}>
                                    {msg.content}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                    {loading && (
                        <div className="flex justify-start pl-9">
                            <div className="flex gap-1 py-3 px-4 bg-gray-100 rounded-[22px] rounded-bl-[4px]">
                                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
                            </div>
                        </div>
                    )}
                </AnimatePresence>
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white">
                <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-full px-4 py-2 focus-within:ring-1 focus-within:ring-gray-300 transition-all">
                    <Smile size={24} className="text-gray-500 cursor-pointer" />
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                        placeholder="Message..."
                        className="flex-1 bg-transparent border-none focus:outline-none text-[15px] py-1 placeholder-gray-500"
                    />
                    {input.trim() ? (
                        <button
                            onClick={sendMessage}
                            disabled={loading}
                            className="text-[#3797f0] font-bold text-sm tracking-tight px-1 hover:opacity-70 disabled:opacity-30 transition-all"
                        >
                            Send
                        </button>
                    ) : (
                        <div className="flex items-center gap-3 text-gray-800">
                            <Mic size={24} className="cursor-pointer" />
                            <Image size={24} className="cursor-pointer" />
                            <Heart size={24} className="cursor-pointer" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChatWindow;
