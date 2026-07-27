import React from 'react';
import { Page, Text, View, Document, StyleSheet, Svg, Path, type Styles } from '@react-pdf/renderer';
import type { ResumeData } from '../../types/resume';

const styles: Styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        padding: 20, // Approx 15mm
        // fontFamily: 'Inter', // Default to Helvetica/Times
        color: '#000000',
    },
    header: {
        borderBottomWidth: 2,
        borderBottomColor: '#111827', // gray-900
        paddingBottom: 10,
        marginBottom: 20,
    },
    name: {
        fontSize: 26, // ~text-4xl
        fontWeight: 700,
        textTransform: 'uppercase',
        marginBottom: 4,
        color: '#111827', // gray-900
        letterSpacing: -0.5,
    },
    title: {
        fontSize: 12, // ~text-xl
        color: '#1e90ff', // blue-600
        fontWeight: 500,
        marginBottom: 8,
    },
    contactRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    contactItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 4,
    },
    contactIcon: {
        width: 10,
        height: 10,
        marginRight: 4,
        marginTop: 1.5,
    },
    contactText: {
        fontSize: 9, // text-sm
        color: '#4B5563', // gray-600
    },
    // Columns
    columns: {
        position: 'relative',
    },
    leftColumn: {
        width: '65%',
        paddingRight: 10,
    },
    rightColumn: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: '35%',
        paddingLeft: 10,
    },
    // Section Base
    section: {
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 10, // text-sm
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: 1.5,
        borderBottomWidth: 1,
        borderBottomColor: '#D1D5DB', // gray-300
        paddingBottom: 4,
        marginBottom: 8,
        color: '#1F2937', // gray-800
    },
    // Common Text
    text: {
        fontSize: 9, // text-sm
        color: '#374151', // gray-700
        lineHeight: 1.5,
        textAlign: 'justify',
    },
    // Experience/Education Item
    item: {
        marginBottom: 8,
    },
    itemHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: 2,
    },
    itemTitle: {
        fontSize: 10,
        fontWeight: 700,
        color: '#111827', // gray-900
    },
    itemDate: {
        fontSize: 8, // text-xs
        color: '#6B7280', // gray-500
        fontWeight: 500,
    },
    itemSubtitle: {
        fontSize: 9,
        color: '#1e90ff', // blue-600
        fontWeight: 500,
        marginBottom: 4,
    },
    itemSubtitleGray: {
        color: '#4B5563', // gray-600
        fontWeight: 400,
    },
    // List
    list: {
        marginLeft: 10,
    },
    listItem: {
        marginBottom: 2,
        paddingLeft: 10,
        position: 'relative',
    },
    bulletPoint: {
        width: 3,
        height: 3,
        backgroundColor: '#374151', // gray-700
        borderRadius: 2, // '50%' is not supported in react-pdf
        position: 'absolute',
        left: 0,
        top: 4,
    },
    // Skills
    skillsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 6,
    },
    skillCategory: {
        fontSize: 9,
        fontWeight: 700,
        color: '#111827',
        marginBottom: 4,
        marginTop: 4,
    },
    skillPill: {
        backgroundColor: '#F3F4F6', // gray-100
        paddingVertical: 3, // py-1
        paddingHorizontal: 6, // px-2
        borderRadius: 4,
        fontSize: 8, // text-xs
        color: '#374151', // gray-700
        fontWeight: 500,
    },
    footer: {
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,
        textAlign: 'center',
        fontSize: 8,
        color: '#9CA3AF', // gray-400
    },
});

interface ResumePDFProps {
    resume: ResumeData;
}

