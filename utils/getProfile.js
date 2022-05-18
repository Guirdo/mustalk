import { supabase } from "./supabaseClient"

async function getProfile(id) {
    try {
      let { data, error, status } = await supabase
        .from('profiles')
        .select(`id,username, biography, website`)
        .eq('id', id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        return data
      }
    } catch (error) {
      
    }
  }

export default getProfile