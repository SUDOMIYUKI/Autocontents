-- ユーザープロフィール
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  name text not null,
  age integer,
  profession text,
  bio text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- ユーザー設定
create table user_configs (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  tone text not null,
  target_audience jsonb,
  main_themes jsonb,
  platforms jsonb,
  links jsonb,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  unique(user_id)
);

-- スタイルガイド
create table style_guides (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  style_data jsonb not null,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  unique(user_id)
);

-- 投稿テンプレート
create table post_templates (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  day_of_week text not null,
  template_data jsonb not null,
  enabled boolean default true,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- 投稿履歴
create table posts (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  content text not null,
  platform text not null,
  status text not null, -- draft, scheduled, published, failed
  scheduled_at timestamp with time zone,
  published_at timestamp with time zone,
  metadata jsonb,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- スケジュール
create table schedules (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  day_of_week text not null,
  time text not null,
  platform text not null,
  template_name text not null,
  enabled boolean default true,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- RLS (Row Level Security) 有効化
alter table profiles enable row level security;
alter table user_configs enable row level security;
alter table style_guides enable row level security;
alter table post_templates enable row level security;
alter table posts enable row level security;
alter table schedules enable row level security;

-- ポリシー設定 (自分のデータのみアクセス可能)
create policy "Users can view own profile"
  on profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on profiles for update
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on profiles for insert
  with check (auth.uid() = id);

create policy "Users can view own config"
  on user_configs for select
  using (auth.uid() = user_id);

create policy "Users can insert own config"
  on user_configs for insert
  with check (auth.uid() = user_id);

create policy "Users can update own config"
  on user_configs for update
  using (auth.uid() = user_id);

create policy "Users can view own style guide"
  on style_guides for select
  using (auth.uid() = user_id);

create policy "Users can insert own style guide"
  on style_guides for insert
  with check (auth.uid() = user_id);

create policy "Users can update own style guide"
  on style_guides for update
  using (auth.uid() = user_id);

create policy "Users can view own templates"
  on post_templates for select
  using (auth.uid() = user_id);

create policy "Users can insert own templates"
  on post_templates for insert
  with check (auth.uid() = user_id);

create policy "Users can update own templates"
  on post_templates for update
  using (auth.uid() = user_id);

create policy "Users can view own posts"
  on posts for select
  using (auth.uid() = user_id);

create policy "Users can insert own posts"
  on posts for insert
  with check (auth.uid() = user_id);

create policy "Users can update own posts"
  on posts for update
  using (auth.uid() = user_id);

create policy "Users can delete own posts"
  on posts for delete
  using (auth.uid() = user_id);

create policy "Users can view own schedules"
  on schedules for select
  using (auth.uid() = user_id);

create policy "Users can insert own schedules"
  on schedules for insert
  with check (auth.uid() = user_id);

create policy "Users can update own schedules"
  on schedules for update
  using (auth.uid() = user_id);

create policy "Users can delete own schedules"
  on schedules for delete
  using (auth.uid() = user_id);
