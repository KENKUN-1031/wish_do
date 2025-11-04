-- Database Trigger: Supabase Auth と public.users を自動同期

-- 1. トリガー関数の作成
-- 新しいユーザーが auth.users に追加されたら、public.users にも追加する
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, created_at, updated_at)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.created_at,
    NEW.updated_at
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. トリガーの作成
-- auth.users テーブルに新しいレコードが追加されたときに実行
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- 3. 既存のユーザーを同期（オプション）
-- 既に auth.users にいるユーザーを public.users に追加
INSERT INTO public.users (id, email, created_at, updated_at)
SELECT id, email, created_at, updated_at
FROM auth.users
WHERE id NOT IN (SELECT id FROM public.users);
