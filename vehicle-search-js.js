//import supabase client
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

//init supabase url and key
const supabaseUrl = 'https://akzmofevgcjpjcwmkjld.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFrem1vZmV2Z2NqcGpjd21ramxkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI4NTA2MzcsImV4cCI6MjAyODQyNjYzN30.2my4atOnBxXTukJohfomcQSphSVmcZj7Jp1FQRhWuNA';
const supabase = createClient(supabaseUrl, supabaseKey);

const regoInput = document.getElementById("rego");
const msgDiv = document.getElementById("message");
const resultsDiv = document.getElementById("results");

const submitBtn = document.getElementById("submit");
submitBtn.addEventListener("click", submit);

// submit button function
async function submit(){
    clearBox("message");
    clearBox("results");

    if(regoInput.value == ""){
        msgDiv.innerHTML += "Error, please first enter a vehicle registration (plate) number."
    }
    else{
        searchRegistrationNumber(regoInput.value);
    }
}

// search vehicle by input registration number 
async function searchRegistrationNumber(regNum) {
    const { data, error} = await supabase
        .from('Vehicle')
        .select('*')
        .eq('VehicleID', regNum);
    console.log('fetched data:', data);
    // condition check for showing the correct response message
    if(data.length > 0){
        msgDiv.innerHTML += "registration number [" + regNum + "] search success";
    }
    else{
        msgDiv.innerHTML += "registration number [" + regNum + "] No result found";
    }
    // loop to create each searched and founded people as a block
    data.forEach(function(p){
        vehicle(v);
    });
    resultsDiv.style.border ="1px dashed blacwwwwwwwwwwwwwwwwk";
}

// create div element to store the searched person details and append to results div
function vehicle(v) {
    const newDiv  = document.createElement('div');
    newDiv.setAttribute('VehicleID', v.VehicleID);
    newDiv.innerHTML = 
        "vehicleid: " + v.VehicleID + "<br />" +
        "make: " + v.Make + "<br />" +
        "model: " + v.Model + "<br />" +
        "colour: " + v.Colour + "<br />"+ 
        "ownersname: " + v.Name + "<br />" +
        "ownerslicensenumber: " + v.LicenseNumber;
    newDiv.style.padding = "10px";
    newDiv.style.margin = "10px";
    newDiv.style.border ="1px solid black";
    resultsDiv.appendChild(newDiv)
}

function clearBox(elementID){
    document.getElementById(elementID).innerHTML = "";
}