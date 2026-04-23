-- Migration: allow manual admin reservations without linking to an auth user
-- Run this once in Supabase SQL Editor for existing databases.

BEGIN;

-- 1) Allow reservations without user_id
ALTER TABLE public.reservations
    ALTER COLUMN user_id DROP NOT NULL;

-- 2) Make foreign key compatible with nullable user_id
DO $$
DECLARE
    fk_name text;
BEGIN
    SELECT tc.constraint_name
    INTO fk_name
    FROM information_schema.table_constraints tc
    JOIN information_schema.key_column_usage kcu
      ON tc.constraint_name = kcu.constraint_name
     AND tc.table_schema = kcu.table_schema
    WHERE tc.table_schema = 'public'
      AND tc.table_name = 'reservations'
      AND tc.constraint_type = 'FOREIGN KEY'
      AND kcu.column_name = 'user_id'
    LIMIT 1;

    IF fk_name IS NOT NULL THEN
        EXECUTE format('ALTER TABLE public.reservations DROP CONSTRAINT %I', fk_name);
    END IF;
END $$;

ALTER TABLE public.reservations
    ADD CONSTRAINT reservations_user_id_fkey
    FOREIGN KEY (user_id)
    REFERENCES auth.users(id)
    ON DELETE SET NULL;

-- 3) Ensure admins can insert manual/guest reservations
DROP POLICY IF EXISTS "Admins can insert reservations" ON public.reservations;
CREATE POLICY "Admins can insert reservations"
    ON public.reservations
    FOR INSERT
    WITH CHECK (EXISTS (
        SELECT 1 FROM public.admin_users au WHERE au.user_id = auth.uid()
    ));

COMMIT;
