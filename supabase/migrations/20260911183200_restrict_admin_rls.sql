CREATE TABLE public.admins (
    id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE
);

ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view their own record" 
ON public.admins FOR SELECT 
USING (id = auth.uid());

-- Insert initial admin identity
INSERT INTO public.admins (id) VALUES ('dbced213-7f70-40c2-a496-1d4a16be3e75');

-- DROP existing unsafe policies
DROP POLICY IF EXISTS "Admin full access on profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admin full access on about" ON public.about;
DROP POLICY IF EXISTS "Admin full access on skill_categories" ON public.skill_categories;
DROP POLICY IF EXISTS "Admin full access on skills" ON public.skills;
DROP POLICY IF EXISTS "Admin full access on projects" ON public.projects;
DROP POLICY IF EXISTS "Admin full access on project_images" ON public.project_images;
DROP POLICY IF EXISTS "Admin full access on project_skills" ON public.project_skills;
DROP POLICY IF EXISTS "Admin full access on certificates" ON public.certificates;
DROP POLICY IF EXISTS "Admin full access on badges" ON public.badges;
DROP POLICY IF EXISTS "Admin full access on education" ON public.education;
DROP POLICY IF EXISTS "Admin full access on experience" ON public.experience;
DROP POLICY IF EXISTS "Admin full access on achievements" ON public.achievements;
DROP POLICY IF EXISTS "Admin full access on learning_journey" ON public.learning_journey;
DROP POLICY IF EXISTS "Admin full access on genai_projects" ON public.genai_projects;
DROP POLICY IF EXISTS "Admin full access on threejs_experiments" ON public.threejs_experiments;
DROP POLICY IF EXISTS "Admin full access on github_repositories" ON public.github_repositories;
DROP POLICY IF EXISTS "Admin full access on resume_versions" ON public.resume_versions;
DROP POLICY IF EXISTS "Admin full access on messages" ON public.messages;
DROP POLICY IF EXISTS "Admin full access on notifications" ON public.notifications;
DROP POLICY IF EXISTS "Admin full access on visitor_sessions" ON public.visitor_sessions;
DROP POLICY IF EXISTS "Admin full access on visitor_events" ON public.visitor_events;
DROP POLICY IF EXISTS "Admin full access on site_settings" ON public.site_settings;
DROP POLICY IF EXISTS "Admin full access on media" ON public.media;

DROP POLICY IF EXISTS "Media admin insert access" ON storage.objects;
DROP POLICY IF EXISTS "Media admin update access" ON storage.objects;
DROP POLICY IF EXISTS "Media admin delete access" ON storage.objects;

-- CREATE strict policies checking public.admins

