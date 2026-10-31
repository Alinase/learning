import React, { useState, useRef, useEffect } from 'react';
import { PracticalLab } from '../types';
import { Terminal, CheckCircle2, Circle, RefreshCw, Sparkles, HelpCircle } from 'lucide-react';

interface TerminalLabProps {
  lab: PracticalLab;
  courseId: string;
  onComplete: () => void;
  isPassed?: boolean;
}

interface CommandHistoryEntry {
  command: string;
  output: string;
  isTaskComplete?: boolean;
}

export const TerminalLab: React.FC<TerminalLabProps> = ({ lab, courseId, onComplete, isPassed }) => {
  const [completedTaskIds, setCompletedTaskIds] = useState<string[]>([]);
  const [history, setHistory] = useState<CommandHistoryEntry[]>([
    {
      command: '',
      output: `Welcome to AliTech Hands-on Cloud & Security Sandbox (${lab.environment}).\nType required commands or type 'help' for instructions. All session telemetry is isolated.`
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleRunCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim();
    if (!cmd) return;

    if (cmd.toLowerCase() === 'clear') {
      setHistory([]);
      setInputVal('');
      return;
    }

    if (cmd.toLowerCase() === 'help') {
      setHistory((prev) => [
        ...prev,
        {
          command: cmd,
          output: `Interactive Cloud Shell Help:\nReview the tasks on the right pane. Type each expected command exactly as guided.\nUseful commands:\n- clear : Clear terminal screen\n- tasks : List pending tasks\n- guide : Show lab instructions`
        }
      ]);
      setInputVal('');
      return;
    }

    // Check if matches any pending task
    let output = '';
    let matchedTask = false;

    for (const task of lab.tasks) {
      if (!completedTaskIds.includes(task.id)) {
        // Compare normalized command
        if (
          cmd.toLowerCase() === task.expectedCommand.toLowerCase() ||
          cmd.replace(/\s+/g, ' ').toLowerCase() === task.expectedCommand.replace(/\s+/g, ' ').toLowerCase()
        ) {
          matchedTask = true;
          output = task.outputHint;
          const nextCompleted = [...completedTaskIds, task.id];
          setCompletedTaskIds(nextCompleted);

          if (nextCompleted.length === lab.tasks.length) {
            onComplete();
          }
          break;
        }
      }
    }

    if (!matchedTask) {
      // General fallbacks for common exploratory commands
      if (cmd.startsWith('ls')) {
        output = 'blueprints/   configs/   terraform.tfvars   app_server.py   README.md';
      } else if (cmd.startsWith('pwd')) {
        output = `/home/student/${lab.initialDirectory}`;
      } else if (cmd.startsWith('whoami')) {
        output = 'student@alitech.co.zm [IAM Role: DeveloperSandbox]';
      } else if (cmd.startsWith('date')) {
        output = new Date().toUTCString();
      } else {
        output = `Executed: [${cmd}]\nCommand ran successfully with return code 0. (Hint: check current task instructions for exact parameters).`;
      }
    }

    setHistory((prev) => [
      ...prev,
      {
        command: cmd,
        output: output,
        isTaskComplete: matchedTask
      }
    ]);
    setInputVal('');
  };

  const handleInsertCommand = (cmd: string) => {
    setInputVal(cmd);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
      {/* Terminal Output & Input Panel */}
      <div className="lg:col-span-8 flex flex-col h-[520px] bg-slate-950 font-mono text-xs">
        {/* Terminal Header */}
        <div className="px-4 py-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
            </div>
            <span className="text-slate-400 font-semibold text-[11px] ml-2 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-teal-400" />
              <span>alitech-cloud-shell ({lab.environment})</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] text-teal-400 bg-teal-950/60 px-2 py-0.5 rounded border border-teal-800/60">
              Session Connected
            </span>
          </div>
        </div>

        {/* Scrollable Output */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 text-slate-300">
          {history.map((h, i) => (
            <div key={i} className="space-y-1">
              {h.command && (
                <div className="flex items-center gap-2 text-teal-400">
                  <span className="text-slate-500">{lab.prompt}</span>
                  <span className="font-semibold text-white">{h.command}</span>
                </div>
              )}
              <pre className="whitespace-pre-wrap text-slate-300 leading-relaxed font-mono">
                {h.output}
              </pre>
              {h.isTaskComplete && (
                <div className="text-emerald-400 text-[11px] font-sans font-medium flex items-center gap-1 pt-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Task validated successfully!</span>
                </div>
              )}
            </div>
          ))}
          <div ref={terminalEndRef} />
        </div>

        {/* Command Input Form */}
        <form onSubmit={handleRunCommand} className="p-3 bg-slate-900 border-t border-slate-800 flex items-center gap-2">
          <span className="text-slate-400 select-none">{lab.prompt}</span>
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Type command and press Enter (e.g. gcloud auth list)..."
            className="flex-1 bg-transparent text-white focus:outline-hidden font-mono text-xs placeholder:text-slate-600"
            autoFocus
          />
          <button
            type="submit"
            className="px-3 py-1 bg-teal-600 hover:bg-teal-700 text-white rounded font-sans text-xs font-semibold transition-colors"
          >
            Run
          </button>
        </form>
      </div>

      {/* Lab Tasks & Step Guide */}
      <div className="lg:col-span-4 p-5 bg-slate-900 text-slate-200 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-slate-800">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-bold tracking-wider text-teal-400">Lab Validation Tasks</span>
            <span className="text-xs font-mono text-slate-400">
              {completedTaskIds.length}/{lab.tasks.length} Completed
            </span>
          </div>

          <div className="space-y-3">
            {lab.tasks.map((task, index) => {
              const isDone = completedTaskIds.includes(task.id);
              return (
                <div
                  key={task.id}
                  className={`p-3 rounded-xl border transition-colors ${
                    isDone
                      ? 'bg-emerald-950/20 border-emerald-800 text-slate-200'
                      : 'bg-slate-950/50 border-slate-800 text-slate-300'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    {isDone ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    ) : (
                      <Circle className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
                    )}
                    <div className="space-y-1.5 flex-1">
                      <p className="text-xs leading-snug font-medium">
                        {index + 1}. {task.instruction}
                      </p>
                      <button
                        type="button"
                        onClick={() => handleInsertCommand(task.expectedCommand)}
                        className="text-[11px] font-mono text-teal-300 hover:text-teal-200 bg-slate-900 hover:bg-slate-800 px-2 py-0.5 rounded border border-slate-700 block text-left"
                      >
                        Copy: {task.expectedCommand}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800 mt-4">
          {completedTaskIds.length === lab.tasks.length ? (
            <div className="p-3 rounded-xl bg-emerald-900/30 border border-emerald-700 text-center space-y-1">
              <span className="text-xs font-bold text-emerald-300 flex items-center justify-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Lab Completed!
              </span>
              <p className="text-[11px] text-emerald-200">
                You have demonstrated competency in this hands-on environment.
              </p>
            </div>
          ) : (
            <p className="text-[11px] text-slate-500 text-center">
              Execute each guided command in the terminal prompt to complete the lab.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
