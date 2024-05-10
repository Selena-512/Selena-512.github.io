import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl = 'https://akzmofevgcjpjcwmkjld.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFrem1vZmV2Z2NqcGpjd21ramxkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI4NTA2MzcsImV4cCI6MjAyODQyNjYzN30.2my4atOnBxXTukJohfomcQSphSVmcZj7Jp1FQRhWuNA';
const supabase = createClient(supabaseUrl, supabaseKey);

const dname = document.getElementById("dname");
const lnum = document.getElementById("lnum");

async function fetchData(lnum) {
    const { data, error } = await supabase
        .from('People')
        .select("*")
        .or(`LicenseNumber.ilike.%${lnum}%`);

    if (error) {
        console.error('Error Fetching Data:', error.message);
        return [];
    }

    return data;
}



//THERE SHOULD BE STUFF HERE :D





const { data:Data2, error } = await supabase
.from('People')
.select("*")
.eq(`PersonID`, OwnerID);

if (error) {
    console.error('Error Fetching Data:', error.message);
    return [];
}



