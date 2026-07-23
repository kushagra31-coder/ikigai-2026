-- Add organization column to profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS organization VARCHAR(255);