CREATE POLICY "Admin full access on profiles" ON public.profiles FOR ALL USING (EXISTS (SELECT 1 FROM public.admins WHERE id = auth.uid())) WITH CHECK (EXISTS (SELECT 1 FROM public.admins WHERE id = auth.uid()));
CREATE POLICY "Admin full access on about" ON public.about FOR ALL USING (EXISTS (SELECT 1 FROM public.admins WHERE id = auth.uid())) WITH CHECK (EXISTS (SELECT 1 FROM public.admins WHERE id = auth.uid()));
CREATE POLICY "Admin full access on skill_categories" ON public.skill_categories FOR ALL USING (EXISTS (SELECT 1 FROM public.admins WHERE id = auth.uid())) WITH CHECK (EXISTS (SELECT 1 FROM public.admins WHERE id = auth.uid()));
CREATE POLICY "Admin full access on skills" ON public.skills FOR ALL USING (EXISTS (SELECT 1 FROM public.admins WHERE id = auth.uid())) WITH CHECK (EXISTS (SELECT 1 FROM public.admins WHERE id = auth.uid()));
CREATE POLICY "Admin full access on projects" ON public.projects FOR ALL USING (EXISTS (SELECT 1 FROM public.admins WHERE id = auth.uid())) WITH CHECK (EXISTS (SELECT 1 FROM public.admins WHERE id = auth.uid()));
CREATE POLICY "Admin full access on project_images" ON public.project_images FOR ALL USING (EXISTS (SELECT 1 FROM public.admins WHERE id = auth.uid())) WITH CHECK (EXISTS (SELECT 1 FROM public.admins WHERE id = auth.uid()));
CREATE POLICY "Admin full access on project_skills" ON public.project_skills FOR ALL USING (EXISTS (SELECT 1 FROM public.admins WHERE id = auth.uid())) WITH CHECK (EXISTS (SELECT 1 FROM public.admins WHERE id = auth.uid()));
CREATE POLICY "Admin full access on certificates" ON public.certificates FOR ALL USING (EXISTS (SELECT 1 FROM public.admins WHERE id = auth.uid())) WITH CHECK (EXISTS (SELECT 1 FROM public.admins WHERE id = auth.uid()));
CREATE POLICY "Admin full access on badges" ON public.badges FOR ALL USING (EXISTS (SELECT 1 FROM public.admins WHERE id = auth.uid())) WITH CHECK (EXISTS (SELECT 1 FROM public.admins WHERE id = auth.uid()));
CREATE POLICY "Admin full access on education" ON public.education FOR ALL USING (EXISTS (SELECT 1 FROM public.admins WHERE id = auth.uid())) WITH CHECK (EXISTS (SELECT 1 FROM public.admins WHERE id = auth.uid()));
CREATE POLICY "Admin full access on experience" ON public.experience FOR ALL USING (EXISTS (SELECT 1 FROM public.admins WHERE id = auth.uid())) WITH CHECK (EXISTS (SELECT 1 FROM public.admins WHERE id = auth.uid()));
CREATE POLICY "Admin full access on achievements" ON public.achievements FOR ALL USING (EXISTS (SELECT 1 FROM public.admins WHERE id = auth.uid())) WITH CHECK (EXISTS (SELECT 1 FROM public.admins WHERE id = auth.uid()));
CREATE POLICY "Admin full access on learning_journey" ON public.learning_journey FOR ALL USING (EXISTS (SELECT 1 FROM public.admins WHERE id = auth.uid())) WITH CHECK (EXISTS (SELECT 1 FROM public.admins WHERE id = auth.uid()));
CREATE POLICY "Admin full access on genai_projects" ON public.genai_projects FOR ALL USING (EXISTS (SELECT 1 FROM public.admins WHERE id = auth.uid())) WITH CHECK (EXISTS (SELECT 1 FROM public.admins WHERE id = auth.uid()));
CREATE POLICY "Admin full access on threejs_experiments" ON public.threejs_experiments FOR ALL USING (EXISTS (SELECT 1 FROM public.admins WHERE id = auth.uid())) WITH CHECK (EXISTS (SELECT 1 FROM public.admins WHERE id = auth.uid()));
CREATE POLICY "Admin full access on github_repositories" ON public.github_repositories FOR ALL USING (EXISTS (SELECT 1 FROM public.admins WHERE id = auth.uid())) WITH CHECK (EXISTS (SELECT 1 FROM public.admins WHERE id = auth.uid()));
CREATE POLICY "Admin full access on resume_versions" ON public.resume_versions FOR ALL USING (EXISTS (SELECT 1 FROM public.admins WHERE id = auth.uid())) WITH CHECK (EXISTS (SELECT 1 FROM public.admins WHERE id = auth.uid()));
CREATE POLICY "Admin full access on messages" ON public.messages FOR ALL USING (EXISTS (SELECT 1 FROM public.admins WHERE id = auth.uid())) WITH CHECK (EXISTS (SELECT 1 FROM public.admins WHERE id = auth.uid()));
CREATE POLICY "Admin full access on notifications" ON public.notifications FOR ALL USING (EXISTS (SELECT 1 FROM public.admins WHERE id = auth.uid())) WITH CHECK (EXISTS (SELECT 1 FROM public.admins WHERE id = auth.uid()));
CREATE POLICY "Admin full access on visitor_sessions" ON public.visitor_sessions FOR ALL USING (EXISTS (SELECT 1 FROM public.admins WHERE id = auth.uid())) WITH CHECK (EXISTS (SELECT 1 FROM public.admins WHERE id = auth.uid()));
CREATE POLICY "Admin full access on visitor_events" ON public.visitor_events FOR ALL USING (EXISTS (SELECT 1 FROM public.admins WHERE id = auth.uid())) WITH CHECK (EXISTS (SELECT 1 FROM public.admins WHERE id = auth.uid()));
CREATE POLICY "Admin full access on site_settings" ON public.site_settings FOR ALL USING (EXISTS (SELECT 1 FROM public.admins WHERE id = auth.uid())) WITH CHECK (EXISTS (SELECT 1 FROM public.admins WHERE id = auth.uid()));
CREATE POLICY "Admin full access on media" ON public.media FOR ALL USING (EXISTS (SELECT 1 FROM public.admins WHERE id = auth.uid())) WITH CHECK (EXISTS (SELECT 1 FROM public.admins WHERE id = auth.uid()));

CREATE POLICY "Media admin insert access" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'media' AND EXISTS (SELECT 1 FROM public.admins WHERE id = auth.uid()));
CREATE POLICY "Media admin update access" ON storage.objects FOR UPDATE USING (bucket_id = 'media' AND EXISTS (SELECT 1 FROM public.admins WHERE id = auth.uid())) WITH CHECK (bucket_id = 'media' AND EXISTS (SELECT 1 FROM public.admins WHERE id = auth.uid()));
CREATE POLICY "Media admin delete access" ON storage.objects FOR DELETE USING (bucket_id = 'media' AND EXISTS (SELECT 1 FROM public.admins WHERE id = auth.uid()));
