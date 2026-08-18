-- Migration: add sensible defaults to orders table
-- Run this in Supabase SQL Editor (Dashboard) or via psql connected to your project DB.

BEGIN;

-- Update existing NULLs to safe defaults
UPDATE public.orders SET customer_name = '' WHERE customer_name IS NULL;
UPDATE public.orders SET customer_email = '' WHERE customer_email IS NULL;
UPDATE public.orders SET items_text = '[]' WHERE items_text IS NULL;
UPDATE public.orders SET status = 'pending' WHERE status IS NULL;

-- Set column defaults to avoid future insert issues from functions
ALTER TABLE public.orders ALTER COLUMN customer_name SET DEFAULT '';
ALTER TABLE public.orders ALTER COLUMN customer_email SET DEFAULT '';
ALTER TABLE public.orders ALTER COLUMN items_text SET DEFAULT '[]';
ALTER TABLE public.orders ALTER COLUMN status SET DEFAULT 'pending';

-- Ensure timestamps have defaults
ALTER TABLE public.orders ALTER COLUMN created_at SET DEFAULT now();
ALTER TABLE public.orders ALTER COLUMN updated_at SET DEFAULT now();

COMMIT;

-- Notes:
-- - This migration only sets defaults and normalises existing NULL values.
-- - After applying this in the DB, you can remove some of the defensive defaults in the Edge Functions if you prefer.
-- - Test in staging before applying to production.
