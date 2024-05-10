//import supabase client
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

//init supabase url and key
const supabaseUrl = 'https://akzmofevgcjpjcwmkjld.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFrem1vZmV2Z2NqcGpjd21ramxkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI4NTA2MzcsImV4cCI6MjAyODQyNjYzN30.2my4atOnBxXTukJohfomcQSphSVmcZj7Jp1FQRhWuNA';
const supabase = createClient(supabaseUrl, supabaseKey);

const nameInput = document.getElementById("name");
const lnumInput = document.getElementById("license");
const msgDiv = document.getElementById("message");
const resultDiv = documment.getElementById("result");

const submitBtn = document.getElementById("submit");
btn1.addEventListener("click", submit);

//license number input
async function fetchData(lnumInput) {
    const { data, error} = await supabase.from('People').select();

}



