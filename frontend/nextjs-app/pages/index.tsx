import React from 'react';
import { motion } from 'framer-motion';
import ChatWindow from '../components/ChatWindow';

export default function Home() {
    const text = "AION Intelligence";

    return (
        <main className="min-h-screen flex flex-col items-center justify-start p-4 pt-12 md:pt-20 bg-background text-black transition-colors duration-500">
            <div className="relative z-10 w-full max-w-6xl flex flex-col items-center">
                <div className="text-center mb-10 space-y-2 flex flex-col items-center">
                    <motion.h1
                        className="text-4xl md:text-5xl font-bold tracking-tight mb-2 w-fit inline-block overflow-hidden whitespace-nowrap"
                        initial={{ width: 0 }}
                        animate={{ width: "auto" }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                    >
                        {text}
                    </motion.h1>
                    <motion.p
                        className="text-gray-500 text-lg"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2, duration: 0.5 }}
                    >
                        Smart E-commerce Customer Support
                    </motion.p>
                </div>

                <div className="w-full flex justify-center">
                    <ChatWindow />
                </div>

            </div>
        </main>
    );
}
