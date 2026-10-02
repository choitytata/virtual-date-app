-- Run this in Supabase SQL Editor
create extension if not exists pgcrypto;

create table if not exists public.dates (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  place text not null,
  foods jsonb not null default '[]'::jsonb,
  flower text,
  created_at timestamptz not null default now()
);

create table if not exists public.selfies (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  image_url text not null,
  place text,
  created_at timestamptz not null default now()
);

alter table public.dates enable row level security;
alter table public.selfies enable row level security;

create policy "read own dates" on public.dates for select using (auth.uid() = user_id);
create policy "insert own dates" on public.dates for insert with check (auth.uid() = user_id);
create policy "read own selfies" on public.selfies for select using (auth.uid() = user_id);
create policy "insert own selfies" on public.selfies for insert with check (auth.uid() = user_id);

insert into storage.buckets (id, name, public)
values ('selfies','selfies',true)
on conflict (id) do update set public = excluded.public;

create policy "upload own selfies" on storage.objects
for insert to authenticated
with check (bucket_id = 'selfies' and (storage.foldername(name))[1] = auth.uid()::text);

create policy "public selfie read" on storage.objects
for select using (bucket_id = 'selfies');
