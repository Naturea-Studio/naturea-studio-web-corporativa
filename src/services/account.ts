import { shallowRef } from 'vue'
import type { Session } from '@supabase/supabase-js'
import { supabase } from './supabase'

export const session = shallowRef<Session | null>(null)
export const accountReady = shallowRef(!supabase)
export const recovering = shallowRef(false)

supabase?.auth.onAuthStateChange((event, current) => {
  session.value = current
  accountReady.value = true
  if (event === 'PASSWORD_RECOVERY') recovering.value = true
  if (event === 'SIGNED_OUT') recovering.value = false
})
