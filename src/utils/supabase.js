import { createClient } from '@supabase/supabase-js'
import { error } from 'console'

const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_API_KEY = process.env.SUPABASE_API_KEY

if (!SUPABASE_URL || !SUPABASE_API_KEY) {
	throw new Error('Mmmm 🛴', error)
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_API_KEY)
