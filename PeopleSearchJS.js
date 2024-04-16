import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl = 'https://akzmofevgcjpjcwmkjld.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFrem1vZmV2Z2NqcGpjd21ramxkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI4NTA2MzcsImV4cCI6MjAyODQyNjYzN30.2my4atOnBxXTukJohfomcQSphSVmcZj7Jp1FQRhWuNA';
const supabase = createClient(supabaseUrl, supabaseKey);

async function fetchData(searchQuery) {
    const { data, error } = await supabase
        .from('Vehicles')
        .select("*")
        .or(`VehicleID.ilike.%${searchQuery}%`);

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



