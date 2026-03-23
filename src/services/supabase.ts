import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = 'https://mztvpxkmtusckpfffyny.supabase.co'
const supabaseKey = 'sb_publishable_V4d0cQV0d-qgjCRRNdb7_g_6KSuZhxb'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
