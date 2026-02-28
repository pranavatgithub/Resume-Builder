import { forwardRef } from 'react';
import { useResumeStore } from '../../store/useResumeStore';

import { Mail, Phone, MapPin, Linkedin } from 'lucide-react';

// Spacer component for PDF-safe spacing
const Spacer = ({ size }: { size: number }) => (
    <div style={{ height: size, minHeight: size, maxHeight: size }} />
);

export const ResumePreview = forwardRef<HTMLDivElement>((_props, ref) => {
    const { resumes, selectedResumeId } = useResumeStore();
    const resume = resumes.find(r => r.id === selectedResumeId);

    if (!resume) {
        return <div className="flex justify-center items-center h-full text-gray-500">No resume selected</div>;
    }

    const { profile, experience, education, skills } = resume;

    return (
        <div className="flex justify-center p-8 bg-gray-100 min-h-screen overflow-y-auto">
            {/* A4 Paper */}
            <div
                ref={ref}
                data-pdf-target="true"
                className="w-[210mm] min-h-[297mm] bg-white text-black leading-normal shadow-lg p-[15mm] box-border"
                style={{ fontFamily: 'Inter, sans-serif' }}
            >
                {/* Header */}
                <div className="border-b-2 border-gray-900">
                    <h1 className="text-4xl font-bold uppercase tracking-tight mb-2 text-gray-900">{profile.fullName}</h1>
                    <h2 className="text-xl text-blue-600 font-medium mb-3">{profile.title}</h2>

                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600 mb-4">
                        {profile.phone && (
                            <div className="flex items-center">
                                <span className="w-4 h-4 mr-2 flex items-center justify-center translate-y-[1px]"><Phone size={14} /></span>
                                <span>{profile.phone}</span>
                            </div>
                        )}
                        {profile.email && (
                            <div className="flex items-center">
                                <span className="w-4 h-4 mr-2 flex items-center justify-center translate-y-[1px]"><Mail size={14} /></span>
                                <span>{profile.email}</span>
                            </div>
                        )}
                        {profile.location && (
                            <div className="flex items-center">
                                <span className="w-4 h-4 mr-2 flex items-center justify-center translate-y-[1px]"><MapPin size={14} /></span>
                                <span>{profile.location}</span>
                            </div>
                        )}
                        {profile.linkedin && (
                            <div className="flex items-center">
                                <span className="w-4 h-4 mr-2 flex items-center justify-center translate-y-[1px]"><Linkedin size={14} /></span>
                                <span>linkedin.com</span>
                            </div>
                        )}
                    </div>
                </div>

                <Spacer size={24} />

                <div className="grid grid-cols-12 gap-8">
                    {/* Left Column (Main Content) */}
                    <div className="col-span-8">

                        {/* Summary */}
                        {profile.summary && (
                            <section>
                                <h3 className="text-sm font-bold uppercase tracking-widest border-b border-gray-300 pb-2 text-gray-800">Summary</h3>
                                <Spacer size={12} />
                                <p className="text-sm text-gray-700 text-justify leading-relaxed">
                                    {profile.summary}
                                </p>
                                <Spacer size={24} />
                            </section>
                        )}

                        {/* Experience */}
                        {experience.length > 0 && (
                            <section>
                                <h3 className="text-sm font-bold uppercase tracking-widest border-b border-gray-300 pb-2 text-gray-800">Experience</h3>
                                <Spacer size={16} />
                                <div className="space-y-4">
                                    {experience.map((exp) => (
                                        <div key={exp.id}>
                                            <div className="flex justify-between items-baseline mb-1">
                                                <h4 className="font-bold text-gray-900 leading-tight">{exp.title}</h4>
                                                <span className="text-xs text-gray-500 font-medium whitespace-nowrap">{exp.startDate} - {exp.endDate}</span>
                                            </div>
                                            <div className="text-blue-600 text-sm font-medium mb-2">{exp.company} | {exp.location}</div>
                                            <ul className="list-disc list-outside ml-4 text-sm text-gray-700 space-y-1">
                                                {exp.description.map((desc, i) => (
                                                    <li key={i} className="pl-1">{desc}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                                <Spacer size={24} />
                            </section>
                        )}

                        {/* Education */}
                        {education.length > 0 && (
                            <section>
                                <h3 className="text-sm font-bold uppercase tracking-widest border-b border-gray-300 pb-2 text-gray-800">Education</h3>
                                <Spacer size={16} />
                                <div className="space-y-4">
                                    {education.map((edu) => (
                                        <div key={edu.id}>
                                            <div className="flex flex-col mb-1">
                                                <h4 className="font-bold text-gray-900 leading-tight mb-1">{edu.degree}</h4>
                                                <div className="text-blue-600 text-sm font-medium mb-1">{edu.institution}</div>

                                                <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 font-medium">
                                                    <div className="flex items-center">
                                                        <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="currentColor">
                                                            <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z" />
                                                        </svg>
                                                        <span>{edu.startDate} - {edu.endDate}</span>
                                                    </div>

                                                    {edu.location && (
                                                        <div className="flex items-center">
                                                            <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="currentColor">
                                                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                                                            </svg>
                                                            <span>{edu.location}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Right Column (Sidebar) */}
                    <div className="col-span-4">
                        {/* Skills */}
                        {skills.length > 0 && (
                            <section>
                                <h3 className="text-sm font-bold uppercase tracking-widest border-b border-gray-300 pb-2 text-gray-800">Skills</h3>
                                <Spacer size={16} />
                                <div className="space-y-4">
                                    {skills.map((skill) => (
                                        <div key={skill.id}>
                                            <h5 className="font-bold text-xs text-gray-900 mb-1">{skill.category}</h5>
                                            <div className="flex flex-wrap gap-2">
                                                {skill.items.map((item, i) => (
                                                    <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-700 font-medium inline-flex items-center justify-center">
                                                        {item}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
});

ResumePreview.displayName = 'ResumePreview';
