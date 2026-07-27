import { forwardRef } from 'react';
import { useResumeStore } from '../../store/useResumeStore';

import { Mail, Phone, MapPin, Clock, Globe } from 'lucide-react';

const GithubIcon = ({ size = 14, className = "" }: { size?: number, className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
);

const LinkedinIcon = ({ size = 14, className = "" }: { size?: number, className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
);

const LeetcodeIcon = ({ size = 14, className = "" }: { size?: number, className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.824-.662l-4.332-4.363c-.467-.467-.702-1.15-.702-1.863s.235-1.357.702-1.824l4.319-4.38c.467-.467 1.125-.645 1.837-.645s1.357.195 1.823.662l2.697 2.606c.514.515 1.365.497 1.9-.038.535-.536.553-1.387.039-1.901l-2.609-2.636a5.055 5.055 0 0 0-2.445-1.337l2.467-2.503c.516-.514.498-1.366-.037-1.901-.535-.535-1.387-.552-1.902-.038l-10.1 10.101c-.981.982-1.494 2.337-1.494 3.835 0 1.498.513 2.895 1.494 3.875l4.347 4.361c.981.979 2.337 1.452 3.834 1.452s2.853-.473 3.835-1.452l2.609-2.636c.514-.514.496-1.365-.039-1.9-.535-.535-1.386-.553-1.9-.038zm-11.956-6.31h10.963c.732 0 1.326-.595 1.326-1.326 0-.732-.594-1.326-1.326-1.326h-10.963c-.732 0-1.326.594-1.326 1.326 0 .731.594 1.326 1.326 1.326z" />
    </svg>
);

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
                    <h2 className="text-xl font-medium mb-3" style={{ color: resume.themeColor }}>{profile.title}</h2>
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
                                        <div className="text-sm font-medium mb-2" style={{ color: resume.themeColor }}>{exp.company} | {exp.location}</div>
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
                                            <div className="text-sm font-medium mb-1" style={{ color: resume.themeColor }}>{edu.institution}</div>

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
                    {/* Contact */}
                    {(profile.phone || profile.email || profile.location) && (
                        <section>
                            <h3 className="text-sm font-bold uppercase tracking-widest border-b border-gray-300 pb-2 text-gray-800">Contact</h3>
                            <Spacer size={16} />
                            <div className="space-y-3 text-sm text-gray-600">
                                {profile.phone && (
                                    <div className="flex items-center">
                                        <span className="w-4 h-4 mr-2 flex items-center justify-center"><Phone size={14} /></span>
                                        <span className="break-all">{profile.phone}</span>
                                    </div>
                                )}
                                {profile.email && (
                                    <div className="flex items-center">
                                        <span className="w-4 h-4 mr-2 flex items-center justify-center"><Mail size={14} /></span>
                                        <span className="break-all">{profile.email}</span>
                                    </div>
                                )}
                                {profile.location && (
                                    <div className="flex items-start">
                                        <span className="w-4 h-4 mr-2 flex items-center justify-center mt-0.5"><MapPin size={14} /></span>
                                        <span className="whitespace-pre-wrap">{profile.location}</span>
                                    </div>
                                )}
                            </div>
                            <Spacer size={24} />
                        </section>
                    )}

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
                            <Spacer size={24} />
                        </section>
                    )}

                    {/* Links */}
                    {(profile.linkedin || profile.github || profile.leetcode || profile.website) && (
                        <section>
                            <h3 className="text-sm font-bold uppercase tracking-widest border-b border-gray-300 pb-2 text-gray-800">Links</h3>
                            <Spacer size={16} />
                            <div className="space-y-3 text-sm text-gray-600">
                                {profile.linkedin && (
                                    <div className="flex items-center">
                                        <span className="w-4 h-4 mr-2 flex items-center justify-center"><LinkedinIcon size={14} /></span>
                                        <span className="break-all">{profile.linkedin}</span>
                                    </div>
                                )}
                                {profile.github && (
                                    <div className="flex items-center">
                                        <span className="w-4 h-4 mr-2 flex items-center justify-center"><GithubIcon size={14} /></span>
                                        <span className="break-all">{profile.github}</span>
                                    </div>
                                )}
                                {profile.leetcode && (
                                    <div className="flex items-center">
                                        <span className="w-4 h-4 mr-2 flex items-center justify-center"><LeetcodeIcon size={14} /></span>
                                        <span className="break-all">{profile.leetcode}</span>
                                    </div>
                                )}
                                {profile.website && (
                                    <div className="flex items-center">
                                        <span className="w-4 h-4 mr-2 flex items-center justify-center"><Globe size={14} /></span>
                                        <span className="break-all">{profile.website}</span>
                                    </div>
                                )}
                            </div>
                            <Spacer size={24} />
                        </section>
                    )}

                    {/* Notice Period */}
                    {profile.noticePeriod && (
                        <section>
                            <h3 className="text-sm font-bold uppercase tracking-widest border-b border-gray-300 pb-2 text-gray-800">Notice Period</h3>
                            <Spacer size={16} />
                            <div className="space-y-3 text-sm text-gray-600">
                                <div className="flex items-center">
                                    <span className="w-4 h-4 mr-2 flex items-center justify-center"><Clock size={14} /></span>
                                    <span className="break-all">{profile.noticePeriod}</span>
                                </div>
                            </div>
                            <Spacer size={24} />
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
});

ResumePreview.displayName = 'ResumePreview';
