// @ts-check
const { test, expect} = require('@playwright/test');

// change this to the URL of your website, could be local or GitHub pages
const websiteURL = 'https://selena-512.github.io/people-search.html';

// Go to the website home page before each test.
test.beforeEach(async ({ page }) => {
   await page.goto(websiteURL);
});

// # html tests

// Page heading tests
test('People Search page h1 heading', async ({ page }) => {
   // Expect a h1 heading 'People Search"
   await expect(page.getByRole("heading", {level: 1}))
      .toHaveText("People Search");
});

test('Vehicle Search page h1 heading', async ({ page }) => {
   // Click the 'vehicle search' link.
   await page.getByRole('link', { name: 'Vehicle search' }).click();
   // Expects page to have a H1 heading 'Vehicle search'.
   await expect(page.getByRole("heading", {level: 1}))
      .toHaveText("Vehicle Search");
});

test('Add a Vehicle page h1 heading', async ({ page }) => {
   // Click the 'vehicle search' link.
   await page.getByRole('link', { name: 'Add a Vehicle' }).click();
   // Expects page to have a H1 heading 'Vehicle search'.
   await expect(page.getByRole("heading", {level: 1}))
      .toHaveText("Add a Vehicle");
});


//Navigation link text :
test('link - People search', async ({ page }) => {
   // check link text if contains text 'People Search'
   await expect(page.getByRole('link', { name: 'People search' })).toBeVisible();
   // open the link
   await page.getByRole('link', { name: 'People search' }).click();
   // check url if contain 'people search'
   await expect(page).toHaveURL(/people-search/);
});

test('link - Vehicle search', async ({ page }) => {
   // check link text if contains text 'Vehicle Search'
   await expect(page.getByRole('link', { name: 'Vehicle search' })).toBeVisible();
   // open the link
   await page.getByRole('link', { name: 'Vehicle search' }).click();
   // check url if contain 'vehicle search'
   await expect(page).toHaveURL(/vehicle-search/);
});

test('link - Add a Vehicle', async ({ page }) => {
   // check link text if contains text 'Vehicle Search'
   await expect(page.getByRole('link', { name: 'Add a vehicle' })).toBeVisible();
   // open the link
   await page.getByRole('link', { name: 'Add a vehicle' }).click();
   // check url if contain 'new vehicle'
   await expect(page).toHaveURL(/new-vehicle/);
});


// ul for navigation link
test('there is a <ul> inside <header> for navigation links', async ({ page }) => {
   const ulNum = await page.locator('header').locator('ul').count();
   expect(ulNum).toBeGreaterThan(0);

});


// page sections styles
test('header should have padding 10px, margin 10px, and border 1px solid black', async ({ page }) => {
   const space = '10px';
   const border = '1px solid rgb(0, 0, 0)';
   await expect(page.locator('header')).toHaveCSS('padding', space);
   await expect(page.locator('header')).toHaveCSS('margin', space);
   await expect(page.locator('header')).toHaveCSS('border', border);
});

test('main should have padding 10px, margin 10px, and border 1px solid black', async ({ page }) => {
   const space = '10px';
   const border = '1px solid rgb(0, 0, 0)';
   await expect(page.locator('main')).toHaveCSS('padding', space);
   await expect(page.locator('main')).toHaveCSS('margin', space);
   await expect(page.locator('main')).toHaveCSS('border', border);
});

test('side bar should have padding 10px, margin 10px, and border 1px solid black', async ({ page }) => {
   const space = '10px';
   const border = '1px solid rgb(0, 0, 0)';
   await expect(page.locator('aside')).toHaveCSS('padding', space);
   await expect(page.locator('aside')).toHaveCSS('margin', space);
   await expect(page.locator('aside')).toHaveCSS('border', border);
});

test('footer should have padding 10px, margin 10px, and border 1px solid black', async ({ page }) => {
   const space = '10px';
   const border = '1px solid rgb(0, 0, 0)';
   await expect(page.locator('footer')).toHaveCSS('padding', space);
   await expect(page.locator('footer')).toHaveCSS('margin', space);
   await expect(page.locator('footer')).toHaveCSS('border', border);
});


// elements that CSS grid applies to should have the ID 'container'.
test('elements that CSS grid applies to should have the ID "container"', async({page}) => {
   await expect(page.locator('#container')).toHaveCSS('display','grid');
});


// For people and vehicle search submit button and 'results' element
test('people search page submit button and "results" element', async({page}) => {
   await expect(page.getByRole("button")).toHaveText("Submit");
   await expect(page.locator('#results')).toHaveCount(1);
});

