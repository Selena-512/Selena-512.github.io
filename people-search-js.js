//import supabase client
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

//init supabase url and key
const supabaseUrl = 'https://akzmofevgcjpjcwmkjld.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFrem1vZmV2Z2NqcGpjd21ramxkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI4NTA2MzcsImV4cCI6MjAyODQyNjYzN30.2my4atOnBxXTukJohfomcQSphSVmcZj7Jp1FQRhWuNA';
const supabase = createClient(supabaseUrl, supabaseKey);

const nameInput = document.getElementById("name");
const licenseInput = document.getElementById("license");
const msgDiv = document.getElementById("message");
const resultsDiv = document.getElementById("results");

const submitBtn = document.getElementById("submit");
submitBtn.addEventListener("click", fetchData);

//license number input
async function fetchData() {
    const { data, error} = await supabase
        .from('People')
        .select('*');
    console.log('fetched data:', data);
    data.forEach(function(p){
        people(p);
    });
}

// create div for a searched result
function people(p) {
    const newDiv  = document.createElement('div');
    newDiv.setAttribute('PersonID', p.PersonID);
    newDiv.innerHTML = 
        "personid: " + p.PersonID + 
        "name: " + p.Name + 
        "address: " + p.Address +
        "dob: " + p.DOB + 
        "licensenumber: " + p.LicenseNumber +
        "expirydate: " + p.ExpiryDate;
    resultsDiv.appendChild(newDiv)
}

