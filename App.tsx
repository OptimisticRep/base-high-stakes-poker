
import React, { useState } from 'react';

const App = () => {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-black">
      <div className="text-center space-y-6">
        <div className="w-20 h-20 bg-blue-600 rounded-2xl mx-auto flex items-center justify-center text-4xl font-black italic shadow-[0_0_50px_rgba(0,82,255,0.4)]">B</div>
        <h1 className="text-5xl font-black tracking-tighter italic">BASE POKER ARENA</h1>
        <p className="text-blue-500 font-bold tracking-[0.3em] uppercase text-sm">Waiting for Tournament Start</p>
        
        <div className="p-8 bg-white/5 border border-white/10 rounded-[2rem] backdrop-blur-xl">
           <p className="text-slate-400 text-sm max-w-xs">
             Your app is now connected to the Base Ecosystem. 
             Click "Verify" in the Base Dashboard to continue.
           </p>
        </div>
      </div>
    </div>
  );
};

export default App;
