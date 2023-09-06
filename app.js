
function app(people) {
    displayWelcome();
    runSearchAndMenu(people);
    return exitOrRestart(people);
}

function displayWelcome() {
    alert('Hello and welcome to the Most Wanted search application!');
}

function runSearchAndMenu(people) {
    const searchResults = searchPeopleDataSet(people);

    if (searchResults.length > 1) {
        displayPeople('Search Results', searchResults);
    }
    else if (searchResults.length === 1) {
        const person = searchResults[0];
        mainMenu(person, people);
    }
    else {
        alert('No one was found in the search.');
    }
}

function searchPeopleDataSet(people) {

    const searchTypeChoice = validatedPrompt(
        'Please enter in what type of search you would like to perform.',
        ['id', 'name', 'traits']
    );

    let results = [];
    switch (searchTypeChoice) {
        case 'id':
            results = searchById(people);
            break;
        case 'name':
            results = searchByName(people);
            break;
        case 'traits':
            //! TODO: Done
            results = searchByTraits(people);
            break;
        default:
            return searchPeopleDataSet(people);
    }

    return results;
}

function searchById(people) {
    const idToSearchForString = prompt('Please enter the id of the person you are searching for.');
    const idToSearchForInt = parseInt(idToSearchForString);
    const idFilterResults = people.filter(person => person.id === idToSearchForInt);
    return idFilterResults;
}

