import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ResumeData, Experience, Education, Skill, Profile } from '../types/resume';
import { v4 as uuidv4 } from 'uuid';

interface ResumeState {
    resumes: ResumeData[];
    selectedResumeId: string | null;
    isLoading: boolean;

    // Actions
    addResume: () => void;
    cloneResume: (id: string) => void;
    deleteResume: (id: string) => void;
    selectResume: (id: string) => void;
    updateResumeTitle: (id: string, title: string) => void;

    updateProfile: (profile: Partial<Profile>) => void;

    addExperience: () => void;
    updateExperience: (id: string, experience: Partial<Experience>) => void;
    removeExperience: (id: string) => void;

    addEducation: () => void;
    updateEducation: (id: string, education: Partial<Education>) => void;
    removeEducation: (id: string) => void;

    addSkill: () => void;
    updateSkill: (id: string, skill: Partial<Skill>) => void;
    removeSkill: (id: string) => void;

    setResume: (data: ResumeData) => void;
    resetResume: () => void;
}

const initialResume: ResumeData = {
    id: 'default',
    title: 'My Resume',
    profile: {
        fullName: 'Your Name',
        title: 'Software Engineer',
        email: 'email@example.com',
        phone: '+1 234 567 890',
        location: 'City, Country',
        summary: 'Brief professional summary...',
        linkedin: '',
        website: '',
    },
    experience: [],
    education: [],
    skills: [],
    createdAt: Date.now(),
    updatedAt: Date.now(),
};