test('vehicle search page submit button and "results" element', async({page}) => {
   // go to 'vehicle search' page
   await page.getByRole('link', { name: 'Vehicle search' }).click();
   await expect(page.getByRole("button")).toHaveText("Submit");
   await expect(page.locator('#results')).toHaveCount(1);
});


// people search test cases 1-6:
test('people search test case 1: Search successful by driver name', async({page}) => {
   // fill people search form name field only
   await page.locator('#name').fill('rachel');
   await page.locator('#license').fill('');
   // click the Submit button
   await page.getByRole('button', { name: 'Submit' }).click();
   // expected Search successful with 2 results shown, as there are 2 Rachel in database
   await expect(page.locator('#results').locator('div')).toHaveCount(2);
   await expect(page.locator('#message')).toContainText('Search successful');
   await expect(page.locator('#results')).toContainText('SG345PQ');
   await expect(page.locator('#results')).toContainText('JK239GB');
});

test('people search test case 2: No result found by driver name', async({page}) => {
   // fill people search form name field only
   await page.locator('#name').fill('Hythlodaeus');   // Hythlodaeus isnt in database
   await page.locator('#license').fill('');
   // click the Submit button
   await page.getByRole('button', { name: 'Submit' }).click();
   // expected No result found with 0 results shown, as there are Hythlodaeus is not in database
   await expect(page.locator('#results').locator('div')).toHaveCount(0);
   await expect(page.locator('#message')).toContainText('No result found');
});

test('people search test case 3: Search successful by license number', async({page}) => {
   // fill people search form license field only
   await page.locator('#name').fill('');
   await page.locator('#license').fill('JK239GB');
   // click the Submit button
   await page.getByRole('button', { name: 'Submit' }).click();
   // expected Search successful with 1 results shown, as license number 'JK239GB' is in database
   await expect(page.locator('#results').locator('div')).toHaveCount(1);
   await expect(page.locator('#message')).toContainText('Search successful');
   await expect(page.locator('#results')).toContainText('Rachel');
});

test('people search test case 4: No result found by license number', async({page}) => {
   // fill people search form license field only
   await page.locator('#name').fill('');
   await page.locator('#license').fill('AB987GB');
   // click the Submit button
   await page.getByRole('button', { name: 'Submit' }).click();
   // expected No result found with 0 results shown, as license number 'AB987GB' is not in database
   await expect(page.locator('#results').locator('div')).toHaveCount(0);
   await expect(page.locator('#message')).toContainText('No result found');
});

test('people search test case 5: Error - Both fields in the people search form are empty', async({page}) => {
   // leave people search form empty
   await page.locator('#name').fill('');
   await page.locator('#license').fill('');
   // click the Submit button
   await page.getByRole('button', { name: 'Submit' }).click();
   // expected Error message about both fields in the people search form are empty
   await expect(page.locator('#results').locator('div')).toHaveCount(0);
   await expect(page.locator('#message')).toContainText('Error');
});

test('people search test case 6: Error - Both fields in the people search form are filled (only one can be used)', async({page}) => {
   // fill people search form both name and license field
   await page.locator('#name').fill('Hythlodaeus');
   await page.locator('#license').fill('AB987GB');
   // click the Submit button
   await page.getByRole('button', { name: 'Submit' }).click();
   // expected Error message about both fields in the people search form are filled (only one can be used)
   await expect(page.locator('#results').locator('div')).toHaveCount(0);
   await expect(page.locator('#message')).toContainText('Error');
});


// vehicle search test cases 1-3s:
test('vehicle search test case 1: Search successful by registration number', async({page}) => {
   // go to 'vehicle search' page
   await page.getByRole('link', { name: 'Vehicle search' }).click();
   // fill vehicle search form registration number field
   await page.locator('#rego').fill('KWK24JI');
   // wait 1 second and click the Submit button
   await page.waitForTimeout(1000);
   await page.getByRole('button', { name: 'Submit' }).click();
   // expected Search successful with 1 results shown, as registration number 'KWK24JI' is in database
   await expect(page.locator('#results').locator('div')).toHaveCount(1);
   await expect(page.locator('#message')).toContainText('Search successful');
   await expect(page.locator('#results')).toContainText('Tesla');
});

test('vehicle search test case 2: No result found by registration number', async({page}) => {
   // go to 'vehicle search' page
   await page.getByRole('link', { name: 'Vehicle search' }).click();
   // fill vehicle search form registration number field
   await page.locator('#rego').fill('ABC4567');
   // wait 1 second and click the Submit button
   await page.waitForTimeout(1000);
   await page.getByRole('button', { name: 'Submit' }).click();
   // expected No result found with 0 results shown, as registration number 'ABC4567' is not in database
   await expect(page.locator('#results').locator('div')).toHaveCount(0);
   await expect(page.locator('#message')).toContainText('No result found');
});

