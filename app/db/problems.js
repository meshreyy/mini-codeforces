import { supabase } from "@/lib/supabase"


export async function getProblems() {
    const {data, error} = await supabase
    .from("problems")
    .select("*")



    if(error) throw error
    return data
}

export async function getProblemById(id) {
    const {data, error } = await supabase
    .from("problems")
    .select("*")
    .eq("id", id)
    .single()


    if(error) throw error
    return data
}




