import { useState } from 'react';
import { useResumeStore } from '../../store/useResumeStore';
import { User, Briefcase, GraduationCap, Wrench, Plus, Trash2, ChevronDown, ChevronUp, Code, Link } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ResumeList } from './ResumeList';

const SectionHeader = ({ title, icon: Icon, isOpen, onClick }: { title: string, icon: any, isOpen: boolean, onClick: () => void }) => (
    <button
        onClick={onClick}
        className="w-full flex items-center justify-between p-4 bg-zinc-800/30 hover:bg-zinc-800/50 border border-white/5 hover:border-white/10 transition-all rounded-lg mb-2 group"
    >
        <div className="flex items-center gap-3">
            <Icon size={18} className="text-blue-400 group-hover:text-blue-300 transition-colors" />
            <span className="font-medium text-zinc-200 group-hover:text-white">{title}</span>
        </div>
        {isOpen ? <ChevronUp size={16} className="text-zinc-500" /> : <ChevronDown size={16} className="text-zinc-500" />}
    </button>
);

export const Sidebar = () => {
    const {
        resumes,
        selectedResumeId,
        updateProfile,
        addExperience,
        updateExperience,
        removeExperience,
        addEducation,
        updateEducation,
        removeEducation,
        addSkill,
        updateSkill,
        removeSkill,
        addProject,
        updateProject,
        removeProject
    } = useResumeStore();

    const resume = resumes.find(r => r.id === selectedResumeId);

    const [activeSection, setActiveSection] = useState<string | null>('profile');

    const toggleSection = (section: string) => {
        setActiveSection(activeSection === section ? null : section);
    };

    if (!resume) {
        return (
            <div className="w-full h-full p-6 text-zinc-400">
                <h2 className="text-xl font-bold mb-6 text-white tracking-tight">Resume Builder</h2>
                <ResumeList />
                <div className="mt-8 text-center text-zinc-500 text-sm">
                    Select or create a resume to start editing.
                </div>
            </div>
        );
    }

    const inputClasses = "w-full bg-zinc-900/50 text-zinc-100 p-2.5 rounded-lg border border-white/10 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 outline-none transition-all placeholder:text-zinc-600 text-sm";
    const labelClasses = "block text-xs font-medium text-zinc-400 mb-1.5 uppercase tracking-wide";

    return (
        <div className="w-full h-full overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent">
            <h2 className="text-xl font-bold mb-6 text-white tracking-tight">Resume Builder</h2>
            <ResumeList />

            {/* Profile Section */}
            <div className="mb-4">
                <SectionHeader
                    title="Profile"
                    icon={User}
                    isOpen={activeSection === 'profile'}
                    onClick={() => toggleSection('profile')}
                />
                <AnimatePresence>
                    {activeSection === 'profile' && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                        >
                            <div className="p-4 space-y-4 bg-zinc-800/20 rounded-lg border border-white/5 mb-2">
                                <div>
                                    <label htmlFor="fullName" className={labelClasses}>Full Name</label>
                                    <input
                                        id="fullName"
                                        type="text"
                                        value={resume.profile.fullName}
                                        onChange={(e) => updateProfile({ fullName: e.target.value })}
                                        className={inputClasses}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="title" className={labelClasses}>Title</label>
                                    <input
                                        id="title"
                                        type="text"
                                        value={resume.profile.title}
                                        onChange={(e) => updateProfile({ title: e.target.value })}
                                        className={inputClasses}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="email" className={labelClasses}>Email</label>
                                        <input
                                            id="email"
                                            type="email"
                                            value={resume.profile.email}
                                            onChange={(e) => updateProfile({ email: e.target.value })}
                                            className={inputClasses}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="phone" className={labelClasses}>Phone</label>
                                        <input
                                            id="phone"
                                            type="text"
                                            value={resume.profile.phone}
                                            onChange={(e) => updateProfile({ phone: e.target.value })}
                                            className={inputClasses}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="location" className={labelClasses}>Location</label>
                                    <input
                                        id="location"
                                        type="text"
                                        value={resume.profile.location}
                                        onChange={(e) => updateProfile({ location: e.target.value })}
                                        className={inputClasses}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="summary" className={labelClasses}>Summary</label>
                                    <textarea
                                        id="summary"
                                        value={resume.profile.summary}
                                        onChange={(e) => updateProfile({ summary: e.target.value })}
                                        className={`${inputClasses} h-32 resize-none`}
                                    />
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Experience Section */}
            <div className="mb-4">
                <SectionHeader
                    title="Experience"
                    icon={Briefcase}
                    isOpen={activeSection === 'experience'}
                    onClick={() => toggleSection('experience')}
                />
                <AnimatePresence>
                    {activeSection === 'experience' && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                        >
                            <div className="space-y-4 mb-4">
                                {resume.experience.map((exp, index) => (
                                    <div
                                        key={exp.id}
                                        className="p-4 bg-zinc-800/20 rounded-lg border border-white/5 hover:border-white/10 transition-colors"
                                    >
                                        <div className="flex justify-between items-start mb-3">
                                            <h4 className="font-medium text-zinc-200 text-sm">Position #{index + 1}</h4>
                                            <button
                                                onClick={() => removeExperience(exp.id)}
                                                className="text-zinc-500 hover:text-red-400 transition-colors"
                                                aria-label="Remove Experience"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                        <div className="space-y-3">
                                            <input
                                                placeholder="Job Title" aria-label="Job Title"
                                                value={exp.title}
                                                onChange={(e) => updateExperience(exp.id, { title: e.target.value })}
                                                className={inputClasses}
                                            />
                                            <input
                                                placeholder="Company" aria-label="Company"
                                                value={exp.company}
                                                onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                                                className={inputClasses}
                                            />
                                            <div className="grid grid-cols-2 gap-3">
                                                <input
                                                    placeholder="Start Date" aria-label="Start Date"
                                                    value={exp.startDate}
                                                    onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })}
                                                    className={inputClasses}
                                                />
                                                <input
                                                    placeholder="End Date" aria-label="End Date"
                                                    value={exp.endDate}
                                                    onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })}
                                                    className={inputClasses}
                                                />
                                            </div>
                                            <textarea
                                                placeholder="Description (one item per line)" aria-label="Description (one item per line)"
                                                value={Array.isArray(exp.description) ? exp.description.join('\n') : exp.description}
                                                onChange={(e) => updateExperience(exp.id, { description: e.target.value.split('\n') })}
                                                className={`${inputClasses} h-24 resize-none`}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button
                                onClick={addExperience}
                                className="w-full py-2.5 flex items-center justify-center gap-2 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500/20 border border-blue-500/20 transition-all font-medium text-sm"
                            >
                                <Plus size={16} /> Add Experience
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Projects Section */}
            <div className="mb-4">
                <SectionHeader
                    title="Projects"
                    icon={Code}
                    isOpen={activeSection === 'projects'}
                    onClick={() => toggleSection('projects')}
                />
                <AnimatePresence>
                    {activeSection === 'projects' && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                        >
                            <div className="space-y-4 mb-4">
                                {(resume.projects || []).map((project, index) => (
                                    <div
                                        key={project.id}
                                        className="p-4 bg-zinc-800/20 rounded-lg border border-white/5 hover:border-white/10 transition-colors"
                                    >
                                        <div className="flex justify-between items-start mb-3">
                                            <h4 className="font-medium text-zinc-200 text-sm">Project #{index + 1}</h4>
                                            <button
                                                onClick={() => removeProject(project.id)}
                                                className="text-zinc-500 hover:text-red-400 transition-colors"
                                                aria-label="Remove Project"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                        <div className="space-y-3">
                                            <input
                                                placeholder="Project Name" aria-label="Project Name"
                                                value={project.name}
                                                onChange={(e) => updateProject(project.id, { name: e.target.value })}
                                                className={inputClasses}
                                            />
                                            <input
                                                placeholder="Tech Stack (e.g., React, Node.js)" aria-label="Tech Stack (e.g., React, Node.js)"
                                                value={project.techStack}
                                                onChange={(e) => updateProject(project.id, { techStack: e.target.value })}
                                                className={inputClasses}
                                            />
                                            <textarea
                                                placeholder="Description (one item per line)" aria-label="Description (one item per line)"
                                                value={Array.isArray(project.description) ? project.description.join('\n') : project.description || ''}
                                                onChange={(e) => updateProject(project.id, { description: e.target.value.split('\n') })}
                                                className={`${inputClasses} h-24 resize-none`}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button
                                onClick={addProject}
                                className="w-full py-2.5 flex items-center justify-center gap-2 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500/20 border border-blue-500/20 transition-all font-medium text-sm"
                            >
                                <Plus size={16} /> Add Project
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Education Section */}
            <div className="mb-4">
                <SectionHeader
                    title="Education"
                    icon={GraduationCap}
                    isOpen={activeSection === 'education'}
                    onClick={() => toggleSection('education')}
                />
                <AnimatePresence>
                    {activeSection === 'education' && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                        >
                            <div className="space-y-4 mb-4">
                                {resume.education.map((edu, index) => (
                                    <div
                                        key={edu.id}
                                        className="p-4 bg-zinc-800/20 rounded-lg border border-white/5 hover:border-white/10 transition-colors"
                                    >
                                        <div className="flex justify-between items-start mb-3">
                                            <h4 className="font-medium text-zinc-200 text-sm">Education #{index + 1}</h4>
                                            <button
                                                onClick={() => removeEducation(edu.id)}
                                                className="text-zinc-500 hover:text-red-400 transition-colors"
                                                aria-label="Remove Education"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                        <div className="space-y-3">
                                            <input
                                                placeholder="School / University" aria-label="School / University"
                                                value={edu.institution}
                                                onChange={(e) => updateEducation(edu.id, { institution: e.target.value })}
                                                className={inputClasses}
                                            />
                                            <input
                                                placeholder="Degree" aria-label="Degree"
                                                value={edu.degree}
                                                onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                                                className={inputClasses}
                                            />
                                            <input
                                                placeholder="Location" aria-label="Location"
                                                value={edu.location}
                                                onChange={(e) => updateEducation(edu.id, { location: e.target.value })}
                                                className={inputClasses}
                                            />
                                            <div className="grid grid-cols-2 gap-3">
                                                <input
                                                    placeholder="Start Date" aria-label="Start Date"
                                                    value={edu.startDate}
                                                    onChange={(e) => updateEducation(edu.id, { startDate: e.target.value })}
                                                    className={inputClasses}
                                                />
                                                <input
                                                    placeholder="End Date" aria-label="End Date"
                                                    value={edu.endDate}
                                                    onChange={(e) => updateEducation(edu.id, { endDate: e.target.value })}
                                                    className={inputClasses}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button
                                onClick={addEducation}
                                className="w-full py-2.5 flex items-center justify-center gap-2 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500/20 border border-blue-500/20 transition-all font-medium text-sm"
                            >
                                <Plus size={16} /> Add Education
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Skills Section */}
            <div className="mb-4">
                <SectionHeader
                    title="Skills"
                    icon={Wrench}
                    isOpen={activeSection === 'skills'}
                    onClick={() => toggleSection('skills')}
                />
                <AnimatePresence>
                    {activeSection === 'skills' && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                        >
                            <div className="space-y-4 mb-4">
                                {resume.skills.map((skill) => (
                                    <div key={skill.id} className="p-4 bg-zinc-800/20 rounded-lg border border-white/5 hover:border-white/10 transition-colors">
                                        <div className="flex justify-between items-start mb-3">
                                            <input
                                                placeholder="Category" aria-label="Category"
                                                value={skill.category}
                                                onChange={(e) => updateSkill(skill.id, { category: e.target.value })}
                                                className="bg-transparent text-zinc-200 font-medium focus:outline-none border-b border-white/10 focus:border-blue-500/50 pb-1 text-sm w-full mr-2"
                                            />
                                            <button
                                                onClick={() => removeSkill(skill.id)}
                                                className="text-zinc-500 hover:text-red-400 transition-colors"
                                                aria-label="Remove Skill Classification"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                        <input
                                            placeholder="Skills (comma separated)" aria-label="Skills (comma separated)"
                                            value={skill.items.join(', ')}
                                            onChange={(e) => updateSkill(skill.id, { items: e.target.value.split(',').map(s => s.trim()) })}
                                            className={inputClasses}
                                        />
                                    </div>
                                ))}
                            </div>
                            <button
                                onClick={addSkill}
                                className="w-full py-2.5 flex items-center justify-center gap-2 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500/20 border border-blue-500/20 transition-all font-medium text-sm"
                            >
                                <Plus size={16} /> Add Skill Category
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Links Section */}
            <div className="mb-4">
                <SectionHeader
                    title="Links"
                    icon={Link}
                    isOpen={activeSection === 'links'}
                    onClick={() => toggleSection('links')}
                />
                <AnimatePresence>
                    {activeSection === 'links' && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                        >
                            <div className="p-4 space-y-4 bg-zinc-800/20 rounded-lg border border-white/5 mb-2">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className={labelClasses}>LinkedIn</label>
                                        <input
                                            type="text"
                                            placeholder="linkedin.com/in/username" aria-label="linkedin.com/in/username"
                                            value={resume.profile.linkedin || ''}
                                            onChange={(e) => updateProfile({ linkedin: e.target.value })}
                                            className={inputClasses}
                                        />
                                    </div>
                                    <div>
                                        <label className={labelClasses}>GitHub</label>
                                        <input
                                            type="text"
                                            placeholder="github.com/username" aria-label="github.com/username"
                                            value={resume.profile.github || ''}
                                            onChange={(e) => updateProfile({ github: e.target.value })}
                                            className={inputClasses}
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <label className={labelClasses}>Website / Portfolio</label>
                                        <input
                                            type="text"
                                            placeholder="yourwebsite.com" aria-label="yourwebsite.com"
                                            value={resume.profile.website || ''}
                                            onChange={(e) => updateProfile({ website: e.target.value })}
                                            className={inputClasses}
                                        />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
