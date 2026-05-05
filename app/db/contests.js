import { supabase } from "@/lib/supabase"


export async function getUpcomingContests() {  
   const {data, error} = await supabase
        .from("contests")
        .select("*")
        .gt("start_time", new Date().toISOString())
   
    
   if (error) throw error
   return data
}


export async function getExistingContests() {
    const {data, error} = await supabase
        .from("contests")
        .select("*")
        .lt("start_time", new Date().toISOString())


    if(error) throw error
    return data
}