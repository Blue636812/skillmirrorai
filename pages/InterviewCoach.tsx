import React, { useState, useRef, useEffect } from 'react';
import { GlassCard, GlassButton } from '../components/GlassUI';
import AIOrb from '../components/AIOrb';
import { Camera, Mic, StopCircle, RefreshCw, Zap } from 'lucide-react';
import { analyzeInterviewResponse } from '../services/geminiService';

const InterviewCoach = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Initialize Camera
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Camera access denied or missing", err);
      }
    };
    startCamera();

    return () => {
      // Cleanup stream
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  const handleStartStop = async () => {
    if (isRecording) {
      setIsRecording(false);
      setIsAnalyzing(true);
      
      // Simulate processing time then call API
      setTimeout(async () => {
         const mockTranscript = "I believe my greatest strength is my ability to adapt to new technologies quickly. In my last role, I taught myself React in two weeks to meet a deadline.";
         const result = await analyzeInterviewResponse(mockTranscript);
         setFeedback(result);
         setIsAnalyzing(false);
      }, 3000);

    } else {
      setFeedback(null);
      setIsRecording(true);
    }
  };

  return (
    <div className="h-full flex flex-col lg:flex-row gap-6">
      
      {/* Video Feed Section */}
      <div className="flex-1 flex flex-col gap-6">
        <GlassCard className="flex-1 relative overflow-hidden p-0 min-h-[400px] bg-black border-slate-800">
          <video 
            ref={videoRef} 
            autoPlay 
            muted 
            className="w-full h-full object-cover opacity-80"
          />
          
          {/* Overlay UI */}
          <div className="absolute inset-0 flex flex-col justify-between p-6">
             <div className="flex justify-between items-start">
               <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-xs font-mono text-red-400">
                  <div className={`w-2 h-2 rounded-full bg-red-500 ${isRecording ? 'animate-pulse' : ''}`} />
                  {isRecording ? 'REC 00:14' : 'STANDBY'}
               </div>
               <div className="flex gap-2">
                 <div className="p-2 rounded-full bg-black/50 border border-white/10 text-white"><Camera size={16} /></div>
                 <div className="p-2 rounded-full bg-black/50 border border-white/10 text-white"><Mic size={16} /></div>
               </div>
             </div>

             {/* AI Orb Overlay */}
             {isAnalyzing && (
               <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-20">
                  <div className="flex flex-col items-center">
                    <AIOrb state="thinking" scale={2} />
                    <p className="mt-4 text-blue-200 font-display animate-pulse">Analyzing micro-expressions...</p>
                  </div>
               </div>
             )}

             {!isAnalyzing && (
                 <div className="self-center mt-auto mb-10">
                    <div className="scale-75 opacity-80 hover:opacity-100 transition-opacity">
                        <AIOrb state={isRecording ? 'listening' : 'idle'} />
                    </div>
                 </div>
             )}
          </div>
        </GlassCard>

        {/* Controls */}
        <div className="flex justify-center">
          <GlassButton 
            variant={isRecording ? "danger" : "primary"} 
            onClick={handleStartStop}
            className="w-48 shadow-[0_0_30px_rgba(59,130,246,0.3)]"
            icon={isRecording ? StopCircle : Mic}
            disabled={isAnalyzing}
          >
            {isRecording ? 'Stop Recording' : 'Start Session'}
          </GlassButton>
        </div>
      </div>

      {/* Analysis Panel */}
      <div className="lg:w-96 flex flex-col gap-6">
        <GlassCard className="h-full flex flex-col">
          <h3 className="font-display font-bold text-xl mb-4 text-white flex items-center gap-2">
            <Zap size={20} className="text-yellow-400" />
            Live Insights
          </h3>

          {!feedback ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-6 text-gray-500">
               <div className="w-16 h-16 rounded-full border-2 border-dashed border-gray-700 mb-4 flex items-center justify-center animate-spin-slow">
                 <RefreshCw size={24} />
               </div>
               <p>Start recording to receive AI-powered analysis on your tone, pacing, and confidence.</p>
            </div>
          ) : (
             <div className="space-y-6 animate-fade-in">
               <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                 <p className="text-gray-300 text-sm leading-relaxed italic">
                   "{JSON.parse(JSON.stringify(feedback)).substring(0, 150)}..."
                 </p>
               </div>

               <div>
                 <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Key Metrics</h4>
                 <div className="space-y-3">
                   {[
                     { label: 'Confidence', val: 85, color: 'bg-green-500' },
                     { label: 'Clarity', val: 72, color: 'bg-blue-500' },
                     { label: 'Pacing', val: 92, color: 'bg-violet-500' },
                   ].map(m => (
                     <div key={m.label}>
                       <div className="flex justify-between text-xs mb-1">
                         <span className="text-gray-300">{m.label}</span>
                         <span className="text-white font-mono">{m.val}%</span>
                       </div>
                       <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                         <div className={`h-full ${m.color}`} style={{ width: `${m.val}%` }}></div>
                       </div>
                     </div>
                   ))}
                 </div>
               </div>

               <div className="pt-4 border-t border-white/10">
                 <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Suggestion</h4>
                 <p className="text-sm text-blue-200">
                   Try to maintain eye contact during pauses. Your filler word usage (um, like) was minimal. Great job!
                 </p>
               </div>
             </div>
          )}
        </GlassCard>
      </div>
    </div>
  );
};

export default InterviewCoach;