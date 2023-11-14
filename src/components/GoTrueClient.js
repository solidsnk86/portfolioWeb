import { createGoTrueClient } from '@supabase/gotrue-js'

const supabaseURL = 'https://wbywikatpjrneagwppxf.supabase.co'
const supabaseKey =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndieXdpa2F0cGpybmVhZ3dwcHhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk4Mzg5MzAsImV4cCI6MjAxNTQxNDkzMH0.nv6KxxPZBSiROB3-bak4LGAud2ex-wCDvyykMrYDCZQ'

const goTrueClient = createGoTrueClient({
	url: supabaseURL,
	headers: {
		apiKey: supabaseKey
	}
})

export default goTrueClient