test('vehicle search test case 3: Error - registration number field in vehicle search form is empty', async({page}) => {
   // go to 'vehicle search' page
   await page.getByRole('link', { name: 'Vehicle search' }).click();
   // leave people search form empty
   await page.locator('#rego').fill('');
   // wait 1 second and click the Submit button
   await page.waitForTimeout(1000);
   await page.getByRole('button', { name: 'Submit' }).click();
   // expected Error message about registration number field is empty
   await expect(page.locator('#results').locator('div')).toHaveCount(0);
   await expect(page.locator('#message')).toContainText('Error');
});

 
// field names check
test('people search field names check', async({page}) => {
   const locatorName = page.locator('#name');
   await expect(locatorName).toHaveRole('textbox');

   const locatorLicense = page.locator('#license');
   await expect(locatorLicense).toHaveRole('textbox');
});

test('vehicle search field name check', async({page}) => {
   // go to 'vehicle search' page
   await page.getByRole('link', { name: 'Vehicle search' }).click();
   
   const locatorRego = page.locator('#rego');
   await expect(locatorRego).toHaveRole('textbox');
});

test('add a vehicle field names check', async({page}) => {
   // go to 'Add a vehicle' page
   await page.getByRole('link', { name: 'Add a Vehicle' }).click();

   // add vehicle form
   const locatorRego = page.locator('#rego');
   await expect(locatorRego).toHaveRole('textbox');

   const locatorMake = page.locator('#make');
   await expect(locatorMake).toHaveRole('textbox');

   const locatorModel = page.locator('#model');
   await expect(locatorModel).toHaveRole('textbox');

   const locatorColour = page.locator('#colour');
   await expect(locatorColour).toHaveRole('textbox');

   const locatorOwner = page.locator('#owner');
   await expect(locatorOwner).toHaveRole('textbox');

   const locatorAddVehicle = page.locator('#addvehicle');
   await expect(locatorAddVehicle).toHaveText("Add vehicle");
   
   // add owner form
   const locatorPersonID = page.locator('#personid');
   await expect(locatorPersonID).toHaveRole('textbox');

   const locatorName = page.locator('#name');
   await expect(locatorName).toHaveRole('textbox');

   const locatorAddress = page.locator('#address');
   await expect(locatorAddress).toHaveRole('textbox');

   const locatorDoB = page.locator('#dob');
   await expect(locatorDoB).toHaveRole('textbox');

   const locatorLicense = page.locator('#license');
   await expect(locatorLicense).toHaveRole('textbox');

   const locatorExpire = page.locator('#expire');
   await expect(locatorExpire).toHaveRole('textbox');

   const locatorAddOwner = page.locator('#addowner');
   await expect(locatorAddOwner).toHaveText("Add owner");
});


// add vehicle test cases 1-4:
test('add vehicle test case 1: Vehicle added successfully with owner already in database', async({page}) => {
   // go to 'Add a vehicle' page
   await page.getByRole('link', { name: 'Add a vehicle' }).click();
   // fill add vehicle form
   await page.locator('#rego').fill('HWF15LD');
   await page.locator('#make').fill('BMW');
   await page.locator('#model').fill('M3');
   await page.locator('#colour').fill('Red');
   await page.locator('#owner').fill('Oliver Reps');
   // wait 1 second and click the add vehicle button
   await page.waitForTimeout(1000);
   await page.getByRole('button', { name: 'Add vehicle' }).click();
   // expected owner is already in database and vehicle added successfully
   await expect(page.locator('#message')).toContainText('Vehicle added successfully');
   // go to 'Vehicle search' page
   await page.getByRole('link', { name: 'Vehicle search' }).click();
   // fill in this new recent registration number
   await page.locator('#rego').fill('HWF15LD');
   // wait 1 second and click the Submit button
   await page.waitForTimeout(1000);
   await page.getByRole('button', { name: 'Submit' }).click();
   // expected 1 vehicle found
   await expect(page.locator('#results').locator('div')).toHaveCount(1);
   await expect(page.locator('#message')).toContainText('Search successful');
   await expect(page.locator('#results')).toContainText('BMW');
});

