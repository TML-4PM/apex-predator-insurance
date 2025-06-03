
-- Create a function to get user notifications with profile data
CREATE OR REPLACE FUNCTION public.get_user_notifications(p_user_id uuid)
RETURNS TABLE (
  id uuid,
  user_id uuid,
  from_user_id uuid,
  type text,
  title text,
  message text,
  read boolean,
  created_at timestamptz,
  related_id uuid,
  from_user jsonb
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    n.id,
    n.user_id,
    n.from_user_id,
    n.type,
    n.title,
    n.message,
    n.read,
    n.created_at,
    n.related_id,
    CASE 
      WHEN n.from_user_id IS NOT NULL THEN
        jsonb_build_object(
          'username', p.username,
          'avatar_url', p.avatar_url
        )
      ELSE NULL
    END as from_user
  FROM public.notifications n
  LEFT JOIN public.profiles p ON p.user_id = n.from_user_id
  WHERE n.user_id = p_user_id
  ORDER BY n.created_at DESC;
END;
$$;
