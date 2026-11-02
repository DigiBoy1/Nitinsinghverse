-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Profiles Table (Global Identity/Settings)
CREATE TABLE public.profiles (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    title text,
    bio text,
    email text,
    github_url text,
    linkedin_url text,
    availability_status text,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- 2. About
CREATE TABLE public.about (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    who_i_am text,
    what_i_do text,
    what_im_exploring text,
    what_i_like_building text,
    visibility boolean DEFAULT true,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- 3. Skill Categories
CREATE TABLE public.skill_categories (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    display_order integer DEFAULT 0,
    visibility boolean DEFAULT true,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- 4. Skills
CREATE TABLE public.skills (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id uuid REFERENCES public.skill_categories(id) ON DELETE CASCADE,
    name text NOT NULL,
    icon text,
    description text,
    url text,
    proficiency_level text,
    learning_status text,
    featured boolean DEFAULT false,
    display_order integer DEFAULT 0,
    visibility boolean DEFAULT true,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- 5. Projects
CREATE TABLE public.projects (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    title text NOT NULL,
    slug text UNIQUE NOT NULL,
    short_description text,
    full_description text,
    thumbnail text, -- URL or storage reference
    logo text,
    problem text,
    solution text,
    features jsonb DEFAULT '[]'::jsonb,
    tech_stack jsonb DEFAULT '[]'::jsonb,
    github_url text,
    live_url text,
    status text,
    start_date date,
    end_date date,
    featured boolean DEFAULT false,
    display_order integer DEFAULT 0,
    visibility boolean DEFAULT true,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- 6. Project Images
CREATE TABLE public.project_images (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id uuid REFERENCES public.projects(id) ON DELETE CASCADE,
    url text NOT NULL,
    alt_text text,
    display_order integer DEFAULT 0,
    created_at timestamptz DEFAULT now()
);

-- 7. Project Skills (Many-to-Many)
CREATE TABLE public.project_skills (
    project_id uuid REFERENCES public.projects(id) ON DELETE CASCADE,
    skill_id uuid REFERENCES public.skills(id) ON DELETE CASCADE,
    PRIMARY KEY (project_id, skill_id)
);

-- 8. Certificates
CREATE TABLE public.certificates (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    title text NOT NULL,
    issuer text NOT NULL,
    issue_date date,
    credential_id text,
    image_url text,
    pdf_url text,
    description text,
    verification_url text,
    featured boolean DEFAULT false,
    display_order integer DEFAULT 0,
    visibility boolean DEFAULT true,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- 9. Badges
CREATE TABLE public.badges (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    title text NOT NULL,
    issuer text NOT NULL,
    image_url text NOT NULL,
    issue_date date,
    credential_id text,
    verification_url text,
    description text,
    display_order integer DEFAULT 0,
    visibility boolean DEFAULT true,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- 10. Education
CREATE TABLE public.education (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    institution text NOT NULL,
    degree text NOT NULL,
    field_of_study text,
    start_date date,
    end_date date,
    description text,
    display_order integer DEFAULT 0,
    visibility boolean DEFAULT true,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- 11. Experience
CREATE TABLE public.experience (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    company text NOT NULL,
    position text NOT NULL,
    start_date date,
    end_date date,
    current boolean DEFAULT false,
    description text,
    display_order integer DEFAULT 0,
    visibility boolean DEFAULT true,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- 12. Achievements
CREATE TABLE public.achievements (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    title text NOT NULL,
    date date,
    description text,
    url text,
    display_order integer DEFAULT 0,
    visibility boolean DEFAULT true,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- 13. Learning Journey
CREATE TABLE public.learning_journey (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    phase text NOT NULL,
    title text NOT NULL,
    description text,
    date date,
    display_order integer DEFAULT 0,
    visibility boolean DEFAULT true,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- 14. GenAI Projects
CREATE TABLE public.genai_projects (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    title text NOT NULL,
    category text,
    description text,
    url text,
    thumbnail text,
    display_order integer DEFAULT 0,
    visibility boolean DEFAULT true,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- 15. Three.js Experiments
CREATE TABLE public.threejs_experiments (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    title text NOT NULL,
    description text,
    url text,
    thumbnail text,
    display_order integer DEFAULT 0,
    visibility boolean DEFAULT true,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- 16. GitHub Repositories
CREATE TABLE public.github_repositories (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    url text NOT NULL,
    description text,
    stars integer DEFAULT 0,
    forks integer DEFAULT 0,
    language text,
    display_order integer DEFAULT 0,
    visibility boolean DEFAULT true,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- 17. Resume Versions
CREATE TABLE public.resume_versions (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    version_name text NOT NULL,
    file_url text NOT NULL,
    is_active boolean DEFAULT false,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- 18. Messages (Contact Form)
CREATE TABLE public.messages (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    email text NOT NULL,
    subject text,
    message text NOT NULL,
    status text DEFAULT 'unread', -- unread, read, archived
    created_at timestamptz DEFAULT now()
);

-- 19. Notifications
CREATE TABLE public.notifications (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    title text NOT NULL,
    message text,
    type text,
    read boolean DEFAULT false,
    created_at timestamptz DEFAULT now()
);

-- 20. Visitor Sessions
CREATE TABLE public.visitor_sessions (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id text NOT NULL,
    ip_hash text,
    user_agent text,
    location text,
    created_at timestamptz DEFAULT now()
);

-- 21. Visitor Events
CREATE TABLE public.visitor_events (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id uuid REFERENCES public.visitor_sessions(id) ON DELETE CASCADE,
    event_type text NOT NULL,
    page_url text,
    metadata jsonb DEFAULT '{}'::jsonb,
    created_at timestamptz DEFAULT now()
);

-- 22. Site Settings
CREATE TABLE public.site_settings (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    title text NOT NULL,
    description text,
    seo_metadata jsonb DEFAULT '{}'::jsonb,
    og_image text,
    favicon text,
    theme_settings jsonb DEFAULT '{}'::jsonb,
    hero_copy text,
    updated_at timestamptz DEFAULT now()
);

-- 23. Media (Generic references)
CREATE TABLE public.media (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    file_name text NOT NULL,
    file_type text NOT NULL,
    url text NOT NULL,
    size integer,
    created_at timestamptz DEFAULT now()
);

-- =========================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =========================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.about ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skill_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.education ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_journey ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.genai_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.threejs_experiments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.github_repositories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resume_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.visitor_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.visitor_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media ENABLE ROW LEVEL SECURITY;

-- 1. Public Read Access (where visibility = true)
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Public about is viewable by everyone" ON public.about FOR SELECT USING (visibility = true);
CREATE POLICY "Public skill categories are viewable by everyone" ON public.skill_categories FOR SELECT USING (visibility = true);
CREATE POLICY "Public skills are viewable by everyone" ON public.skills FOR SELECT USING (visibility = true);
CREATE POLICY "Public projects are viewable by everyone" ON public.projects FOR SELECT USING (visibility = true);
CREATE POLICY "Project images viewable by everyone" ON public.project_images FOR SELECT USING (true);
CREATE POLICY "Project skills viewable by everyone" ON public.project_skills FOR SELECT USING (true);
CREATE POLICY "Public certificates are viewable by everyone" ON public.certificates FOR SELECT USING (visibility = true);
CREATE POLICY "Public badges are viewable by everyone" ON public.badges FOR SELECT USING (visibility = true);
CREATE POLICY "Public education is viewable by everyone" ON public.education FOR SELECT USING (visibility = true);
CREATE POLICY "Public experience is viewable by everyone" ON public.experience FOR SELECT USING (visibility = true);
CREATE POLICY "Public achievements are viewable by everyone" ON public.achievements FOR SELECT USING (visibility = true);
CREATE POLICY "Public learning journey is viewable by everyone" ON public.learning_journey FOR SELECT USING (visibility = true);
CREATE POLICY "Public genai projects are viewable by everyone" ON public.genai_projects FOR SELECT USING (visibility = true);
CREATE POLICY "Public threejs experiments are viewable by everyone" ON public.threejs_experiments FOR SELECT USING (visibility = true);
CREATE POLICY "Public github repositories are viewable by everyone" ON public.github_repositories FOR SELECT USING (visibility = true);
CREATE POLICY "Active resume viewable by everyone" ON public.resume_versions FOR SELECT USING (is_active = true);
CREATE POLICY "Site settings viewable by everyone" ON public.site_settings FOR SELECT USING (true);

-- 2. Public Insert Access (Contact and Analytics)
CREATE POLICY "Anyone can submit a message" ON public.messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can submit visitor session" ON public.visitor_sessions FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can submit visitor event" ON public.visitor_events FOR INSERT WITH CHECK (true);

-- 3. Admin Access (Full CRUD for all tables)
DO $$
DECLARE
    t text;
BEGIN
    FOR t IN 
        SELECT table_name FROM information_schema.tables 
        WHERE table_schema = 'public' AND table_type = 'BASE TABLE'
    LOOP
        EXECUTE format('CREATE POLICY "Admin full access on %I" ON public.%I FOR ALL USING (auth.uid() IS NOT NULL)', t, t);
    END LOOP;
END;
$$;

-- =========================================
-- STORAGE BUCKETS
-- =========================================
INSERT INTO storage.buckets (id, name, public) VALUES ('media', 'media', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Media public read access" ON storage.objects FOR SELECT USING (bucket_id = 'media');
CREATE POLICY "Media admin insert access" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'media' AND auth.uid() IS NOT NULL);
CREATE POLICY "Media admin update access" ON storage.objects FOR UPDATE USING (bucket_id = 'media' AND auth.uid() IS NOT NULL);
CREATE POLICY "Media admin delete access" ON storage.objects FOR DELETE USING (bucket_id = 'media' AND auth.uid() IS NOT NULL);