test('add vehicle test case 2: Vehicle added successfully with new owner', async({page}) => {
   // go to 'Add a vehicle' page
   await page.getByRole('link', { name: 'Add a vehicle' }).click();
   // fill add vehicle form
   await page.locator('#rego').fill('LBG85MH');
   await page.locator('#make').fill('Honda');
   await page.locator('#model').fill('Civic');
   await page.locator('#colour').fill('Blue');
   await page.locator('#owner').fill('Emet');
   // wait 1 second and click the add vehicle button
   await page.waitForTimeout(1000);
   await page.getByRole('button', { name: 'Add vehicle' }).click();
   // expected new owner
   await expect(page.locator('#message')).toContainText('fill in New Owner Information');
   // add vehicle form hidden, new owner form show and allow to fill
   // owner name no need to fill, can retrieve from owner field from add vehicle form
   await page.locator('#personid').fill('10');
   await page.locator('#address').fill('Amaurot');
   await page.locator('#dob').fill('13/04/1968');
   await page.locator('#license').fill('HA666DE');
   await page.locator('#expire').fill('24/06/2026');
   // wait 1 second and click the add owner button
   await page.waitForTimeout(1000);
   await page.getByRole('button', { name: 'Add owner' }).click();
   // expected both owner and vehicle added successfully
   await expect(page.locator('#message')).toContainText('owner info added successfully');
   await expect(page.locator('#message')).toContainText('Vehicle added successfully');
   // go to 'Vehicle search' page
   await page.getByRole('link', { name: 'Vehicle search' }).click();
   // fill in this new recent registration number
   await page.locator('#rego').fill('LBG85MH');
   // wait 1 second and click the Submit button
   await page.waitForTimeout(1000);
   await page.getByRole('button', { name: 'Submit' }).click();
   // expected 1 vehicle found
   await expect(page.locator('#results').locator('div')).toHaveCount(1);
   await expect(page.locator('#message')).toContainText('Search successful');
   await expect(page.locator('#results')).toContainText('Honda');
   // go to 'People search' page
   await page.getByRole('link', { name: 'People search' }).click();
   // fill in this recent new owner
   await page.locator('#name').fill('Emet');
   // wait 1 second and click the Submit button
   await page.locator('#license').fill('');
   await page.waitForTimeout(1000);
   await page.getByRole('button', { name: 'Submit' }).click();
   // expected this person is found
   await expect(page.locator('#results').locator('div')).toHaveCount(1);
   await expect(page.locator('#message')).toContainText('Search successful');
   await expect(page.locator('#results')).toContainText('HA666DE');
});

test('add vehicle test case 3: Error - 1 or more fields in add vehicle form are empty', async({page}) => {
   // go to 'Add a vehicle' page
   await page.getByRole('link', { name: 'Add a vehicle' }).click();
   // partially fill add vehicle form
   await page.locator('#rego').fill('LBG85MH');
   await page.locator('#make').fill('');
   await page.locator('#model').fill('Civic');
   await page.locator('#colour').fill('');
   await page.locator('#owner').fill('Emet');
   // wait 1 second and click the add vehicle button
   await page.waitForTimeout(1000);
   await page.getByRole('button', { name: 'Add vehicle' }).click();
   // expected Error message about vehicle information is missing
   await expect(page.locator('#message')).toContainText('Error');
});

test('add vehicle test case 4: Error - when there is new owner, 1 or more fields in add owner form are empty', async({page}) => {
   // go to 'Add a vehicle' page
   await page.getByRole('link', { name: 'Add a vehicle' }).click();
   // fill add vehicle form
   await page.locator('#rego').fill('LBG85MH');
   await page.locator('#make').fill('Honda');
   await page.locator('#model').fill('Civic');
   await page.locator('#colour').fill('Blue');
   await page.locator('#owner').fill('Hythlodaeus');
   // wait 1 second and click the add vehicle button
   await page.waitForTimeout(1000);
   await page.getByRole('button', { name: 'Add vehicle' }).click();
   // expected new owner
   await expect(page.locator('#message')).toContainText('fill in New Owner Information');
   // add vehicle form hidden, new owner form show and allow to fill
   // owner name no need to fill, can retrieve from owner field from add vehicle form
   // and partially fill add owner form
   await page.locator('#personid').fill('10');
   await page.locator('#address').fill('Amaurot');
   await page.locator('#dob').fill('');
   await page.locator('#license').fill('HA666DE');
   await page.locator('#expire').fill('');
   // wait 1 second and click the add owner button
   await page.waitForTimeout(1000);
   await page.getByRole('button', { name: 'Add owner' }).click();
   // expected Error message about new owner information is missing
   await expect(page.locator('#message')).toContainText('Error');
});



