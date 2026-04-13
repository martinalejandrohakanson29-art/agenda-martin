import { useState } from "react";

type Subtask = {
  id: string;
  title: string;
  completed: boolean;
};

type Task = {
  id: string;
  title: string;
  completed: boolean;
  subtasks: Subtask[];
};

type Note = {
  id: string;
  content: string;
  category?: string;
};

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Refactor global navigation logic",
      completed: false,
      subtasks: [
        { id: "1-1", title: "Update Tailwind config to v3.4", completed: true },
        { id: "1-2", title: "Verify JSON mapping protocols", completed: false },
      ],
    },
    {
      id: "2",
      title: "Review architectural minimalist guidelines",
      completed: false,
      subtasks: [],
    },
    {
      id: "3",
      title: "Design System \"No-Line\" audit",
      completed: true,
      subtasks: [],
    },
  ]);

  const [notes, setNotes] = useState<Note[]>([
    {
      id: "1",
      content: "\"Luxury is the ease of a focus state.\"",
    },
    {
      id: "2",
      category: "Ideation",
      content: "Explore glassmorphism for the desktop view expansion.",
    },
    {
      id: "3",
      content: "Call David about the typography licensing for Inter Premium.",
    },
  ]);

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newNoteContent, setNewNoteContent] = useState("");
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [isAddingTask, setIsAddingTask] = useState(false);

  const toggleTask = (taskId: string) => {
    setTasks(tasks.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t));
  };

  const toggleSubtask = (taskId: string, subtaskId: string) => {
    setTasks(tasks.map(t => {
      if (t.id === taskId) {
        return {
          ...t,
          subtasks: t.subtasks.map(st => st.id === subtaskId ? { ...st, completed: !st.completed } : st)
        };
      }
      return t;
    }));
  };

  const addTask = () => {
    if (!newTaskTitle.trim()) {
      setIsAddingTask(false);
      return;
    }
    setTasks([
      { id: Date.now().toString(), title: newTaskTitle, completed: false, subtasks: [] },
      ...tasks
    ]);
    setNewTaskTitle("");
    setIsAddingTask(false);
  };

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter(t => t.id !== taskId));
  };

  const addNote = () => {
    if (!newNoteContent.trim()) {
      setIsAddingNote(false);
      return;
    }
    setNotes([
      { id: Date.now().toString(), content: newNoteContent },
      ...notes
    ]);
    setNewNoteContent("");
    setIsAddingNote(false);
  };

  const deleteNote = (noteId: string) => {
    setNotes(notes.filter(n => n.id !== noteId));
  };

  const addSubtask = (taskId: string) => {
    const title = prompt("Subtask title:");
    if (!title) return;
    setTasks(tasks.map(t => {
      if (t.id === taskId) {
        return {
          ...t,
          subtasks: [...t.subtasks, { id: Date.now().toString(), title, completed: false }]
        };
      }
      return t;
    }));
  };

  return (
    <div className="bg-background min-h-screen selection:bg-tertiary-container/20">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-[#f8f9fa]/80 dark:bg-slate-950/80 backdrop-blur-xl font-['Inter'] antialiased tracking-tight">
        <div className="flex items-center justify-between px-8 py-4 w-full max-w-7xl mx-auto">
          <div className="text-xl font-semibold tracking-tighter text-[#2b3437] dark:text-slate-100 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-tertiary-container flex items-center justify-center text-white">
              <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>spa</span>
            </span>
            Sanctuary
          </div>
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex items-center gap-8 text-[13px] font-medium uppercase tracking-widest text-[#2b3437]/60">
              <a className="text-[#007aff] dark:text-[#0a84ff] font-medium" href="#">Dashboard</a>
              <a className="hover:bg-[#f1f4f6] dark:hover:bg-slate-800 transition-colors duration-300 px-3 py-1 rounded-md" href="#">Calendar</a>
              <a className="hover:bg-[#f1f4f6] dark:hover:bg-slate-800 transition-colors duration-300 px-3 py-1 rounded-md" href="#">Focus</a>
            </nav>
            <div className="flex items-center gap-4">
              <button className="material-symbols-outlined text-on-surface-variant hover:bg-[#f1f4f6] p-2 rounded-full transition-colors">search</button>
              <button className="material-symbols-outlined text-on-surface-variant hover:bg-[#f1f4f6] p-2 rounded-full transition-colors">settings</button>
              <img alt="User profile" className="w-8 h-8 rounded-full bg-surface-container-high object-cover" src="https://ui-avatars.com/api/?name=User&background=cfd5dd&color=4c5259" />
            </div>
          </div>
        </div>
      </header>

      <main className="pt-24 pb-32 px-6 max-w-7xl mx-auto min-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Tasks Section */}
          <section className="lg:col-span-7 space-y-8">
            <div className="flex items-baseline justify-between">
              <div>
                <h1 className="text-[3.5rem] font-bold tracking-[-0.04em] leading-none text-on-surface">Mis Pendientes</h1>
                <p className="text-on-surface-variant mt-3 text-lg font-light">
                  {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                </p>
              </div>
              <button 
                onClick={() => setIsAddingTask(true)}
                className="group flex items-center gap-2 bg-tertiary-container text-on-tertiary-fixed px-6 py-3 rounded-full font-medium transition-all hover:scale-105 active:scale-95 shadow-sm"
              >
                <span className="material-symbols-outlined">add</span>
                New Task
              </button>
            </div>

            <div className="space-y-4 mt-8">
              {isAddingTask && (
                <div className="flex items-center gap-4 p-2">
                   <input 
                     autoFocus
                     type="text" 
                     value={newTaskTitle}
                     onChange={e => setNewTaskTitle(e.target.value)}
                     onKeyDown={e => e.key === 'Enter' && addTask()}
                     onBlur={addTask}
                     placeholder="Type a new task..." 
                     className="w-full bg-surface-container-lowest border-2 border-outline-variant/30 rounded-xl px-4 py-3 focus:outline-none focus:border-tertiary-container transition-colors font-medium text-lg text-on-surface"
                   />
                </div>
              )}

              {tasks.map(task => (
                <div key={task.id} className="group flex flex-col p-2 transition-all duration-300 rounded-xl hover:bg-surface-container-lowest">
                  <div className="flex items-center gap-4 group/item">
                    <input 
                      checked={task.completed}
                      onChange={() => toggleTask(task.id)}
                      className="w-6 h-6 rounded-full border-2 border-outline-variant text-tertiary-container focus:ring-tertiary/20 focus:ring-offset-0 cursor-pointer" 
                      type="checkbox"
                    />
                    <span onClick={() => toggleTask(task.id)} className={`flex-grow text-lg font-medium cursor-pointer transition-colors ${task.completed ? 'text-on-surface-variant line-through opacity-50' : 'text-on-surface'}`}>
                      {task.title}
                    </span>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {!task.completed && (
                        <button onClick={() => addSubtask(task.id)} className="p-2 hover:bg-surface-container-low rounded-lg text-on-surface-variant" title="Add Subtask">
                          <span className="material-symbols-outlined text-sm">add</span>
                        </button>
                      )}
                      <button onClick={() => deleteTask(task.id)} className="p-2 hover:bg-error-container/10 rounded-lg text-error" title="Delete Task">
                        <span className="material-symbols-outlined text-sm">delete</span>
                      </button>
                    </div>
                  </div>

                  {/* Subtasks */}
                  {task.subtasks.length > 0 && (
                    <div className="ml-10 mt-3 space-y-2 border-l-2 border-surface-container-high pl-6">
                      {task.subtasks.map(subtask => (
                        <div key={subtask.id} className="flex items-center gap-3 py-1 group/subtask">
                          <input 
                            checked={subtask.completed}
                            onChange={() => toggleSubtask(task.id, subtask.id)}
                            className="w-5 h-5 rounded-md border-2 border-outline-variant text-tertiary-container focus:ring-0 cursor-pointer" 
                            type="checkbox"
                          />
                          <span className={`text-sm cursor-pointer transition-colors ${subtask.completed ? 'text-on-surface-variant line-through opacity-50' : 'text-on-surface-variant'}`} onClick={() => toggleSubtask(task.id, subtask.id)}>
                            {subtask.title}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Sidebar / Notes */}
          <section className="lg:col-span-5 flex flex-col gap-8">
            <div className="bg-surface-container-low rounded-[2rem] p-8 min-h-[500px]">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-on-surface">Notas Rápidas</h2>
                {notes.length > 0 && (
                  <button onClick={() => setNotes([])} className="text-tertiary-fixed text-sm font-medium hover:underline">Clear all</button>
                )}
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {notes.map(note => (
                  <div key={note.id} className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-outline-variant/10 group relative transition-all hover:-translate-y-1">
                    <div className="flex flex-col gap-2">
                      {note.category && (
                        <span className="text-[10px] font-bold uppercase tracking-widest text-tertiary">{note.category}</span>
                      )}
                      <p className={`text-sm leading-relaxed ${note.category ? 'text-on-surface' : 'text-on-surface-variant italic'}`}>
                        {note.content}
                      </p>
                    </div>
                    <button onClick={() => deleteNote(note.id)} className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity text-error/40 hover:text-error">
                      <span className="material-symbols-outlined text-sm">delete</span>
                    </button>
                  </div>
                ))}

                {isAddingNote ? (
                  <div className="bg-surface-container-lowest border-2 border-tertiary-container rounded-2xl p-4 flex flex-col gap-2">
                    <textarea 
                      autoFocus
                      rows={3}
                      value={newNoteContent}
                      onChange={(e) => setNewNoteContent(e.target.value)}
                      onBlur={addNote}
                      placeholder="Escribe una nota..."
                      className="w-full text-sm bg-transparent border-none outline-none resize-none placeholder:text-outline-variant text-on-surface"
                    />
                  </div>
                ) : (
                  <button onClick={() => setIsAddingNote(true)} className="border-2 border-dashed border-outline-variant/30 rounded-2xl p-6 flex flex-col items-center justify-center gap-2 hover:bg-surface-container-high/50 transition-colors group min-h-[140px]">
                    <span className="material-symbols-outlined text-outline-variant group-hover:text-tertiary transition-colors">edit_note</span>
                    <span className="text-xs font-medium text-outline-variant group-hover:text-tertiary transition-colors">Nueva Nota</span>
                  </button>
                )}
              </div>
              
              <div className="mt-8 rounded-2xl overflow-hidden aspect-[16/9] relative group">
                <img alt="Minimalist desk" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2b3437]/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="text-[10px] font-bold tracking-widest uppercase opacity-80">Daily Inspiration</p>
                  <p className="text-sm font-medium">Keep your desk quiet.</p>
                </div>
              </div>
            </div>
          </section>

        </div>
      </main>
      
      {/* Mobile Nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-6 pb-8 pt-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl rounded-t-[32px] shadow-[0_-8px_30px_rgb(0,0,0,0.04)] border-t-[0.5px] border-black/5">
        <a className="flex flex-col items-center justify-center text-[#007aff] dark:text-[#0a84ff] scale-110" href="#">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>task_alt</span>
          <span className="text-[11px] font-medium uppercase tracking-widest mt-1">Pendientes</span>
        </a>
        <a className="flex flex-col items-center justify-center text-[#2b3437]/40 dark:text-slate-500 active:scale-90 transition-all duration-300" href="#">
          <span className="material-symbols-outlined">edit_note</span>
          <span className="text-[11px] font-medium uppercase tracking-widest mt-1">Notas</span>
        </a>
      </nav>
      
      <button onClick={() => setIsAddingTask(true)} className="md:hidden fixed right-6 bottom-24 bg-tertiary-container text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg shadow-tertiary-container/30 active:scale-90 transition-transform">
        <span className="material-symbols-outlined">add</span>
      </button>

    </div>
  );
}