export const ResumePDF: React.FC<ResumePDFProps> = ({ resume }) => {
    const { profile, experience, education, skills, projects = [] } = resume;

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.name}>{profile.fullName}</Text>
                    <Text style={[styles.title, { color: resume.themeColor || '#2563EB' }]}>{profile.title}</Text>
                </View>

                <View style={styles.columns}>
                    {/* Left Column */}
                    <View style={styles.leftColumn}>
                        {/* Summary */}
                        {profile.summary && (
                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>Summary</Text>
                                <Text style={styles.text}>{profile.summary}</Text>
                            </View>
                        )}

                        {/* Experience */}
                        {experience.length > 0 && (
                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>Experience</Text>
                                {experience.map((exp, index) => (
                                    <View key={`${exp.id}-${index}`} style={styles.item}>
                                        <View style={styles.itemHeader}>
                                            <Text style={styles.itemTitle}>{exp.title}</Text>
                                            <Text style={styles.itemDate}>{exp.startDate} - {exp.endDate}</Text>
                                        </View>
                                        <Text style={[styles.itemSubtitle, { color: resume.themeColor || '#2563EB' }]}>
                                            {exp.company} {exp.location && `| ${exp.location}`}
                                        </Text>
                                        <View style={styles.list}>
                                            {/* Safe access to description array */}
                                            {exp.description?.map((desc, i) => (
                                                <View key={i} style={styles.listItem}>
                                                    <View style={styles.bulletPoint} />
                                                    <Text style={styles.text}>{desc}</Text>
                                                </View>
                                            ))}
                                        </View>
                                    </View>
                                ))}
                            </View>
                        )}

                        {/* Projects */}
                        {projects.length > 0 && (
                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>Projects</Text>
                                {projects.map((project, index) => (
                                    <View key={`${project.id}-${index}`} style={styles.item}>
                                        <View style={styles.itemHeader}>
                                            <Text style={styles.itemTitle}>{project.name}</Text>
                                        </View>
                                        <View style={styles.list}>
                                            {(Array.isArray(project.description) ? project.description : (project.description ? [project.description] : [])).map((desc, i) => (
                                                <View key={i} style={styles.listItem}>
                                                    <View style={styles.bulletPoint} />
                                                    <Text style={styles.text}>{desc}</Text>
                                                </View>
                                            ))}
                                        </View>
                                        {project.techStack ? (
                                            <Text style={[styles.itemSubtitle, { marginTop: 4, color: '#374151', fontSize: 8 }]}>
                                                <Text style={{ fontWeight: 700 }}>Tech Stack: </Text>
                                                <Text style={{ fontWeight: 400 }}>{project.techStack}</Text>
                                            </Text>
                                        ) : null}
                                    </View>
                                ))}
                            </View>
                        )}

                    </View>

                    {/* Right Column */}
                    <View style={styles.rightColumn}>
                        {/* Contact */}
                        {(profile.phone || profile.email || profile.location) && (
                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>Contact</Text>
                                <View>
                                    {profile.phone && (
                                        <View style={[styles.contactItem, { marginBottom: 6 }]}>
                                            <Svg viewBox="0 0 24 24" style={styles.contactIcon}>
                                                <Path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" fill="#4B5563" />
                                            </Svg>
                                            <Text style={styles.contactText}>{profile.phone}</Text>
                                        </View>
                                    )}
                                    {profile.email && (
                                        <View style={[styles.contactItem, { marginBottom: 6 }]}>
                                            <Svg viewBox="0 0 24 24" style={styles.contactIcon}>
                                                <Path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" fill="#4B5563" />
                                            </Svg>
                                            <Text style={styles.contactText}>{profile.email}</Text>
                                        </View>
                                    )}
                                    {profile.location && (
                                        <View style={[styles.contactItem, { marginBottom: 6 }]}>
                                            <Svg viewBox="0 0 24 24" style={styles.contactIcon}>
                                                <Path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#4B5563" />
                                            </Svg>
                                            <Text style={styles.contactText}>{profile.location}</Text>
                                        </View>
                                    )}
                                </View>
                            </View>
                        )}

                        {/* Skills */}
                        {skills.length > 0 && (
                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>Skills</Text>
                                <View>
                                    {skills.map((skill) => (
                                        <View key={skill.id} style={{ marginBottom: 6 }}>
                                            <Text style={styles.skillCategory}>{skill.category}</Text>
                                            <View style={styles.skillsContainer}>
                                                {skill.items?.map((item, i) => (
                                                    <Text key={i} style={styles.skillPill}>
                                                        {item}
                                                    </Text>
                                                ))}
                                            </View>
                                        </View>
                                    ))}
                                </View>
                            </View>
                        )}

                        {/* Education */}
                        {education.length > 0 && (
                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>Education</Text>
                                {education.map((edu, index) => (
                                    <View key={`${edu.id}-${index}`} style={[styles.item, { marginBottom: 8 }]}>
                                        <Text style={[styles.itemTitle, { fontSize: 10, marginBottom: 1 }]}>{edu.degree}</Text>
                                        <Text style={[styles.itemSubtitle, { fontSize: 9, marginBottom: 4, color: resume.themeColor || '#2563EB' }]}>{edu.institution}</Text>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Svg viewBox="0 0 24 24" style={{ width: 10, height: 10, marginRight: 4 }}>
                                                    <Path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z" fill="#6B7280" />
                                                </Svg>
                                                <Text style={[styles.itemDate, { fontSize: 9 }]}>{edu.startDate} - {edu.endDate}</Text>
                                            </View>
                                            {edu.location && (
                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    <Svg viewBox="0 0 24 24" style={{ width: 10, height: 10, marginRight: 4 }}>
                                                        <Path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#6B7280" />
                                                    </Svg>
                                                    <Text style={[styles.itemDate, { fontSize: 9 }]}>{edu.location}</Text>
                                                </View>
                                            )}
                                        </View>
                                    </View>
                                ))}
                            </View>
                        )}

                        {/* Links/Portfolios */}
                        {(profile.linkedin || profile.github || profile.leetcode || profile.website) && (
                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>Links</Text>
                                {profile.linkedin && (
                                    <View style={[styles.contactItem, { marginBottom: 6 }]}>
                                        <Svg viewBox="0 0 24 24" style={styles.contactIcon}>
                                            <Path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" fill="#4B5563" />
                                        </Svg>
                                        <Text style={styles.contactText}>{profile.linkedin}</Text>
                                    </View>
                                )}
                                {profile.github && (
                                    <View style={[styles.contactItem, { marginBottom: 6 }]}>
                                        <Svg viewBox="0 0 24 24" style={styles.contactIcon}>
                                            <Path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" fill="#4B5563" />
                                        </Svg>
                                        <Text style={styles.contactText}>{profile.github}</Text>
                                    </View>
                                )}
                                {profile.leetcode && (
                                    <View style={[styles.contactItem, { marginBottom: 6 }]}>
                                        <Svg viewBox="0 0 24 24" style={styles.contactIcon}>
                                            <Path d="M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.824-.662l-4.332-4.363c-.467-.467-.702-1.15-.702-1.863s.235-1.357.702-1.824l4.319-4.38c.467-.467 1.125-.645 1.837-.645s1.357.195 1.823.662l2.697 2.606c.514.515 1.365.497 1.9-.038.535-.536.553-1.387.039-1.901l-2.609-2.636a5.055 5.055 0 0 0-2.445-1.337l2.467-2.503c.516-.514.498-1.366-.037-1.901-.535-.535-1.387-.552-1.902-.038l-10.1 10.101c-.981.982-1.494 2.337-1.494 3.835 0 1.498.513 2.895 1.494 3.875l4.347 4.361c.981.979 2.337 1.452 3.834 1.452s2.853-.473 3.835-1.452l2.609-2.636c.514-.514.496-1.365-.039-1.9-.535-.535-1.386-.553-1.9-.038zm-11.956-6.31h10.963c.732 0 1.326-.595 1.326-1.326 0-.732-.594-1.326-1.326-1.326h-10.963c-.732 0-1.326.594-1.326 1.326 0 .731.594 1.326 1.326 1.326z" fill="#4B5563" />
                                        </Svg>
                                        <Text style={styles.contactText}>{profile.leetcode}</Text>
                                    </View>
                                )}
                                {profile.website && (
                                    <View style={styles.contactItem}>
                                        <Svg viewBox="0 0 24 24" style={styles.contactIcon}>
                                            <Path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z" fill="#4B5563" />
                                        </Svg>
                                        <Text style={styles.contactText}>{profile.website}</Text>
                                    </View>
                                )}
                            </View>
                        )}

                        {/* Notice Period */}
                        {profile.noticePeriod && (
                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>Notice Period</Text>
                                <View style={[styles.contactItem, { marginBottom: 6 }]}>
                                    <Svg viewBox="0 0 24 24" style={styles.contactIcon}>
                                        <Path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" fill="#4B5563" />
                                    </Svg>
                                    <Text style={styles.contactText}>{profile.noticePeriod}</Text>
                                </View>
                            </View>
                        )}
                    </View>
                </View>

                {/* Footer */}
                <Text style={styles.footer}>
                    Generated by <Text style={{ color: resume.themeColor || '#2563EB' }}>https://pranavatgithub.github.io/Resume-Builder</Text>
                </Text>
            </Page>
        </Document>
    );
};