function searchByName(people) {
    const firstNameToSearchFor = prompt('Please enter the the first name of the person you are searching for.');
    const lastNameToSearchFor = prompt('Please enter the the last name of the person you are searching for.');
    const fullNameSearchResults = people.filter(person => (person.firstName.toLowerCase() === firstNameToSearchFor.toLowerCase() && person.lastName.toLowerCase() === lastNameToSearchFor.toLowerCase()));
    return fullNameSearchResults;
}
function searchByTraits(people){
    const searchTypeTraitChoice = validatedPrompt(
        'Please enter in what trait you would like to search by.',
        ['gender', 'dob', 'height','weight','eyecolor','occupation']
    );
    let results = [];
    switch (searchTypeTraitChoice) {
        case 'gender':
            results = searchByGender(people);
            break;
        case 'dob':
            results = searchByDob(people);
            break;
        case 'height':
            results = searchByHeight(people)
            break;
        case 'weight':
            results = searchByWeight(people)
            break;
        case 'eyecolor':
            results = searchByEyeColor(people)
            break;
        case 'occupation':
            results = searchByOccupation(people)
            break;    
        default:
            return searchPeopleDataSet(people);
    }

    return results;
}
function searchByGender(people) {
    const genderToSearchFor = validatedPrompt(
        'Please enter the gender you wish to filter for',
        ['male','female']
        );
    const genderFilterResults = people.filter(person => person.gender ===  genderToSearchFor); 
    return genderFilterResults;
}
function searchByDob(people) {
    const dobToSearchFor = prompt('Please enter the dob of the person you are searching for.');
    const dobFilterResults = people.filter(person => person.dob === dobToSearchFor);
    return dobFilterResults;
}
function searchByHeight(people) {
    const heightToSearchForString = prompt('Please enter the height of the person you are searching for.');
    if(!isNaN(heightToSearchForString)){
    const heightToSearchForInt = parseInt(heightToSearchForString);
    const heightFilterResults = people.filter(person => person.height === heightToSearchForInt);
    return heightFilterResults;
    }
    else{
        alert("Please enter a number")
        return searchByHeight(people)
    }
}
function searchByWeight(people) {
    const weightToSearchForString = prompt('Please enter the weight of the person you are searching for.');
    if(!isNaN(weightToSearchForString)){
        const weightToSearchForInt = parseInt(weightToSearchForString);
        const weightFilterResults = people.filter(person => person.weight === weightToSearchForInt);
        return weightFilterResults;
        }
        else{
            alert("Please enter a number")
            return searchByWeight(people)
        }
}
    function searchByEyeColor(people) {
    const eyeColorToSearchFor = validatedPrompt(
        'Please enter the eyeColor you wish to filter for',
        ['black','brown','hazel','blue','green']
        );
    const eyeColorFilterResults = people.filter(person => person.eyeColor ===  eyeColorToSearchFor); 
    return eyeColorFilterResults;
}
function searchByOccupation(people) {
    const occupationToSearchFor = validatedPrompt(
        'Please enter the occupation you wish to filter for',
        ['programmer','assistant','landscaper','nurse','student','architect','doctor','politician']
        );
    const occupationFilterResults = people.filter(person => person.occupation ===  occupationToSearchFor); 
    return occupationFilterResults;
}
function mainMenu(person, people) {

    const mainMenuUserActionChoice = validatedPrompt(
        `Person: ${person.firstName} ${person.lastName}\n\nDo you want to know their full information, family, or descendants?`,
        ['info', 'family', 'descendants', 'quit']
    );

    switch (mainMenuUserActionChoice) {
        case "info":
            //! TODO :Done
            displayPersonInfo(person,people);
            break;
        case "family":
            //! TODO
            let personFamily=findPersonFamily(person, people);
            displayPeople("Family",personFamily)

            break;
        case "descendants":
            //! TODO
            let personDescendants = findPersonDescendants(person, people);
            displayPeople('Descendants', personDescendants);
            break;
        case "quit":
            return;
        default:
            alert('Invalid input. Please try again.');
    }

    return mainMenu(person, people);
}
function findPersonFamily(person,people){
//let personFamily={"spouse": [], "parents": [], "siblings": []}
let personFamily=[]
const spouse=findSpouse(person,people)
if(spouse!=undefined){
    personFamily.push(spouse)
}
const parents=findParents(person,people)
personFamily=personFamily.concat(parents)
const siblings=FindSiblings(person,people)
personFamily=personFamily.concat(siblings)
return personFamily
}
function displayPersonInfo(person, people){
    const spouse=findSpouse(person,people);
    const parents=findParents(person,people)
    const spouseName=""
    if(spouse != undefined){
        spouseName=`${spouse.firstName} ${spouse.lastName}`
    }
    const parentsNames=parents.map(person => `${person.firstName} ${person.lastName}`).join(', ')
    alert(`Name: ${person.firstName} ${person.lastName} \n Gender:${person.gender} \n Date of Birth: ${person.dob} \n Height: ${person.height}
Weight: ${person.weight} \n Eyecolor: ${person.eyeColor} \n Occupation: ${person.occupation}
Parents: ${parentsNames}
Spouse: ${spouseName} `);
}
function findSpouse(person,people){
    const spouseid=person.currentSpouse;
    const spouseArray=people.filter(person => person.id === spouseid);
    const spouse=spouseArray[0]
    return spouse
}
function findParents(person,people){
    const parentids=person.parents
    const parents= people.filter(person => person.id === parentids[0] || person.id === parentids[1]);
    return parents
}
function FindSiblings(person,people){
    const parentids=person.parents
    const siblings= people.filter(person => person.parents===parentids)
    return siblings
}
function findPersonDescendants(person,people){
    const personid=person.id
    const descendants=people.filter(person => person.parents[0]===personid || person.parents[1]===personid)
    return descendants
}
function displayPeople(displayTitle, peopleToDisplay) {
    const formatedPeopleDisplayText = peopleToDisplay.map(person => `${person.firstName} ${person.lastName}`).join('\n');
    alert(`${displayTitle}\n\n${formatedPeopleDisplayText}`);
}
function validatedPrompt(message, acceptableAnswers) {
    acceptableAnswers = acceptableAnswers.map(aa => aa.toLowerCase());

    const builtPromptWithAcceptableAnswers = `${message} \nAcceptable Answers: ${acceptableAnswers.map(aa => `\n-> ${aa}`).join('')}`;

    const userResponse = prompt(builtPromptWithAcceptableAnswers).toLowerCase();

    if (acceptableAnswers.includes(userResponse)) {
        return userResponse;
    }
    else {
        alert(`"${userResponse}" is not an acceptable response. The acceptable responses include:\n${acceptableAnswers.map(aa => `\n-> ${aa}`).join('')} \n\nPlease try again.`);
        return validatedPrompt(message, acceptableAnswers);
    }
}

function exitOrRestart(people) {
    const userExitOrRestartChoice = validatedPrompt(
        'Would you like to exit or restart?',
        ['exit', 'restart']
    );

    switch (userExitOrRestartChoice) {
        case 'exit':
            return;
        case 'restart':
            return app(people);
        default:
            alert('Invalid input. Please try again.');
            return exitOrRestart(people);
    }

}