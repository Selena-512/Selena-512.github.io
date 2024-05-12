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
        "personid: " + p.PersonID + "<br />" +
        "name: " + p.Name + "<br />" +
        "address: " + p.Address + "<br />" +
        "dob: " + p.DOB + "<br />" + 
        "licensenumber: " + p.LicenseNumber + "<br />" +
        "expirydate: " + p.ExpiryDate;
        newDiv.style.padding = "10px";
        newDiv.style.margin = "10px";
        newDiv.style.border ="1px solid black";
    resultsDiv.appendChild(newDiv)
}

