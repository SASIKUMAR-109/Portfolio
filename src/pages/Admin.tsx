import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { usePortfolioData } from '../hooks/usePortfolioData';
import { useBlog } from '../hooks/useBlog';
import * as LucideIcons from 'lucide-react';
import {
    User, FileText, Code, Clock, FolderOpen, Mail, BookOpen,
    LogOut, Save, RotateCcw, Menu, X, Plus, Trash2, ChevronDown, ChevronUp,
    Edit2, Eye, EyeOff, Layers, Search, Users
} from 'lucide-react';
import { ProfileData, AboutData, SkillCategory, TimelineItem, Project, ContactInfo, CollaborationData, CustomSection, BlogPost } from '../types';
import { defaultPortfolioData } from '../data/defaultData';
import DynamicIcon from '../components/DynamicIcon';

type Section = 'profile' | 'about' | 'skills' | 'timeline' | 'projects' | 'contact' | 'collaboration' | 'sections' | 'blog';

// Filter for valid icon names (PascalCase, excluding internal exports)
const validIconNames = Object.keys(LucideIcons).filter(key =>
    /^[A-Z][a-zA-Z0-9]+$/.test(key) &&
    key !== 'createLucideIcon' &&
    key !== 'Icon' &&
    typeof (LucideIcons as any)[key] !== 'undefined'
);
// Icon Picker Component
const IconPicker: React.FC<{ selectedIcon: string; onSelect: (icon: string) => void; onClose: () => void }> = ({ selectedIcon, onSelect, onClose }) => {
    const [search, setSearch] = useState('');

    // Filter icons based on search
    const filteredIcons = useMemo(() => {
        if (!search) return validIconNames.slice(0, 100); // Show top 100 initially
        return validIconNames.filter(name => name.toLowerCase().includes(search.toLowerCase())).slice(0, 100);
    }, [search]);

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-[#0f1a1b] rounded-xl p-6 max-w-md w-full max-h-[80vh] flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Select an Icon</h3>
                    <button onClick={onClose} className="text-text/50 hover:text-text"><X size={20} /></button>
                </div>

                <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text/50" size={16} />
                    <input
                        type="text"
                        placeholder="Search icons..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-background border border-primary/30 rounded-lg py-2 pl-10 pr-4 text-text focus:border-primary focus:outline-none"
                        autoFocus
                    />
                </div>

                <div className="grid grid-cols-6 gap-2 overflow-y-auto min-h-[300px] content-start">
                    {filteredIcons.map((name) => (
                        <button
                            key={name}
                            onClick={() => { onSelect(name); onClose(); }}
                            className={`p-3 rounded-lg transition-colors flex flex-col items-center gap-1 ${selectedIcon === name
                                ? 'bg-primary text-background'
                                : 'bg-background/50 hover:bg-primary/20 text-text'
                                }`}
                            title={name}
                        >
                            <DynamicIcon name={name} size={20} />
                        </button>
                    ))}
                    {filteredIcons.length === 0 && (
                        <div className="col-span-6 text-center text-text/50 py-8">
                            No icons found matching "{search}"
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};



const Admin: React.FC = () => {
    const navigate = useNavigate();
    const { user, loading: authLoading, logout, isAuthenticated } = useAuth();
    const { data, loading: dataLoading, updateData, initializeData } = usePortfolioData();
    const { posts, fetchPosts, createPost, updatePost, deletePost } = useBlog();

    const [activeSection, setActiveSection] = useState<Section>('profile');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    // Local state for editing
    const [profile, setProfile] = useState<ProfileData>(data.profile);
    const [about, setAbout] = useState<AboutData>(data.about);
    const [skills, setSkills] = useState<SkillCategory[]>(data.skills);
    const [timeline, setTimeline] = useState<TimelineItem[]>(data.timeline);
    const [projects, setProjects] = useState<Project[]>(data.projects);
    const [contact, setContact] = useState<ContactInfo>(data.contact);
    const [collaboration, setCollaboration] = useState<CollaborationData>(data.collaboration);
    const [customSections, setCustomSections] = useState<CustomSection[]>(data.customSections || []);

    useEffect(() => {
        if (!authLoading && !isAuthenticated) {
            navigate('/login');
        }
    }, [authLoading, isAuthenticated, navigate]);

    useEffect(() => {
        setProfile(data.profile);
        setAbout(data.about);
        setSkills(data.skills);
        setTimeline(data.timeline);
        setProjects(data.projects);
        setContact(data.contact);
        setCollaboration(data.collaboration);
        setCustomSections(data.customSections || []);
    }, [data]);

    useEffect(() => {
        if (activeSection === 'blog') {
            fetchPosts(false);
        }
    }, [activeSection]);

    const handleSave = async () => {
        setSaving(true);
        setMessage(null);

        const success = await updateData({
            profile,
            about,
            skills,
            timeline,
            projects,
            contact,
            collaboration,
            customSections
        });

        if (success) {
            setMessage({ type: 'success', text: 'Changes saved successfully!' });
        } else {
            setMessage({ type: 'error', text: 'Failed to save changes. Please try again.' });
        }
        setSaving(false);
        setTimeout(() => setMessage(null), 3000);
    };

    const handleReset = () => {
        setProfile(data.profile);
        setAbout(data.about);
        setSkills(data.skills);
        setTimeline(data.timeline);
        setProjects(data.projects);
        setContact(data.contact);
        setCollaboration(data.collaboration);
        setCustomSections(data.customSections || []);
        setMessage({ type: 'success', text: 'Changes discarded. Showing last saved state.' });
        setTimeout(() => setMessage(null), 3000);
    };

    const handleInitialize = async () => {
        const success = await initializeData();
        if (success) {
            setMessage({ type: 'success', text: 'Portfolio data initialized in Firebase!' });
        }
        setTimeout(() => setMessage(null), 3000);
    };

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    const sections = [
        { id: 'profile', label: 'Profile', icon: User },
        { id: 'about', label: 'About', icon: FileText },
        { id: 'skills', label: 'Skills', icon: Code },
        { id: 'timeline', label: 'Timeline', icon: Clock },
        { id: 'projects', label: 'Projects', icon: FolderOpen },
        { id: 'contact', label: 'Contact', icon: Mail },
        { id: 'collaboration', label: 'Collaborate', icon: Users },
        { id: 'sections', label: 'Custom Sections', icon: Layers },
        { id: 'blog', label: 'Blog', icon: BookOpen },
    ];

    if (authLoading || dataLoading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-primary">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background flex">
            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#0f1a1b] border-r border-primary/20 transform transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="p-4 border-b border-primary/20">
                    <h1 className="text-xl font-bold gradient-text">Portfolio Admin</h1>
                    <p className="text-sm text-text/50 truncate">{user?.email}</p>
                </div>

                <nav className="p-4 space-y-2">
                    {sections.map((section) => (
                        <button
                            key={section.id}
                            onClick={() => {
                                setActiveSection(section.id as Section);
                                setSidebarOpen(false);
                            }}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeSection === section.id
                                ? 'bg-primary text-background'
                                : 'text-text/70 hover:bg-primary/10 hover:text-text'
                                }`}
                        >
                            <section.icon size={18} />
                            <span>{section.label}</span>
                        </button>
                    ))}
                </nav>

                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-primary/20">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                        <LogOut size={18} />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 lg:ml-64">
                {/* Header */}
                <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-sm border-b border-primary/20 px-4 py-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                className="lg:hidden text-text/70 hover:text-text"
                            >
                                {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                            <h2 className="text-lg font-semibold capitalize">{activeSection}</h2>
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={handleReset}
                                title="Discard changes and show last saved state"
                                className="flex items-center gap-2 px-3 py-2 text-text/70 hover:text-text border border-primary/30 rounded-lg transition-colors"
                            >
                                <RotateCcw size={16} />
                                <span className="hidden sm:inline">Discard</span>
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={saving}
                                className="flex items-center gap-2 px-4 py-2 bg-primary text-background rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
                            >
                                <Save size={16} />
                                <span>{saving ? 'Saving...' : 'Save'}</span>
                            </button>
                        </div>
                    </div>

                    {message && (
                        <div className={`mt-2 p-2 rounded-lg text-sm ${message.type === 'success' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
                            }`}>
                            {message.text}
                        </div>
                    )}
                </header>

                {/* Content */}
                <div className="p-4 md:p-6 max-w-4xl">
                    {activeSection === 'profile' && (
                        <>
                            <ProfileEditor profile={profile} setProfile={setProfile} />
                            <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                                <p className="text-blue-400 text-sm mb-2">
                                    <strong>First time setup?</strong> Click below to copy your current portfolio content to Firebase.
                                </p>
                                <button
                                    onClick={handleInitialize}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-400 transition-colors text-sm"
                                >
                                    Initialize Portfolio Data
                                </button>
                            </div>
                        </>
                    )}
                    {activeSection === 'about' && (
                        <AboutEditor about={about} setAbout={setAbout} />
                    )}
                    {activeSection === 'skills' && (
                        <SkillsEditor skills={skills} setSkills={setSkills} />
                    )}
                    {activeSection === 'timeline' && (
                        <TimelineEditor timeline={timeline} setTimeline={setTimeline} />
                    )}
                    {activeSection === 'projects' && (
                        <ProjectsEditor projects={projects} setProjects={setProjects} />
                    )}
                    {activeSection === 'contact' && (
                        <ContactEditor contact={contact} setContact={setContact} />
                    )}
                    {activeSection === 'collaboration' && (
                        <CollaborationEditor collaboration={collaboration} setCollaboration={setCollaboration} />
                    )}
                    {activeSection === 'sections' && (
                        <CustomSectionsEditor customSections={customSections} setCustomSections={setCustomSections} />
                    )}
                    {activeSection === 'blog' && (
                        <BlogEditor
                            posts={posts}
                            onCreatePost={createPost}
                            onUpdatePost={updatePost}
                            onDeletePost={deletePost}
                        />
                    )}
                </div>
            </main>

            {/* Overlay for mobile sidebar */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
        </div>
    );
};

// Profile Editor
const ProfileEditor: React.FC<{ profile: ProfileData; setProfile: (p: ProfileData) => void }> = ({ profile, setProfile }) => {
    const updateField = (field: keyof ProfileData, value: string | string[]) => {
        setProfile({ ...profile, [field]: value });
    };

    return (
        <div className="space-y-6">
            <div className="bg-[#0f1a1b] rounded-xl p-6 border border-primary/20">
                <h3 className="text-lg font-semibold mb-4">Basic Info</h3>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">Full Name</label>
                        <input
                            type="text"
                            value={profile.name}
                            onChange={(e) => updateField('name', e.target.value)}
                            className="w-full bg-background border border-primary/30 rounded-lg py-2 px-4 text-text focus:border-primary focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Nickname</label>
                        <input
                            type="text"
                            value={profile.nickname}
                            onChange={(e) => updateField('nickname', e.target.value)}
                            className="w-full bg-background border border-primary/30 rounded-lg py-2 px-4 text-text focus:border-primary focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Quote / Tagline</label>
                        <input
                            type="text"
                            value={profile.quote}
                            onChange={(e) => updateField('quote', e.target.value)}
                            className="w-full bg-background border border-primary/30 rounded-lg py-2 px-4 text-text focus:border-primary focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Profile Image URL</label>
                        <input
                            type="url"
                            value={profile.profileImage}
                            onChange={(e) => updateField('profileImage', e.target.value)}
                            className="w-full bg-background border border-primary/30 rounded-lg py-2 px-4 text-text focus:border-primary focus:outline-none"
                        />
                        {profile.profileImage && (
                            <img src={profile.profileImage} alt="Preview" className="mt-2 w-24 h-24 rounded-full object-cover" />
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Roles (shown in typewriter effect, comma-separated)</label>
                        <input
                            type="text"
                            value={profile.roles.join(', ')}
                            onChange={(e) => updateField('roles', e.target.value.split(',').map(r => r.trim()))}
                            className="w-full bg-background border border-primary/30 rounded-lg py-2 px-4 text-text focus:border-primary focus:outline-none"
                            placeholder="Entrepreneur, Developer, Designer"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Resume URL <span className="text-text/50 font-normal">(PDF link)</span></label>
                        <input
                            type="url"
                            value={profile.resumeUrl || ''}
                            onChange={(e) => updateField('resumeUrl', e.target.value)}
                            className="w-full bg-background border border-primary/30 rounded-lg py-2 px-4 text-text focus:border-primary focus:outline-none"
                            placeholder="https://drive.google.com/file/d/.../view"
                        />
                        <p className="text-xs text-text/50 mt-1">Upload your resume to Google Drive or Dropbox and paste the shareable link here.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

// About Editor
const AboutEditor: React.FC<{ about: AboutData; setAbout: (a: AboutData) => void }> = ({ about, setAbout }) => {
    return (
        <div className="bg-[#0f1a1b] rounded-xl p-6 border border-primary/20">
            <h3 className="text-lg font-semibold mb-4">About Section</h3>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-2">Bio</label>
                    <textarea
                        value={about.bio}
                        onChange={(e) => setAbout({ ...about, bio: e.target.value })}
                        rows={6}
                        className="w-full bg-background border border-primary/30 rounded-lg py-2 px-4 text-text focus:border-primary focus:outline-none resize-none"
                    />
                    <p className="text-xs text-text/50 mt-1">Keywords like "entrepreneur", "tech enthusiast", "innovation" will be highlighted automatically.</p>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">About Image URL (optional)</label>
                    <input
                        type="url"
                        value={about.image}
                        onChange={(e) => setAbout({ ...about, image: e.target.value })}
                        className="w-full bg-background border border-primary/30 rounded-lg py-2 px-4 text-text focus:border-primary focus:outline-none"
                        placeholder="Leave empty to use profile image"
                    />
                </div>
            </div>
        </div>
    );
};

// Skills Editor - with reordering and edit icon
const SkillsEditor: React.FC<{ skills: SkillCategory[]; setSkills: (s: SkillCategory[]) => void }> = ({ skills, setSkills }) => {
    const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
    const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);
    const [showIconPicker, setShowIconPicker] = useState<string | null>(null);

    const addCategory = () => {
        const newCategory: SkillCategory = {
            id: `category-${Date.now()}`,
            name: 'New Category',
            icon: 'Code',
            skills: []
        };
        setSkills([...skills, newCategory]);
        setExpandedCategory(newCategory.id);
        setEditingCategoryId(newCategory.id);
    };

    const updateCategory = (index: number, updates: Partial<SkillCategory>) => {
        const newSkills = [...skills];
        newSkills[index] = { ...newSkills[index], ...updates };
        setSkills(newSkills);
    };

    const deleteCategory = (index: number) => {
        setSkills(skills.filter((_, i) => i !== index));
    };

    const moveCategory = (index: number, direction: 'up' | 'down') => {
        if ((direction === 'up' && index === 0) || (direction === 'down' && index === skills.length - 1)) return;
        const newSkills = [...skills];
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        [newSkills[index], newSkills[targetIndex]] = [newSkills[targetIndex], newSkills[index]];
        setSkills(newSkills);
    };

    const addSkill = (categoryIndex: number) => {
        const newSkills = [...skills];
        newSkills[categoryIndex].skills.push({ name: 'New Skill', level: 50 });
        setSkills(newSkills);
    };

    const updateSkill = (categoryIndex: number, skillIndex: number, updates: { name?: string; level?: number }) => {
        const newSkills = [...skills];
        newSkills[categoryIndex].skills[skillIndex] = { ...newSkills[categoryIndex].skills[skillIndex], ...updates };
        setSkills(newSkills);
    };

    const deleteSkill = (categoryIndex: number, skillIndex: number) => {
        const newSkills = [...skills];
        newSkills[categoryIndex].skills = newSkills[categoryIndex].skills.filter((_, i) => i !== skillIndex);
        setSkills(newSkills);
    };

    const moveSkill = (categoryIndex: number, skillIndex: number, direction: 'up' | 'down') => {
        const category = skills[categoryIndex];
        if ((direction === 'up' && skillIndex === 0) || (direction === 'down' && skillIndex === category.skills.length - 1)) return;
        const newSkills = [...skills];
        const targetIndex = direction === 'up' ? skillIndex - 1 : skillIndex + 1;
        const categorySkills = [...newSkills[categoryIndex].skills];
        [categorySkills[skillIndex], categorySkills[targetIndex]] = [categorySkills[targetIndex], categorySkills[skillIndex]];
        newSkills[categoryIndex].skills = categorySkills;
        setSkills(newSkills);
    };

    return (
        <div className="space-y-4">
            {skills.map((category, categoryIndex) => {
                return (
                    <div key={category.id} className="bg-[#0f1a1b] rounded-xl border border-primary/20 overflow-hidden">
                        <div className="p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3 flex-1">
                                <div className="flex flex-col gap-1">
                                    <button onClick={() => moveCategory(categoryIndex, 'up')} disabled={categoryIndex === 0} className="p-0.5 text-text/50 hover:text-text disabled:opacity-30">
                                        <ChevronUp size={14} />
                                    </button>
                                    <button onClick={() => moveCategory(categoryIndex, 'down')} disabled={categoryIndex === skills.length - 1} className="p-0.5 text-text/50 hover:text-text disabled:opacity-30">
                                        <ChevronDown size={14} />
                                    </button>
                                </div>
                                <button
                                    onClick={() => setShowIconPicker(category.id)}
                                    className="p-2 bg-background/50 rounded-lg hover:bg-primary/10 transition-colors"
                                    title="Change icon"
                                >
                                    <DynamicIcon name={category.icon} size={20} className="text-primary" />
                                </button>
                                {editingCategoryId === category.id ? (
                                    <input
                                        type="text"
                                        value={category.name}
                                        onChange={(e) => updateCategory(categoryIndex, { name: e.target.value })}
                                        onBlur={() => setEditingCategoryId(null)}
                                        onKeyDown={(e) => e.key === 'Enter' && setEditingCategoryId(null)}
                                        autoFocus
                                        className="bg-transparent border-b border-primary px-1 text-text focus:outline-none"
                                    />
                                ) : (
                                    <span className="font-medium">{category.name}</span>
                                )}
                                <button onClick={() => setEditingCategoryId(category.id)} className="p-1 text-text/50 hover:text-text">
                                    <Edit2 size={14} />
                                </button>
                            </div>
                            <div className="flex items-center gap-2">
                                <button onClick={() => deleteCategory(categoryIndex)} className="p-1 text-red-400 hover:bg-red-500/10 rounded">
                                    <Trash2 size={16} />
                                </button>
                                <button onClick={() => setExpandedCategory(expandedCategory === category.id ? null : category.id)}>
                                    {expandedCategory === category.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                                </button>
                            </div>
                        </div>

                        {expandedCategory === category.id && (
                            <div className="p-4 pt-0 space-y-3">
                                {category.skills.map((skill, skillIndex) => (
                                    <div key={skillIndex} className="flex items-center gap-3 bg-background/50 p-3 rounded-lg">
                                        <div className="flex flex-col gap-0.5">
                                            <button onClick={() => moveSkill(categoryIndex, skillIndex, 'up')} disabled={skillIndex === 0} className="p-0.5 text-text/50 hover:text-text disabled:opacity-30">
                                                <ChevronUp size={12} />
                                            </button>
                                            <button onClick={() => moveSkill(categoryIndex, skillIndex, 'down')} disabled={skillIndex === category.skills.length - 1} className="p-0.5 text-text/50 hover:text-text disabled:opacity-30">
                                                <ChevronDown size={12} />
                                            </button>
                                        </div>
                                        <input
                                            type="text"
                                            value={skill.name}
                                            onChange={(e) => updateSkill(categoryIndex, skillIndex, { name: e.target.value })}
                                            className="flex-1 bg-transparent border-b border-primary/30 focus:border-primary px-1 text-text focus:outline-none"
                                        />
                                        <button onClick={() => deleteSkill(categoryIndex, skillIndex)} className="p-1 text-red-400 hover:bg-red-500/10 rounded">
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                ))}
                                <button
                                    onClick={() => addSkill(categoryIndex)}
                                    className="flex items-center gap-2 text-primary hover:bg-primary/10 px-3 py-2 rounded-lg text-sm"
                                >
                                    <Plus size={14} />
                                    Add Skill
                                </button>
                            </div>
                        )}

                        {showIconPicker === category.id && (
                            <IconPicker
                                selectedIcon={category.icon}
                                onSelect={(icon) => updateCategory(categoryIndex, { icon })}
                                onClose={() => setShowIconPicker(null)}
                            />
                        )}
                    </div>
                );
            })}

            <button
                onClick={addCategory}
                className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-primary/30 rounded-xl text-primary hover:bg-primary/5 transition-colors"
            >
                <Plus size={18} />
                Add Category
            </button>
        </div>
    );
};

// Timeline Editor - with visual icon picker and reordering
const TimelineEditor: React.FC<{ timeline: TimelineItem[]; setTimeline: (t: TimelineItem[]) => void }> = ({ timeline, setTimeline }) => {
    const [expandedItem, setExpandedItem] = useState<string | null>(null);
    const [showIconPicker, setShowIconPicker] = useState<string | null>(null);

    const addItem = () => {
        const newItem: TimelineItem = {
            id: `timeline-${Date.now()}`,
            date: new Date().getFullYear().toString(),
            title: 'New Event',
            shortDescription: 'Brief description',
            fullDescription: 'Full description of this event.',
            icon: 'Star'
        };
        setTimeline([...timeline, newItem]);
        setExpandedItem(newItem.id);
    };

    const updateItem = (index: number, updates: Partial<TimelineItem>) => {
        const newTimeline = [...timeline];
        newTimeline[index] = { ...newTimeline[index], ...updates };
        setTimeline(newTimeline);
    };

    const deleteItem = (index: number) => {
        setTimeline(timeline.filter((_, i) => i !== index));
    };

    const moveItem = (index: number, direction: 'up' | 'down') => {
        if ((direction === 'up' && index === 0) || (direction === 'down' && index === timeline.length - 1)) return;
        const newTimeline = [...timeline];
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        [newTimeline[index], newTimeline[targetIndex]] = [newTimeline[targetIndex], newTimeline[index]];
        setTimeline(newTimeline);
    };

    return (
        <div className="space-y-4">
            {timeline.map((item, index) => {
                return (
                    <div key={item.id} className="bg-[#0f1a1b] rounded-xl border border-primary/20 overflow-hidden">
                        <div className="p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="flex flex-col gap-1">
                                    <button onClick={() => moveItem(index, 'up')} disabled={index === 0} className="p-0.5 text-text/50 hover:text-text disabled:opacity-30">
                                        <ChevronUp size={14} />
                                    </button>
                                    <button onClick={() => moveItem(index, 'down')} disabled={index === timeline.length - 1} className="p-0.5 text-text/50 hover:text-text disabled:opacity-30">
                                        <ChevronDown size={14} />
                                    </button>
                                </div>
                                <button
                                    onClick={() => setShowIconPicker(item.id)}
                                    className="p-2 bg-background/50 rounded-lg hover:bg-primary/10 transition-colors"
                                    title="Change icon"
                                >
                                    <DynamicIcon name={item.icon} size={20} className="text-primary" />
                                </button>
                                <div>
                                    <span className="text-primary text-sm">{item.date}</span>
                                    <h4 className="font-medium">{item.title}</h4>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button onClick={() => deleteItem(index)} className="p-1 text-red-400 hover:bg-red-500/10 rounded">
                                    <Trash2 size={16} />
                                </button>
                                <button onClick={() => setExpandedItem(expandedItem === item.id ? null : item.id)}>
                                    {expandedItem === item.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                                </button>
                            </div>
                        </div>

                        {expandedItem === item.id && (
                            <div className="p-4 pt-0 space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Date</label>
                                        <input
                                            type="text"
                                            value={item.date}
                                            onChange={(e) => updateItem(index, { date: e.target.value })}
                                            className="w-full bg-background border border-primary/30 rounded-lg py-2 px-3 text-text focus:border-primary focus:outline-none text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Icon</label>
                                        <button
                                            onClick={() => setShowIconPicker(item.id)}
                                            className="w-full bg-background border border-primary/30 rounded-lg py-2 px-3 text-left flex items-center gap-2 hover:border-primary transition-colors"
                                        >
                                            <DynamicIcon name={item.icon} size={16} className="text-primary" />
                                            <span className="text-sm">{item.icon}</span>
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Title</label>
                                    <input
                                        type="text"
                                        value={item.title}
                                        onChange={(e) => updateItem(index, { title: e.target.value })}
                                        className="w-full bg-background border border-primary/30 rounded-lg py-2 px-3 text-text focus:border-primary focus:outline-none text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Short Description (shown in timeline)</label>
                                    <input
                                        type="text"
                                        value={item.shortDescription}
                                        onChange={(e) => updateItem(index, { shortDescription: e.target.value })}
                                        className="w-full bg-background border border-primary/30 rounded-lg py-2 px-3 text-text focus:border-primary focus:outline-none text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Full Description (shown in popup)</label>
                                    <textarea
                                        value={item.fullDescription}
                                        onChange={(e) => updateItem(index, { fullDescription: e.target.value })}
                                        rows={3}
                                        className="w-full bg-background border border-primary/30 rounded-lg py-2 px-3 text-text focus:border-primary focus:outline-none text-sm resize-none"
                                    />
                                </div>
                            </div>
                        )}

                        {showIconPicker === item.id && (
                            <IconPicker
                                selectedIcon={item.icon}
                                onSelect={(icon) => updateItem(index, { icon })}
                                onClose={() => setShowIconPicker(null)}
                            />
                        )}
                    </div>
                );
            })}

            <button
                onClick={addItem}
                className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-primary/30 rounded-xl text-primary hover:bg-primary/5 transition-colors"
            >
                <Plus size={18} />
                Add Timeline Event
            </button>
        </div>
    );
};

// Projects Editor - with reordering and hide URLs option
const ProjectsEditor: React.FC<{ projects: Project[]; setProjects: (p: Project[]) => void }> = ({ projects, setProjects }) => {
    const [expandedProject, setExpandedProject] = useState<string | null>(null);
    const [showIconPicker, setShowIconPicker] = useState<string | null>(null);

    const addProject = () => {
        const newProject: Project = {
            id: `project-${Date.now()}`,
            title: 'New Project',
            tagline: 'Project tagline',
            description: 'Project description...',
            icon: 'Folder',
            technologies: [],
            githubUrl: '',
            demoUrl: '',
            playUrl: ''
        };
        setProjects([...projects, newProject]);
        setExpandedProject(newProject.id);
    };

    const updateProject = (index: number, updates: Partial<Project>) => {
        const newProjects = [...projects];
        newProjects[index] = { ...newProjects[index], ...updates };
        setProjects(newProjects);
    };

    const deleteProject = (index: number) => {
        setProjects(projects.filter((_, i) => i !== index));
    };

    const moveProject = (index: number, direction: 'up' | 'down') => {
        if ((direction === 'up' && index === 0) || (direction === 'down' && index === projects.length - 1)) return;
        const newProjects = [...projects];
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        [newProjects[index], newProjects[targetIndex]] = [newProjects[targetIndex], newProjects[index]];
        setProjects(newProjects);
    };

    return (
        <div className="space-y-4">
            {projects.map((project, index) => {
                return (
                    <div key={project.id} className="bg-[#0f1a1b] rounded-xl border border-primary/20 overflow-hidden">
                        <div className="p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="flex flex-col gap-1">
                                    <button onClick={() => moveProject(index, 'up')} disabled={index === 0} className="p-0.5 text-text/50 hover:text-text disabled:opacity-30">
                                        <ChevronUp size={14} />
                                    </button>
                                    <button onClick={() => moveProject(index, 'down')} disabled={index === projects.length - 1} className="p-0.5 text-text/50 hover:text-text disabled:opacity-30">
                                        <ChevronDown size={14} />
                                    </button>
                                </div>
                                <button
                                    onClick={() => setShowIconPicker(project.id)}
                                    className="p-2 bg-background/50 rounded-lg hover:bg-primary/10 transition-colors"
                                    title="Change icon"
                                >
                                    <DynamicIcon name={project.icon} size={20} className="text-primary" />
                                </button>
                                <div>
                                    <h4 className="font-medium">{project.title}</h4>
                                    <p className="text-sm text-text/50">{project.tagline}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button onClick={() => deleteProject(index)} className="p-1 text-red-400 hover:bg-red-500/10 rounded">
                                    <Trash2 size={16} />
                                </button>
                                <button onClick={() => setExpandedProject(expandedProject === project.id ? null : project.id)}>
                                    {expandedProject === project.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                                </button>
                            </div>
                        </div>

                        {expandedProject === project.id && (
                            <div className="p-4 pt-0 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Title</label>
                                    <input
                                        type="text"
                                        value={project.title}
                                        onChange={(e) => updateProject(index, { title: e.target.value })}
                                        className="w-full bg-background border border-primary/30 rounded-lg py-2 px-3 text-text focus:border-primary focus:outline-none text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Tagline</label>
                                    <input
                                        type="text"
                                        value={project.tagline}
                                        onChange={(e) => updateProject(index, { tagline: e.target.value })}
                                        className="w-full bg-background border border-primary/30 rounded-lg py-2 px-3 text-text focus:border-primary focus:outline-none text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Description</label>
                                    <textarea
                                        value={project.description}
                                        onChange={(e) => updateProject(index, { description: e.target.value })}
                                        rows={4}
                                        className="w-full bg-background border border-primary/30 rounded-lg py-2 px-3 text-text focus:border-primary focus:outline-none text-sm resize-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Technologies (comma-separated)</label>
                                    <input
                                        type="text"
                                        value={project.technologies.join(', ')}
                                        onChange={(e) => updateProject(index, { technologies: e.target.value.split(',').map(t => t.trim()).filter(Boolean) })}
                                        className="w-full bg-background border border-primary/30 rounded-lg py-2 px-3 text-text focus:border-primary focus:outline-none text-sm"
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">
                                            GitHub URL <span className="text-text/50 font-normal">(leave empty to hide)</span>
                                        </label>
                                        <input
                                            type="url"
                                            value={project.githubUrl}
                                            onChange={(e) => updateProject(index, { githubUrl: e.target.value })}
                                            placeholder="https://github.com/..."
                                            className="w-full bg-background border border-primary/30 rounded-lg py-2 px-3 text-text focus:border-primary focus:outline-none text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">
                                            Demo URL <span className="text-text/50 font-normal">(leave empty to hide)</span>
                                        </label>
                                        <input
                                            type="url"
                                            value={project.demoUrl}
                                            onChange={(e) => updateProject(index, { demoUrl: e.target.value })}
                                            placeholder="https://..."
                                            className="w-full bg-background border border-primary/30 rounded-lg py-2 px-3 text-text focus:border-primary focus:outline-none text-sm"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium mb-1">
                                            Play URL <span className="text-text/50 font-normal">(for games)</span>
                                        </label>
                                        <input
                                            type="url"
                                            value={project.playUrl || ''}
                                            onChange={(e) => updateProject(index, { playUrl: e.target.value })}
                                            placeholder="https://..."
                                            className="w-full bg-background border border-primary/30 rounded-lg py-2 px-3 text-text focus:border-primary focus:outline-none text-sm"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {showIconPicker === project.id && (
                            <IconPicker
                                selectedIcon={project.icon}
                                onSelect={(icon) => updateProject(index, { icon })}
                                onClose={() => setShowIconPicker(null)}
                            />
                        )}
                    </div>
                );
            })}

            <button
                onClick={addProject}
                className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-primary/30 rounded-xl text-primary hover:bg-primary/5 transition-colors"
            >
                <Plus size={18} />
                Add Project
            </button>
        </div>
    );
};

// Contact Editor
const ContactEditor: React.FC<{ contact: ContactInfo; setContact: (c: ContactInfo) => void }> = ({ contact, setContact }) => {
    return (
        <div className="bg-[#0f1a1b] rounded-xl p-6 border border-primary/20">
            <h3 className="text-lg font-semibold mb-4">Contact Information</h3>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                        type="email"
                        value={contact.email}
                        onChange={(e) => setContact({ ...contact, email: e.target.value })}
                        className="w-full bg-background border border-primary/30 rounded-lg py-2 px-4 text-text focus:border-primary focus:outline-none"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2">GitHub URL</label>
                    <input
                        type="url"
                        value={contact.github}
                        onChange={(e) => setContact({ ...contact, github: e.target.value })}
                        className="w-full bg-background border border-primary/30 rounded-lg py-2 px-4 text-text focus:border-primary focus:outline-none"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2">LinkedIn URL</label>
                    <input
                        type="url"
                        value={contact.linkedin || ''}
                        onChange={(e) => setContact({ ...contact, linkedin: e.target.value })}
                        className="w-full bg-background border border-primary/30 rounded-lg py-2 px-4 text-text focus:border-primary focus:outline-none"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2">YouTube URL</label>
                    <input
                        type="url"
                        value={contact.youtube || ''}
                        onChange={(e) => setContact({ ...contact, youtube: e.target.value })}
                        className="w-full bg-background border border-primary/30 rounded-lg py-2 px-4 text-text focus:border-primary focus:outline-none"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2">Twitter URL</label>
                    <input
                        type="url"
                        value={contact.twitter || ''}
                        onChange={(e) => setContact({ ...contact, twitter: e.target.value })}
                        className="w-full bg-background border border-primary/30 rounded-lg py-2 px-4 text-text focus:border-primary focus:outline-none"
                    />
                </div>
            </div>
        </div>
    );
};

// Blog Editor
const BlogEditor: React.FC<{
    posts: BlogPost[];
    onCreatePost: (post: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>) => Promise<string | null>;
    onUpdatePost: (id: string, updates: Partial<BlogPost>) => Promise<boolean>;
    onDeletePost: (id: string) => Promise<boolean>;
}> = ({ posts, onCreatePost, onUpdatePost, onDeletePost }) => {
    const [isCreating, setIsCreating] = useState(false);
    const [editingPostId, setEditingPostId] = useState<string | null>(null);
    const [newPost, setNewPost] = useState({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        coverImage: '',
        tags: '',
        published: false
    });
    const [editPost, setEditPost] = useState<{
        title: string;
        slug: string;
        excerpt: string;
        content: string;
        coverImage: string;
        tags: string;
        published: boolean;
    } | null>(null);

    const handleCreate = async () => {
        if (!newPost.title || !newPost.slug) return;

        await onCreatePost({
            title: newPost.title,
            slug: newPost.slug,
            excerpt: newPost.excerpt,
            content: newPost.content,
            coverImage: newPost.coverImage || undefined,
            tags: newPost.tags.split(',').map(t => t.trim()).filter(Boolean),
            published: newPost.published
        });

        setNewPost({ title: '', slug: '', excerpt: '', content: '', coverImage: '', tags: '', published: false });
        setIsCreating(false);
    };

    const handleEdit = (post: BlogPost) => {
        setEditingPostId(post.id);
        setEditPost({
            title: post.title,
            slug: post.slug,
            excerpt: post.excerpt,
            content: post.content,
            coverImage: post.coverImage || '',
            tags: post.tags.join(', '),
            published: post.published
        });
    };

    const handleSaveEdit = async (postId: string) => {
        if (!editPost) return;

        await onUpdatePost(postId, {
            title: editPost.title,
            slug: editPost.slug,
            excerpt: editPost.excerpt,
            content: editPost.content,
            coverImage: editPost.coverImage || undefined,
            tags: editPost.tags.split(',').map(t => t.trim()).filter(Boolean),
            published: editPost.published
        });

        setEditingPostId(null);
        setEditPost(null);
    };

    const handleCancelEdit = () => {
        setEditingPostId(null);
        setEditPost(null);
    };

    const generateSlug = (title: string) => {
        return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    };

    return (
        <div className="space-y-4">
            {isCreating ? (
                <div className="bg-[#0f1a1b] rounded-xl p-6 border border-primary/20 space-y-4">
                    <h3 className="text-lg font-semibold">New Blog Post</h3>

                    <div>
                        <label className="block text-sm font-medium mb-1">Title</label>
                        <input
                            type="text"
                            value={newPost.title}
                            onChange={(e) => {
                                setNewPost({ ...newPost, title: e.target.value, slug: generateSlug(e.target.value) });
                            }}
                            className="w-full bg-background border border-primary/30 rounded-lg py-2 px-3 text-text focus:border-primary focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Slug (URL path)</label>
                        <input
                            type="text"
                            value={newPost.slug}
                            onChange={(e) => setNewPost({ ...newPost, slug: e.target.value })}
                            className="w-full bg-background border border-primary/30 rounded-lg py-2 px-3 text-text focus:border-primary focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Excerpt (preview text)</label>
                        <textarea
                            value={newPost.excerpt}
                            onChange={(e) => setNewPost({ ...newPost, excerpt: e.target.value })}
                            rows={2}
                            className="w-full bg-background border border-primary/30 rounded-lg py-2 px-3 text-text focus:border-primary focus:outline-none resize-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Content (Markdown supported)</label>
                        <textarea
                            value={newPost.content}
                            onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                            rows={10}
                            className="w-full bg-background border border-primary/30 rounded-lg py-2 px-3 text-text focus:border-primary focus:outline-none resize-none font-mono text-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Cover Image URL <span className="text-text/50 font-normal">(optional)</span></label>
                        <input
                            type="url"
                            value={newPost.coverImage}
                            onChange={(e) => setNewPost({ ...newPost, coverImage: e.target.value })}
                            placeholder="https://example.com/image.jpg"
                            className="w-full bg-background border border-primary/30 rounded-lg py-2 px-3 text-text focus:border-primary focus:outline-none"
                        />
                        {newPost.coverImage && (
                            <img src={newPost.coverImage} alt="Cover preview" className="mt-2 w-full max-h-40 object-cover rounded-lg" />
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Tags (comma-separated)</label>
                        <input
                            type="text"
                            value={newPost.tags}
                            onChange={(e) => setNewPost({ ...newPost, tags: e.target.value })}
                            className="w-full bg-background border border-primary/30 rounded-lg py-2 px-3 text-text focus:border-primary focus:outline-none"
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="published"
                            checked={newPost.published}
                            onChange={(e) => setNewPost({ ...newPost, published: e.target.checked })}
                            className="rounded"
                        />
                        <label htmlFor="published" className="text-sm">Publish immediately</label>
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={handleCreate}
                            className="px-4 py-2 bg-primary text-background rounded-lg hover:bg-primary/90"
                        >
                            Create Post
                        </button>
                        <button
                            onClick={() => setIsCreating(false)}
                            className="px-4 py-2 border border-primary/30 rounded-lg hover:bg-primary/5"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            ) : (
                <button
                    onClick={() => setIsCreating(true)}
                    className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-primary/30 rounded-xl text-primary hover:bg-primary/5 transition-colors"
                >
                    <Plus size={18} />
                    New Blog Post
                </button>
            )}

            {posts.length === 0 && !isCreating && (
                <p className="text-center text-text/50 py-8">No blog posts yet. Create your first post!</p>
            )}

            {posts.map((post) => (
                <div key={post.id} className="bg-[#0f1a1b] rounded-xl border border-primary/20 overflow-hidden">
                    <div className="p-4 flex items-center justify-between">
                        <div>
                            <h4 className="font-medium">{post.title}</h4>
                            <p className="text-sm text-text/50">/blog/{post.slug}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className={`px-2 py-1 text-xs rounded ${post.published ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                                {post.published ? 'Published' : 'Draft'}
                            </span>
                            <button
                                onClick={() => editingPostId === post.id ? handleCancelEdit() : handleEdit(post)}
                                className="p-1 text-primary hover:bg-primary/10 rounded"
                                title="Edit post"
                            >
                                <Edit2 size={16} />
                            </button>
                            <button
                                onClick={() => onUpdatePost(post.id, { published: !post.published })}
                                className="p-1 text-text/50 hover:text-text rounded"
                                title={post.published ? 'Unpublish' : 'Publish'}
                            >
                                {post.published ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                            <button
                                onClick={() => onDeletePost(post.id)}
                                className="p-1 text-red-400 hover:bg-red-500/10 rounded"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>

                    {/* Edit Form */}
                    {editingPostId === post.id && editPost && (
                        <div className="p-4 pt-0 space-y-4 border-t border-primary/10">
                            <div>
                                <label className="block text-sm font-medium mb-1">Title</label>
                                <input
                                    type="text"
                                    value={editPost.title}
                                    onChange={(e) => setEditPost({ ...editPost, title: e.target.value })}
                                    className="w-full bg-background border border-primary/30 rounded-lg py-2 px-3 text-text focus:border-primary focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Slug (URL path)</label>
                                <input
                                    type="text"
                                    value={editPost.slug}
                                    onChange={(e) => setEditPost({ ...editPost, slug: e.target.value })}
                                    className="w-full bg-background border border-primary/30 rounded-lg py-2 px-3 text-text focus:border-primary focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Excerpt</label>
                                <textarea
                                    value={editPost.excerpt}
                                    onChange={(e) => setEditPost({ ...editPost, excerpt: e.target.value })}
                                    rows={2}
                                    className="w-full bg-background border border-primary/30 rounded-lg py-2 px-3 text-text focus:border-primary focus:outline-none resize-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Content (Markdown)</label>
                                <textarea
                                    value={editPost.content}
                                    onChange={(e) => setEditPost({ ...editPost, content: e.target.value })}
                                    rows={10}
                                    className="w-full bg-background border border-primary/30 rounded-lg py-2 px-3 text-text focus:border-primary focus:outline-none resize-none font-mono text-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Cover Image URL <span className="text-text/50 font-normal">(optional)</span></label>
                                <input
                                    type="url"
                                    value={editPost.coverImage}
                                    onChange={(e) => setEditPost({ ...editPost, coverImage: e.target.value })}
                                    placeholder="https://example.com/image.jpg"
                                    className="w-full bg-background border border-primary/30 rounded-lg py-2 px-3 text-text focus:border-primary focus:outline-none"
                                />
                                {editPost.coverImage && (
                                    <img src={editPost.coverImage} alt="Cover preview" className="mt-2 w-full max-h-40 object-cover rounded-lg" />
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Tags (comma-separated)</label>
                                <input
                                    type="text"
                                    value={editPost.tags}
                                    onChange={(e) => setEditPost({ ...editPost, tags: e.target.value })}
                                    className="w-full bg-background border border-primary/30 rounded-lg py-2 px-3 text-text focus:border-primary focus:outline-none"
                                />
                            </div>

                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id={`edit-published-${post.id}`}
                                    checked={editPost.published}
                                    onChange={(e) => setEditPost({ ...editPost, published: e.target.checked })}
                                    className="rounded"
                                />
                                <label htmlFor={`edit-published-${post.id}`} className="text-sm">Published</label>
                            </div>

                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleSaveEdit(post.id)}
                                    className="px-4 py-2 bg-primary text-background rounded-lg hover:bg-primary/90"
                                >
                                    Save Changes
                                </button>
                                <button
                                    onClick={handleCancelEdit}
                                    className="px-4 py-2 border border-primary/30 rounded-lg hover:bg-primary/5"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};


// Collaboration Editor
const CollaborationEditor: React.FC<{ collaboration: CollaborationData; setCollaboration: (c: CollaborationData) => void }> = ({ collaboration, setCollaboration }) => {
    const [showIconPicker, setShowIconPicker] = useState(false);

    if (!collaboration) {
        return (
            <div className="bg-[#0f1a1b] rounded-xl p-6 border border-primary/20">
                <p className="text-text/50">No collaboration data. Click "Initialize Portfolio Data" in Profile section first.</p>
            </div>
        );
    }

    return (
        <div className="bg-[#0f1a1b] rounded-xl p-6 border border-primary/20">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Collaboration Section</h3>
                <label className="flex items-center gap-2 cursor-pointer">
                    <span className="text-sm text-text/70">Visible</span>
                    <div
                        onClick={() => setCollaboration({ ...collaboration, visible: !collaboration.visible })}
                        className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${collaboration.visible ? 'bg-primary' : 'bg-background border border-primary/30'}`}
                    >
                        <div className={`absolute top-1 w-4 h-4 rounded-full transition-all ${collaboration.visible ? 'right-1 bg-background' : 'left-1 bg-text/50'}`} />
                    </div>
                </label>
            </div>

            <div className="space-y-4">
                <div className="flex items-center gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Icon</label>
                        <button
                            onClick={() => setShowIconPicker(true)}
                            className="p-3 bg-background border border-primary/30 rounded-lg hover:border-primary transition-colors"
                            title="Change icon"
                        >
                            <DynamicIcon name={collaboration.icon || 'Users'} size={24} className="text-primary" />
                        </button>
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-medium mb-1">Section Title</label>
                        <input
                            type="text"
                            value={collaboration.title}
                            onChange={(e) => setCollaboration({ ...collaboration, title: e.target.value })}
                            className="w-full bg-background border border-primary/30 rounded-lg py-2 px-4 text-text focus:border-primary focus:outline-none"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <textarea
                        value={collaboration.description}
                        onChange={(e) => setCollaboration({ ...collaboration, description: e.target.value })}
                        rows={4}
                        className="w-full bg-background border border-primary/30 rounded-lg py-2 px-4 text-text focus:border-primary focus:outline-none resize-none"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Button Text</label>
                        <input
                            type="text"
                            value={collaboration.buttonText}
                            onChange={(e) => setCollaboration({ ...collaboration, buttonText: e.target.value })}
                            className="w-full bg-background border border-primary/30 rounded-lg py-2 px-4 text-text focus:border-primary focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Button Link</label>
                        <input
                            type="text"
                            value={collaboration.buttonLink}
                            onChange={(e) => setCollaboration({ ...collaboration, buttonLink: e.target.value })}
                            placeholder="#contact or https://..."
                            className="w-full bg-background border border-primary/30 rounded-lg py-2 px-4 text-text focus:border-primary focus:outline-none"
                        />
                    </div>
                </div>
            </div>

            {showIconPicker && (
                <IconPicker
                    selectedIcon={collaboration.icon}
                    onSelect={(icon) => setCollaboration({ ...collaboration, icon })}
                    onClose={() => setShowIconPicker(false)}
                />
            )}
        </div>
    );
};

// Custom Sections Editor - for adding dynamic sections like "Let's Collaborate"
const CustomSectionsEditor: React.FC<{ customSections: CustomSection[]; setCustomSections: (s: CustomSection[]) => void }> = ({ customSections, setCustomSections }) => {
    const [expandedSection, setExpandedSection] = useState<string | null>(null);
    const [showIconPicker, setShowIconPicker] = useState<string | null>(null);

    const addSection = () => {
        const newSection: CustomSection = {
            id: `section-${Date.now()}`,
            title: 'New Section',
            description: 'Add your section description here...',
            buttonText: 'Learn More',
            buttonLink: '#contact',
            icon: 'Star',
            visible: true,
            order: customSections.length
        };
        setCustomSections([...customSections, newSection]);
        setExpandedSection(newSection.id);
    };

    const updateSection = (index: number, updates: Partial<CustomSection>) => {
        const newSections = [...customSections];
        newSections[index] = { ...newSections[index], ...updates };
        setCustomSections(newSections);
    };

    const deleteSection = (index: number) => {
        setCustomSections(customSections.filter((_, i) => i !== index));
    };

    const moveSection = (index: number, direction: 'up' | 'down') => {
        if ((direction === 'up' && index === 0) || (direction === 'down' && index === customSections.length - 1)) return;
        const newSections = [...customSections];
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        [newSections[index], newSections[targetIndex]] = [newSections[targetIndex], newSections[index]];
        // Update order
        newSections.forEach((s, i) => s.order = i);
        setCustomSections(newSections);
    };

    return (
        <div className="space-y-4">
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-4">
                <p className="text-blue-400 text-sm">
                    <strong>Custom Sections</strong> appear at the bottom of your portfolio, before the Contact section.
                    Use them for calls-to-action like "Let's Collaborate", "Hire Me", "My Services", etc.
                </p>
            </div>

            {customSections.length === 0 && (
                <div className="text-center py-8 text-text/50">
                    <p className="mb-4">No custom sections yet.</p>
                    <p className="text-sm">Click "Add Section" to create one!</p>
                </div>
            )}

            {customSections.map((section, index) => {
                return (
                    <div key={section.id} className="bg-[#0f1a1b] rounded-xl border border-primary/20 overflow-hidden">
                        <div className="p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="flex flex-col gap-1">
                                    <button onClick={() => moveSection(index, 'up')} disabled={index === 0} className="p-0.5 text-text/50 hover:text-text disabled:opacity-30">
                                        <ChevronUp size={14} />
                                    </button>
                                    <button onClick={() => moveSection(index, 'down')} disabled={index === customSections.length - 1} className="p-0.5 text-text/50 hover:text-text disabled:opacity-30">
                                        <ChevronDown size={14} />
                                    </button>
                                </div>
                                <button
                                    onClick={() => setShowIconPicker(section.id)}
                                    className="p-2 bg-background/50 rounded-lg hover:bg-primary/10 transition-colors"
                                    title="Change icon"
                                >
                                    <DynamicIcon name={section.icon} size={20} className="text-primary" />
                                </button>
                                <div>
                                    <h4 className="font-medium">{section.title}</h4>
                                    <span className={`text-xs ${section.visible ? 'text-green-400' : 'text-yellow-400'}`}>
                                        {section.visible ? 'Visible' : 'Hidden'}
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => updateSection(index, { visible: !section.visible })}
                                    className="p-1 text-text/50 hover:text-text rounded"
                                    title={section.visible ? 'Hide section' : 'Show section'}
                                >
                                    {section.visible ? <Eye size={16} /> : <EyeOff size={16} />}
                                </button>
                                <button onClick={() => deleteSection(index)} className="p-1 text-red-400 hover:bg-red-500/10 rounded">
                                    <Trash2 size={16} />
                                </button>
                                <button onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}>
                                    {expandedSection === section.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                                </button>
                            </div>
                        </div>

                        {expandedSection === section.id && (
                            <div className="p-4 pt-0 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Section Title</label>
                                    <input
                                        type="text"
                                        value={section.title}
                                        onChange={(e) => updateSection(index, { title: e.target.value })}
                                        className="w-full bg-background border border-primary/30 rounded-lg py-2 px-3 text-text focus:border-primary focus:outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">Description</label>
                                    <textarea
                                        value={section.description}
                                        onChange={(e) => updateSection(index, { description: e.target.value })}
                                        rows={3}
                                        className="w-full bg-background border border-primary/30 rounded-lg py-2 px-3 text-text focus:border-primary focus:outline-none resize-none"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Button Text <span className="text-text/50 font-normal">(optional)</span></label>
                                        <input
                                            type="text"
                                            value={section.buttonText || ''}
                                            onChange={(e) => updateSection(index, { buttonText: e.target.value })}
                                            placeholder="Leave empty to hide button"
                                            className="w-full bg-background border border-primary/30 rounded-lg py-2 px-3 text-text focus:border-primary focus:outline-none text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Button Link</label>
                                        <input
                                            type="text"
                                            value={section.buttonLink || ''}
                                            onChange={(e) => updateSection(index, { buttonLink: e.target.value })}
                                            placeholder="#contact or https://..."
                                            className="w-full bg-background border border-primary/30 rounded-lg py-2 px-3 text-text focus:border-primary focus:outline-none text-sm"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {showIconPicker === section.id && (
                            <IconPicker
                                selectedIcon={section.icon}
                                onSelect={(icon) => updateSection(index, { icon })}
                                onClose={() => setShowIconPicker(null)}
                            />
                        )}
                    </div>
                );
            })}

            <button
                onClick={addSection}
                className="w-full flex items-center justify-center gap-2 py-4 border-2 border-dashed border-primary/30 rounded-xl text-primary hover:bg-primary/5 transition-colors"
            >
                <Plus size={20} />
                <span className="font-medium">Add Section</span>
            </button>
        </div>
    );
};

export default Admin;
