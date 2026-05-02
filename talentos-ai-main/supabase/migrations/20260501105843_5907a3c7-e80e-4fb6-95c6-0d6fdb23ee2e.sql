
-- profiles
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  avatar_url text,
  headline text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Profiles are viewable by owner"
  on public.profiles for select
  to authenticated
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.profiles for insert
  to authenticated
  with check (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  to authenticated
  using (auth.uid() = id);

-- updated_at trigger
create or replace function public.tg_set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.tg_set_updated_at();

-- auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    new.raw_user_meta_data->>'avatar_url'
  )
  on conflict (id) do nothing;
  return new;
end $$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- analyses
create table public.analyses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  kind text not null check (kind in ('resume','ats','role_match','roadmap')),
  title text,
  input jsonb,
  result jsonb not null default '{}'::jsonb,
  score int,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index analyses_user_kind_idx on public.analyses(user_id, kind, created_at desc);

alter table public.analyses enable row level security;

create policy "Users view own analyses"
  on public.analyses for select to authenticated
  using (auth.uid() = user_id);

create policy "Users insert own analyses"
  on public.analyses for insert to authenticated
  with check (auth.uid() = user_id);

create policy "Users update own analyses"
  on public.analyses for update to authenticated
  using (auth.uid() = user_id);

create policy "Users delete own analyses"
  on public.analyses for delete to authenticated
  using (auth.uid() = user_id);

create trigger analyses_set_updated_at
  before update on public.analyses
  for each row execute function public.tg_set_updated_at();
