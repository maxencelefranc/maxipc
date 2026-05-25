-- Migration: add site_content table for public content and admin-managed settings
-- Run this once in Supabase SQL Editor on existing databases.

BEGIN;

CREATE TABLE IF NOT EXISTS public.site_content (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL DEFAULT '',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can read site content" ON public.site_content;
CREATE POLICY "Public can read site content"
    ON public.site_content
    FOR SELECT
    USING (true);

DROP POLICY IF EXISTS "Admins can manage site content" ON public.site_content;
CREATE POLICY "Admins can manage site content"
    ON public.site_content
    FOR ALL
    USING (EXISTS (
        SELECT 1 FROM public.admin_users au WHERE au.user_id = auth.uid()
    ))
    WITH CHECK (EXISTS (
        SELECT 1 FROM public.admin_users au WHERE au.user_id = auth.uid()
    ));

COMMIT;
