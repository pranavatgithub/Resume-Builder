export interface Profile {
    fullName: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    linkedin?: string;
    github?: string;
    leetcode?: string;
    website?: string;
    freecodecamp?: string;
    noticePeriod?: string;
    summary: string;
}

export interface Experience {
    id: string;
    company: string;
    title: string;
    location: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string[];
}

export interface Education {
    id: string;
    institution: string;
    degree: string;
    location: string;
    startDate: string;
    endDate: string;
    current: boolean;
}

export interface Skill {
    id: string;
    category: string;
    items: string[];
}

export interface Project {
    id: string;
    name: string;
    description: string[];
    techStack: string;
}

export const LANGUAGE_PROFICIENCIES = [
    'Native Speaker',
    'Fluent',
    'Advanced',
    'Intermediate',
    'Conversational',
    'Beginner',
] as const;

export type LanguageProficiency = (typeof LANGUAGE_PROFICIENCIES)[number];

export interface Language {
    id: string;
    name: string;
    proficiency: LanguageProficiency;
}

export type SectionType = 'profile' | 'summary' | 'experience' | 'education' | 'skills' | 'projects' | 'languages' | 'custom';

export interface ResumeData {
    id: string;
    title: string;
    profile: Profile;
    experience: Experience[];
    education: Education[];
    skills: Skill[];
    projects: Project[];
    languages: Language[];
    themeColor: string;
    createdAt: number;
    updatedAt: number;
}
