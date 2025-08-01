-- Function to increment CV views
CREATE OR REPLACE FUNCTION increment_views(cv_id UUID)
RETURNS VOID AS $$
BEGIN
  INSERT INTO public.analytics (cv_id, views, downloads, shares)
  VALUES (cv_id, 1, 0, 0)
  ON CONFLICT (cv_id)
  DO UPDATE SET 
    views = analytics.views + 1,
    last_viewed_at = timezone('utc'::text, now());
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to increment CV downloads
CREATE OR REPLACE FUNCTION increment_downloads(cv_id UUID)
RETURNS VOID AS $$
BEGIN
  INSERT INTO public.analytics (cv_id, views, downloads, shares)
  VALUES (cv_id, 0, 1, 0)
  ON CONFLICT (cv_id)
  DO UPDATE SET downloads = analytics.downloads + 1;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to increment CV shares
CREATE OR REPLACE FUNCTION increment_shares(cv_id UUID)
RETURNS VOID AS $$
BEGIN
  INSERT INTO public.analytics (cv_id, views, downloads, shares)
  VALUES (cv_id, 0, 0, 1)
  ON CONFLICT (cv_id)
  DO UPDATE SET shares = analytics.shares + 1;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Add unique constraint for analytics (one record per CV)
ALTER TABLE public.analytics ADD CONSTRAINT analytics_cv_id_unique UNIQUE (cv_id);