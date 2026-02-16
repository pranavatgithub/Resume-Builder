import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image, type Styles } from '@react-pdf/renderer';
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
        alignItems: 'center',
        marginBottom: 4,
    },
    contactIcon: {
        width: 10,
        height: 10,
        marginRight: 4,
    },
    contactText: {
        fontSize: 9, // text-sm
        color: '#4B5563', // gray-600
    },
    // Columns
    columns: {
        flexDirection: 'row',
        gap: 20,
    },
    leftColumn: {
        flex: 2, // 8 cols
    },
    rightColumn: {
        flex: 1, // 4 cols
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
        color: '#2563EB', // blue-600
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
        flexDirection: 'row',
        marginBottom: 2,
    },
    bulletPoint: {
        width: 3,
        height: 3,
        backgroundColor: '#374151', // gray-700
        borderRadius: 2, // '50%' is not supported in react-pdf
        marginRight: 6,
        marginTop: 5, // visually align with text
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
});

interface ResumePDFProps {
    resume: ResumeData;
}

export const ResumePDF: React.FC<ResumePDFProps> = ({ resume }) => {
    const { profile, experience, education, skills } = resume;

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.name}>{profile.fullName}</Text>
                    <Text style={styles.title}>{profile.title}</Text>

                    <View style={styles.contactRow}>
                        {profile.phone && (
                            <View style={styles.contactItem}>
                                <Image src={`${import.meta.env.BASE_URL}icons/phone.png`} style={styles.contactIcon} />
                                <Text style={styles.contactText}>{profile.phone}</Text>
                            </View>
                        )}
                        {profile.email && (
                            <View style={styles.contactItem}>
                                <Image src={`${import.meta.env.BASE_URL}icons/email.png`} style={styles.contactIcon} />
                                <Text style={styles.contactText}>{profile.email}</Text>
                            </View>
                        )}
                        {profile.location && (
                            <View style={styles.contactItem}>
                                <Image src={`${import.meta.env.BASE_URL}icons/location.png`} style={styles.contactIcon} />
                                <Text style={styles.contactText}>{profile.location}</Text>
                            </View>
                        )}
                        {profile.linkedin && (
                            <View style={styles.contactItem}>
                                <Image src={`${import.meta.env.BASE_URL}icons/link.png`} style={styles.contactIcon} />
                                <Text style={styles.contactText}>linkedin.com</Text>
                            </View>
                        )}
                    </View>
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
                                {experience.map((exp) => (
                                    <View key={exp.id} style={styles.item}>
                                        <View style={styles.itemHeader}>
                                            <Text style={styles.itemTitle}>{exp.title}</Text>
                                            <Text style={styles.itemDate}>{exp.startDate} - {exp.endDate}</Text>
                                        </View>
                                        <Text style={styles.itemSubtitle}>
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

                        {/* Education */}
                        {education.length > 0 && (
                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>Education</Text>
                                {education.map((edu) => (
                                    <View key={edu.id} style={styles.item}>
                                        <View style={styles.itemHeader}>
                                            <Text style={styles.itemTitle}>{edu.degree}</Text>
                                            <Text style={styles.itemDate}>{edu.startDate} - {edu.endDate}</Text>
                                        </View>
                                        <Text style={styles.itemSubtitle}>
                                            {edu.institution}, <Text style={styles.itemSubtitleGray}>{edu.location}</Text>
                                        </Text>
                                    </View>
                                ))}
                            </View>
                        )}
                    </View>

                    {/* Right Column */}
                    <View style={styles.rightColumn}>
                        {/* Skills */}
                        {skills.length > 0 && (
                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>Skills</Text>
                                <View>
                                    {skills.map((skill) => (
                                        <View key={skill.id} style={{ marginBottom: 8 }}>
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
                    </View>
                </View>
            </Page>
        </Document>
    );
};
