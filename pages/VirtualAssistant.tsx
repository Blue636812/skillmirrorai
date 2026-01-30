import React, { useState, useRef, useEffect } from 'react';
import { GlassCard, GlassInput, GlassButton } from '../components/GlassUI';
import AIOrb from '../components/AIOrb';
import { Send, Sparkles } from 'lucide-react';
import { generateAIResponse } from '../services/geminiService';
import { ChatMessage } from '../types';

const VirtualAssistant = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', role: 'model', text: "Hello. I'm Smart. How can I help you master your skills today?", timestamp: Date.now() }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const responseText = await generateAIResponse(userMsg.text);

    const botMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: responseText,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, botMsg]);
    setIsTyping(false);
  };

  return (
    <div className="h-[calc(100vh-140px)] flex gap-6">
      <div className="flex-1 flex flex-col h-full">
         {/* Header */}
         <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-display font-bold text-white">AI Virtual Assistant</h2>
            <div className="flex items-center gap-2 text-xs text-blue-400 px-3 py-1 rounded-full bg-blue-900/20 border border-blue-500/30">
               <Sparkles size={12} />
               <span>Gemini 3 Pro Active</span>
            </div>
         </div>

         {/* Chat Area */}
         <GlassCard className="flex-1 flex flex-col min-h-0 overflow-hidden relative">
            {/* Background 3D element */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20 pointer-events-none">
               <AIOrb state={isTyping ? 'thinking' : 'idle'} scale={2} />
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-6 z-10 custom-scrollbar">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-2xl p-4 backdrop-blur-md ${
                    msg.role === 'user' 
                      ? 'bg-blue-600/20 border border-blue-500/30 text-white rounded-tr-none' 
                      : 'bg-white/5 border border-white/10 text-gray-200 rounded-tl-none'
                  }`}>
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                    <span className="text-[10px] text-gray-500 mt-2 block opacity-70">
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                   <div className="bg-white/5 border border-white/10 rounded-2xl p-4 rounded-tl-none flex gap-1 items-center">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                   </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="mt-4 pt-4 border-t border-white/10 z-10">
              <form onSubmit={handleSend} className="flex gap-3">
                <GlassInput 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask Smart about interview tips..."
                  className="flex-1"
                />
                <GlassButton 
                  type="submit" 
                  variant="primary" 
                  disabled={!input.trim() || isTyping}
                  icon={Send}
                  className="w-14 px-0 flex items-center justify-center"
                >
                  
                </GlassButton>
              </form>
            </div>
         </GlassCard>
      </div>
    </div>
  );
};

export default VirtualAssistant;