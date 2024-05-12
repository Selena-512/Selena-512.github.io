//import supabase client
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

//init supabase url and key
const supabaseUrl = 'https://akzmofevgcjpjcwmkjld.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFrem1vZmV2Z2NqcGpjd21ramxkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI4NTA2MzcsImV4cCI6MjAyODQyNjYzN30.2my4atOnBxXTukJohfomcQSphSVmcZj7Jp1FQRhWuNA';
const supabase = createClient(supabaseUrl, supabaseKey);

const regoInput = document.getElementById("rego");
const makeInput = document.getElementById("make");
const modelInput = document.getElementById("model");
const colourInput = document.getElementById("colour");
const ownerInput = document.getElementById("owner");
const personidInput = document.getElementById("personid");
const nameInput = document.getElementById("name");
const addressInput = document.getElementById("address");
const dobInput = document.getElementById("dob");
const licenseInput = document.getElementById("license");
const expireInput = document.getElementById("expire");
const msgDiv = document.getElementById("message");

const addVehicleBtn = document.getElementById("addvehicle");
addVehicleBtn.addEventListener("click", addVehicle);

const addOwnerBtn = document.getElementById("addowner");
addOwnerBtn.addEventListener("click", addOwner);

// hide add owner form at page initialise
setFormHidden("newOwnerForm");

async function addVehicle(){
    clearBox("message");
    
    if(regoInput.value=="" || makeInput.value=="" || modelInput.value=="" || colourInput.value=="" || ownerInput.value==""){
        msgDiv.innerHTML += "Error, one or more fields of new vehicle details are missing"
    }
    else{
        let personid = "";
        // first search if name at owner input is already in db or not 
        const {data, error} = await supabase
            .from('People')
            .select('*')
            .eq('Name', ownerInput.value);
        console.log(data);
        if(data[0] != null){       // owner name has record
            console.log("data[0].PersonID = " + data[0].PersonID)
            personid = String(data[0].PersonID);

            // supabase tables need RLS Row Level Security disabled
            // or cannot do insert
            const { error2 } = await supabase
            .from('Vehicles')
            .insert({ 
                VehicleID: regoInput.value,
                Make: makeInput.value,
                Model: modelInput.value,
                Colour: colourInput.value,
                OwnerID: personid
            });
            if(error2){
                msgDiv.innerHTML += "Error at add new vehicle...<br />plz retry";
            }
            else{
                msgDiv.innerHTML += "[" + regoInput.value +"] Vehicle added successfully";
                clearForms();
            }
        }
        else{   // owner name is new, not in record
            setFormHidden("newVehicleForm");
            setFormShow("newOwnerForm");
            msgDiv.innerHTML += "[" + ownerInput.value + "] owner is not in database <br />" +
                "need fill in New Owner Information";
            nameInput.value = ownerInput.value;
        }
    }
}

async function addOwner(){
    clearBox("message");

    if(personidInput.value=="" || nameInput.value=="" || addressInput.value=="" || dobInput.value=="" || licenseInput.value=="" || expireInput.value==""){
        msgDiv.innerHTML += "Error, one or more fields of new owner information are missing";
    }
    else{
        const { error3 } = await supabase
            .from('People')
            .insert({ 
                PersonID: personidInput.value,
                Name: nameInput.value,
                Address: addressInput.value,
                DOB: dobInput.value,
                LicenseNumber: licenseInput.value,
                ExpiryDate: expireInput.value
            });
        if(error3){
            msgDiv.innerHTML += "Error at add new owner...<br />plz retry from beginning";
        }
        else{
            msgDiv.innerHTML += "[" + nameInput.value +"] owner info added successfully";
            const { error4 } = await supabase
                .from('Vehicles')
                .insert({ 
                    VehicleID: regoInput.value,
                    Make: makeInput.value,
                    Model: modelInput.value,
                    Colour: colourInput.value,
                    OwnerID: personidInput.value
                });
            if(error4){
                msgDiv.innerHTML += "Error at add new vehicle...<br />plz retry";
            }
            else{
                msgDiv.innerHTML += "<br />[" + regoInput.value +"] Vehicle added successfully"
            }
        }
        clearForms();
        setFormHidden("newOwnerForm");
        setFormShow("newVehicleForm");
    }
}

function clearBox(elementID){
    document.getElementById(elementID).innerHTML = "";
}

async function setFormHidden(id){
    document.getElementById(id).style.display = "none";
}

async function setFormShow(id){
    document.getElementById(id).style.display = "block";
}

function clearForms(){
    regoInput.value = "";
    makeInput.value = "";
    modelInput.value = "";
    colourInput.value = "";
    ownerInput.value = "";
    personidInput.value = "";
    nameInput.value = "";
    addressInput.value = "";
    dobInput.value = "";
    licenseInput.value = "";
    expireInput.value = "";
}