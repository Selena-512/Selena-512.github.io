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
submitBtn.addEventListener("click", submit);

// submit button function
async function submit(){
    if(licenseInput.value == ""){
        msgDiv.innerHTML += "Error, please first enter a driving license number.";
    }
    else{
        searchLicenseNumber(licenseInput.value);
    }
    
}

// search people by input license number 
async function searchLicenseNumber(license) {
    const { data, error} = await supabase
        .from('People')
        .select('*')
        .eq('LicenseNumber', license);
    console.log('fetched data:', data);
    if(data.length > 0){
        msgDiv.innerHTML += "license number [" + license + "] search success";
    }
    else{
        msgDiv.innerHTML += "license number [" + license + "] No result found";
    }
    data.forEach(function(p){
        people(p);
    });
    resultsDiv.style.border ="1px dashed black";
}

// create div element to store the searched result and append to results div
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

