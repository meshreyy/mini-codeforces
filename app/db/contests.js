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


export async function getContestById(id) {
  const { data, error } = await supabase
    .from("contests")
    .select("*")
    .eq("id", id)
    .single()

  if (error) throw error
  return data
}

export async function getContestProblems(contestId) {
  const { data, error } = await supabase
    .from("contests_problems")
    .select("*, problems(*)")
    .eq("contest_id", contestId)

  if (error) throw error
  return data
}

export async function getContestLeaderboard(contestId) {
  const { data, error } = await supabase
    .from("leaderboard")
    .select("*, users(username)")
    .eq("contest_id", contestId)
    .order("score", { ascending: false })
    .order("last_solved_at", { ascending: true })

  if (error) throw error
  return data
}


