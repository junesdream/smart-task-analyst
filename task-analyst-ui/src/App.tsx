import React, { useState, useEffect } from 'react';
import { Send, ClipboardList, CheckCircle, Terminal } from 'lucide-react';
import axios from 'axios';
import MatrixBackground from './MatrixBackground';

interface Task {
  id: number;
  description: string;
  extracted_tasks: string;
  priority: string;
}

function App() {
  const [text, setText] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchTasks = async () => {
    try {
      const res = await axios.get('http://localhost:8000/tasks');
      setTasks(res.data);
    } catch (err) {
      console.error("Backend connection failed", err);
    }
  };

  useEffect(() => { fetchTasks(); }, []);

  const handleAnalyze = async () => {
    setLoading(true);
    try {
      await axios.post(`http://localhost:8000/analyze?description=${encodeURIComponent(text)}`);
      setText('');
      fetchTasks();
    } catch (err) {
      console.error("Analysis failed", err);
    }
    setLoading(false);
  };

  return (
    <>
      <MatrixBackground />

      <div className="min-h-screen text-[#0F0] font-mono p-6 md:p-12">

        {/* Header - Unified Neon Silver Alignment */}
        <nav className="max-w-7xl mx-auto border border-[#C0C0C0] bg-black/80 p-6 mb-12 rounded-sm flex justify-between items-center shadow-[0_0_20px_rgba(192,192,192,0.3)]">
          <div className="flex items-center gap-4">
            <Terminal className="text-[#C0C0C0]" size={32} />
            <h1 className="text-2xl font-extrabold tracking-[0.2em] uppercase text-[#C0C0C0]">
              System Analyst <span className="text-[#0F0]">[M4TR1X]</span>
            </h1>
          </div>
          <div className="text-xs tracking-widest text-[#C0C0C0]/60 uppercase">Nexus Interface v4.0</div>
        </nav>

        <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* LEFT: Input Area */}
          <div className="bg-black/90 p-8 rounded-sm border border-[#C0C0C0] shadow-[0_0_25px_rgba(192,192,192,0.2)]">
            <h2 className="text-lg font-bold mb-6 flex items-center gap-3 uppercase tracking-widest text-[#C0C0C0]">
              <Send size={20} className="text-[#0F0]" /> Code Injection: Project Params
            </h2>
            <textarea
              className="w-full h-72 p-6 bg-black/60 border border-[#C0C0C0]/40 text-[#0F0] rounded-sm focus:ring-1 focus:ring-[#C0C0C0] outline-none transition-all placeholder:text-gray-600 resize-none text-sm leading-relaxed"
              placeholder="Enter system requirements... (e.g., Rebuild core API and optimize SQL clusters.)"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button
              onClick={handleAnalyze}
              disabled={loading || !text}
              className="mt-6 w-full border border-[#C0C0C0] bg-transparent hover:bg-[#C0C0C0] hover:text-black text-[#C0C0C0] font-bold py-4 rounded-sm transition-all duration-300 disabled:opacity-20 flex justify-center items-center gap-3 uppercase tracking-[0.3em] text-md shadow-[0_0_15px_rgba(192,192,192,0.1)]"
            >
              {loading ? ">>> Running Sub-Routines..." : ">>> Execute AI Core"}
            </button>
          </div>

          {/* RIGHT: Results Area - Now with matching Border & Shadow */}
          <div className="bg-black/90 p-8 rounded-sm border border-[#C0C0C0] shadow-[0_0_25px_rgba(192,192,192,0.2)]">
            <h2 className="text-lg font-bold mb-6 flex items-center gap-3 uppercase tracking-widest text-[#C0C0C0]">
              <ClipboardList size={20} className="text-[#0F0]" /> Extracted Command Sets
            </h2>

            <div className="space-y-6 overflow-y-auto max-h-[500px] pr-2 custom-scrollbar">
              {tasks.length === 0 && (
                <p className="text-gray-600 italic text-xs p-4 border border-dashed border-gray-700 rounded-sm">
                  Waiting for data uplink... System idle.
                </p>
              )}
              {tasks.slice().reverse().map((task) => (
                <div key={task.id} className="bg-black/40 p-4 rounded-sm border border-[#C0C0C0]/30 hover:border-[#0F0] transition-colors duration-500">
                  <div className="flex justify-between items-center mb-3 pb-2 border-b border-[#C0C0C0]/10">
                    <span className={`px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest ${task.priority === 'High' ? 'bg-[#0F0] text-black' : 'border border-[#C0C0C0] text-[#C0C0C0]'}`}>
                      Prio: {task.priority}
                    </span>
                    <span className="text-[9px] text-gray-600">SEG_ID: {task.id.toString().padStart(4, '0')}</span>
                  </div>
                  <p className="text-[12px] text-gray-400 mb-3 italic leading-snug">
                    {task.description.substring(0, 80)}...
                  </p>
                  <div className="space-y-2">
                    {task.extracted_tasks.split(',').map((t, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs font-semibold text-[#0F0]">
                        <CheckCircle size={12} className="text-[#C0C0C0]" /> {t.trim()}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>

        <footer className="max-w-7xl mx-auto mt-16 text-center text-[10px] text-gray-600 tracking-[0.4em] uppercase pt-8 border-t border-gray-900">
          Terminal Access Restricted // RIABO DEV (C) 2026 // No unauthorized decryption
        </footer>
      </div>
    </>
  );
}

export default App;