export const useResumeStore = create<ResumeState>()(
    persist(
        (set, get) => ({
            resumes: [initialResume],
            selectedResumeId: initialResume.id,
            isLoading: false,

            // Resume Management Actions
            addResume: () => {
                const newResume: ResumeData = {
                    ...initialResume,
                    id: uuidv4(),
                    title: 'New Resume',
                    createdAt: Date.now(),
                    updatedAt: Date.now(),
                };
                set((state) => ({
                    resumes: [...state.resumes, newResume],
                    selectedResumeId: newResume.id,
                }));
            },

            cloneResume: (id) => {
                const state = get();
                const resumeToClone = state.resumes.find((r) => r.id === id);
                if (!resumeToClone) return;

                const newResume: ResumeData = {
                    ...resumeToClone,
                    id: uuidv4(),
                    title: `${resumeToClone.title} (Copy)`,
                    updatedAt: Date.now(),
                    createdAt: Date.now(),
                };

                set((state) => ({
                    resumes: [...state.resumes, newResume],
                    selectedResumeId: newResume.id,
                }));
            },

            deleteResume: (id) => {
                set((state) => {
                    const newResumes = state.resumes.filter((r) => r.id !== id);
                    let newSelectedId = state.selectedResumeId;

                    if (state.selectedResumeId === id) {
                        newSelectedId = newResumes.length > 0 ? newResumes[0].id : null;
                    }
                    // If we deleted the last one, create a new default one to avoid empty state
                    if (newResumes.length === 0) {
                        const defaultResume = { ...initialResume, id: uuidv4(), createdAt: Date.now(), updatedAt: Date.now() };
                        return { resumes: [defaultResume], selectedResumeId: defaultResume.id };
                    }

                    return {
                        resumes: newResumes,
                        selectedResumeId: newSelectedId,
                    };
                });
            },

            selectResume: (id) => set({ selectedResumeId: id }),

            updateResumeTitle: (id, title) =>
                set((state) => ({
                    resumes: state.resumes.map((r) =>
                        r.id === id ? { ...r, title, updatedAt: Date.now() } : r
                    ),
                })),

            setResume: (data) => {
                set((state) => {
                    // Standard behavior for Import: Replace selected or Add new.
                    // Let's replace the selected one effectively (Import)
                    if (!state.selectedResumeId) return state;

                    const updatedResumes = state.resumes.map(r =>
                        r.id === state.selectedResumeId ? { ...data, id: state.selectedResumeId } : r
                    );
                    return { resumes: updatedResumes };
                });
            },

            resetResume: () => {
                set((state) => {
                    if (!state.selectedResumeId) return state;
                    const resetData = { ...initialResume, id: state.selectedResumeId, title: 'My Resume', createdAt: Date.now(), updatedAt: Date.now() };
                    const updatedResumes = state.resumes.map(r =>
                        r.id === state.selectedResumeId ? resetData : r
                    );
                    return { resumes: updatedResumes };
                })
            },


            // Field Updates - targeting selectedResumeId
            updateProfile: (profile) =>
                set((state) => ({
                    resumes: state.resumes.map((r) =>
                        r.id === state.selectedResumeId
                            ? { ...r, profile: { ...r.profile, ...profile } }
                            : r
                    ),
                })),

            addExperience: () =>
                set((state) => ({
                    resumes: state.resumes.map((r) =>
                        r.id === state.selectedResumeId
                            ? {
                                ...r,
                                experience: [
                                    ...r.experience,
                                    {
                                        id: uuidv4(),
                                        company: '',
                                        title: '',
                                        location: '',
                                        startDate: '',
                                        endDate: '',
                                        current: false,
                                        description: [],
                                    },
                                ],
                            }
                            : r
                    ),
                })),

            updateExperience: (id, experience) =>
                set((state) => ({
                    resumes: state.resumes.map((r) =>
                        r.id === state.selectedResumeId
                            ? {
                                ...r,
                                experience: r.experience.map((exp) =>
                                    exp.id === id ? { ...exp, ...experience } : exp
                                ),
                            }
                            : r
                    ),
                })),

            removeExperience: (id) =>
                set((state) => ({
                    resumes: state.resumes.map((r) =>
                        r.id === state.selectedResumeId
                            ? {
                                ...r,
                                experience: r.experience.filter((exp) => exp.id !== id),
                            }
                            : r
                    ),
                })),


            addEducation: () =>
                set((state) => ({
                    resumes: state.resumes.map((r) =>
                        r.id === state.selectedResumeId
                            ? {
                                ...r,
                                education: [
                                    ...r.education,
                                    {
                                        id: uuidv4(),
                                        institution: '',
                                        degree: '',
                                        location: '',
                                        startDate: '',
                                        endDate: '',
                                        current: false,
                                    },
                                ],
                            }
                            : r
                    ),
                })),

            updateEducation: (id, education) =>
                set((state) => ({
                    resumes: state.resumes.map((r) =>
                        r.id === state.selectedResumeId
                            ? {
                                ...r,
                                education: r.education.map((edu) =>
                                    edu.id === id ? { ...edu, ...education } : edu
                                ),
                            }
                            : r
                    ),
                })),

            removeEducation: (id) =>
                set((state) => ({
                    resumes: state.resumes.map((r) =>
                        r.id === state.selectedResumeId
                            ? {
                                ...r,
                                education: r.education.filter((edu) => edu.id !== id),
                            }
                            : r
                    ),
                })),

            addSkill: () =>
                set((state) => ({
                    resumes: state.resumes.map((r) =>
                        r.id === state.selectedResumeId
                            ? {
                                ...r,
                                skills: [
                                    ...r.skills,
                                    {
                                        id: uuidv4(),
                                        category: '',
                                        items: [],
                                    },
                                ],
                            }
                            : r
                    ),
                })),

            updateSkill: (id, skill) =>
                set((state) => ({
                    resumes: state.resumes.map((r) =>
                        r.id === state.selectedResumeId
                            ? {
                                ...r,
                                skills: r.skills.map((s) =>
                                    s.id === id ? { ...s, ...skill } : s
                                ),
                            }
                            : r
                    ),
                })),

            removeSkill: (id) =>
                set((state) => ({
                    resumes: state.resumes.map((r) =>
                        r.id === state.selectedResumeId
                            ? {
                                ...r,
                                skills: r.skills.filter((s) => s.id !== id),
                            }
                            : r
                    ),
                })),
        }),
        {
            name: 'resume-storage',
            version: 1,
            migrate: (persistedState: any, version) => {
                if (version === 0 || !version) {
                    if (persistedState && persistedState.resume && !persistedState.resumes) {
                        return {
                            ...persistedState,
                            resumes: [{ ...persistedState.resume, id: uuidv4(), title: 'Migrated Resume' }],
                            selectedResumeId: null, // Will be set by onRehydrateStorage
                        };
                    }
                }
                return persistedState;
            },
            onRehydrateStorage: () => (state) => {
                if (state) {
                    if (!state.resumes || state.resumes.length === 0) {
                        state.addResume();
                    } else if (!state.selectedResumeId) {
                        state.selectResume(state.resumes[0].id);
                    }
                }
            }
        }
    )
);
