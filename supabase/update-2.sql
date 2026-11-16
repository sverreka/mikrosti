-- MikroSti update 2: delete account, question reports, weekly leaderboard
-- Paste all of this into Supabase → SQL Editor → New query, and click Run. Safe to run more than once.
-- (schema.sql must have been run first. It is also included at the bottom of schema.sql for new projects.)

-- 1) Let a logged-in user delete their own account (progress, profile and leaderboard rows go with it)
create or replace function public.delete_my_account()
returns void
language plpgsql
security definer set search_path = ''
as $$
begin
  if auth.uid() is null then
    raise exception 'Not logged in';
  end if;
  delete from auth.users where id = auth.uid();
end;
$$;
revoke all on function public.delete_my_account() from public, anon;
grant execute on function public.delete_my_account() to authenticated;

-- 2) "Report a problem" with a question. Anyone can send a report; nobody can read them from the site.
--    You read them in Supabase → Table Editor → question_reports.
create table if not exists public.question_reports (
  id            bigint generated always as identity primary key,
  question_id   text not null check (char_length(question_id) <= 40),
  question_text text check (char_length(question_text) <= 2000),
  message       text not null check (char_length(message) between 3 and 1000),
  user_id       uuid references auth.users(id) on delete set null default auth.uid(),
  created_at    timestamptz not null default now()
);
alter table public.question_reports enable row level security;
drop policy if exists "Anyone can send a report" on public.question_reports;
create policy "Anyone can send a report" on public.question_reports
  for insert to anon, authenticated
  with check (user_id is null or user_id = (select auth.uid()));

-- 3) Weekly leaderboard: only users who opt in, only a nickname and this week's XP are public
create table if not exists public.leaderboard (
  user_id    uuid primary key references auth.users(id) on delete cascade,
  nickname   text not null check (char_length(nickname) between 2 and 20),
  week       text not null check (week ~ '^\d{4}-W\d{2}$'),
  xp         integer not null default 0 check (xp between 0 and 20000),
  updated_at timestamptz not null default now()
);
create index if not exists leaderboard_week_xp on public.leaderboard (week, xp desc);
alter table public.leaderboard enable row level security;
drop policy if exists "Leaderboard is public"         on public.leaderboard;
drop policy if exists "Users can join the leaderboard" on public.leaderboard;
drop policy if exists "Users can update own entry"     on public.leaderboard;
drop policy if exists "Users can leave the leaderboard" on public.leaderboard;
create policy "Leaderboard is public"           on public.leaderboard for select to anon, authenticated using (true);
create policy "Users can join the leaderboard"  on public.leaderboard for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "Users can update own entry"      on public.leaderboard for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "Users can leave the leaderboard" on public.leaderboard for delete to authenticated using ((select auth.uid()) = user_id);
