import { useState } from 'react';
import { useResumeStore } from '../../store/useResumeStore';
import { Plus, Copy, Trash2, Check, FileText, Edit2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ResumeList = () => {
    const { resumes, selectedResumeId, selectResume, addResume, cloneResume, deleteResume, updateResumeTitle } = useResumeStore();
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editValue, setEditValue] = useState('');
    const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

    const startEditing = (id: string, currentTitle: string) => {
        setEditingId(id);
        setEditValue(currentTitle);
        setDeleteConfirmId(null);
    };

    const saveTitle = () => {
        if (editingId && editValue.trim()) {
            updateResumeTitle(editingId, editValue.trim());
        }
        setEditingId(null);
        setEditValue('');
    };

    const handleDeleteClick = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        if (deleteConfirmId === id) {
            deleteResume(id);
            setDeleteConfirmId(null);
        } else {
            setDeleteConfirmId(id);
            // Auto reset confirm state after 3 seconds
            setTimeout(() => setDeleteConfirmId(prev => prev === id ? null : prev), 3000);
        }
    };

    return (
        <div className="mb-6 space-y-3">
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">My Resumes</h3>
                <button
                    onClick={addResume}
                    className="p-1.5 text-blue-400 hover:bg-blue-400/10 rounded transition-colors"
                    title="Create New Resume"
                >
                    <Plus size={16} />
                </button>
            </div>

            <div className="space-y-2">
                <AnimatePresence initial={false} mode="popLayout">
                    {resumes.map((resume) => (
                        <motion.div
                            layout
                            key={resume.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9, height: 0, marginBottom: 0, overflow: 'hidden' }}
                            transition={{ duration: 0.2 }}
                            className={`group flex items-center justify-between p-3 rounded-lg border transition-colors ${selectedResumeId === resume.id
                                    ? 'bg-blue-600/10 border-blue-500/50'
                                    : 'bg-white/5 border-white/5 hover:bg-white/10'
                                }`}
                        >
                            {editingId === resume.id ? (
                                <div className="flex-1 flex items-center gap-2">
                                    <FileText size={20} className="text-blue-400 shrink-0" />
                                    <input
                                        type="text"
                                        autoFocus
                                        value={editValue}
                                        onChange={(e) => setEditValue(e.target.value)}
                                        onBlur={saveTitle}
                                        onKeyDown={(e) => e.key === 'Enter' && saveTitle()}
                                        className="w-full bg-black/20 text-white text-sm px-2 py-1 rounded border border-blue-500/50 focus:outline-none"
                                        onClick={(e) => e.stopPropagation()}
                                    />
                                </div>
                            ) : (
                                <button
                                    onClick={() => selectResume(resume.id)}
                                    className="flex-1 text-left flex items-center gap-3 overflow-hidden"
                                >
                                    <FileText
                                        size={selectedResumeId === resume.id ? 20 : 18}
                                        className={`shrink-0 transition-all ${selectedResumeId === resume.id ? 'text-blue-400' : 'text-gray-500'}`}
                                    />
                                    <span className={`text-sm truncate transition-colors ${selectedResumeId === resume.id ? 'text-white font-medium' : 'text-gray-300'}`}>
                                        {resume.title}
                                    </span>
                                    {selectedResumeId === resume.id && <Check size={16} className="text-blue-400 shrink-0 ml-auto mr-2" />}
                                </button>
                            )}

                            {editingId !== resume.id && (
                                <div className="flex items-center gap-1 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity pl-2">
                                    {deleteConfirmId === resume.id ? (
                                        <button
                                            onClick={(e) => handleDeleteClick(e, resume.id)}
                                            className="flex items-center gap-1 px-2 py-1 text-xs bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded border border-red-500/20 animate-pulse"
                                            title="Confirm Delete"
                                        >
                                            <Trash2 size={12} /> Confirm
                                        </button>
                                    ) : (
                                        <>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    startEditing(resume.id, resume.title);
                                                }}
                                                className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded"
                                                title="Rename Resume"
                                            >
                                                <Edit2 size={14} />
                                            </button>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    cloneResume(resume.id);
                                                }}
                                                className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded"
                                                title="Clone Resume"
                                            >
                                                <Copy size={14} />
                                            </button>
                                            <button
                                                onClick={(e) => handleDeleteClick(e, resume.id)}
                                                className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded"
                                                title="Delete Resume"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </>
                                    )}
                                </div>
                            )}
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {resumes.length === 0 && (
                <div className="text-sm text-gray-500 text-center py-4">
                    No resumes found. Create one to get started.
                </div>
            )}
        </div>
    );
};
