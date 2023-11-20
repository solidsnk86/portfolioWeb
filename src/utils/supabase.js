import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://wbywikatpjrneagwppxf.supabase.co'
const SUPABASE_API_KEY =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndieXdpa2F0cGpybmVhZ3dwcHhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk4Mzg5MzAsImV4cCI6MjAxNTQxNDkzMH0.nv6KxxPZBSiROB3-bak4LGAud2ex-wCDvyykMrYDCZQ'

export const supabase = createClient(SUPABASE_URL, SUPABASE_API_KEY)
