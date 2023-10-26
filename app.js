function app(people) {
  displayWelcome();
  runSearchAndMenu(people);
  return exitOrRestart(people);
}

function displayWelcome() {
  alert("Hello and welcome to the Most Wanted search application!");
}

function runSearchAndMenu(people) {
  let searchResults = searchPeopleDataSet(people);

  if (searchResults.length > 1) {
    displayPeople("Search Results", searchResults);
  } else if (searchResults.length === 1) {
    let person = searchResults[0];
    mainMenu(person, people);
  } else {
    alert("No one was found in the search.");
  }
}

function searchPeopleDataSet(people) {
  let searchTypeChoice = validatedPrompt(
    "Please enter in what type of search you would like to perform.",
    ["id", "name", "traits"]
  );

  let results = [];
  switch (searchTypeChoice) {
    case "id":
      results = searchById(people);
      break;
    case "name":
      results = searchByName(people);
      break;
    case "traits":
      //! TODO: Done
      results = searchByTraits(people);
      let done = false;
      while (results.length > 1 && done == false) {
        let userContinue = validatedPrompt(
          "Would you like to continue searching?",
          ["yes", "no"]
        );
        if (userContinue === "yes") {
          results = searchByTraits(results);
        } else {
          done = true;
        }
      }
      break;
    default:
      return searchPeopleDataSet(people);
  }

  return results;
}

function searchById(people) {
  let idToSearchForString = prompt(
    "Please enter the id of the person you are searching for."
  );
  let idToSearchForInt = parseInt(idToSearchForString);
  let idFilterResults = people.filter(
    (person) => person.id === idToSearchForInt
  );
  return idFilterResults;
}

function searchByName(people) {
  let firstNameToSearchFor = prompt(
    "Please enter the the first name of the person you are searching for."
  );
  let lastNameToSearchFor = prompt(
    "Please enter the the last name of the person you are searching for."
  );
  let fullNameSearchResults = people.filter(
    (person) =>
      person.firstName.toLowerCase() === firstNameToSearchFor.toLowerCase() &&
      person.lastName.toLowerCase() === lastNameToSearchFor.toLowerCase()
  );
  return fullNameSearchResults;
}
function searchByTraits(people) {
  let results = [];
  let numOfMatchingRecords = 22;
  if (people.length > 0) numOfMatchingRecords = people.length;
  let searchTypeTraitChoice = validatedPrompt(
    `Please enter in what trait you would like to search by. \n Current Number of Matching Records: ${numOfMatchingRecords}`,
    [
      "gender",
      "dob",
      "height",
      "weight",
      "eyecolor",
      "occupation",
      "reset",
      "done",
    ]
  );

  switch (searchTypeTraitChoice) {
    case "gender":
      results = searchByGender(people);
      break;
    case "dob":
      results = searchByDob(people);
      break;
    case "height":
      results = searchByHeight(people);
      break;
    case "weight":
      results = searchByWeight(people);
      break;
    case "eyecolor":
      results = searchByEyeColor(people);
      break;
    case "occupation":
      results = searchByOccupation(people);
      break;
    case "reset":
      return searchTypeTraitChoice(people);
    case "done":
      done = true;
      break;
    default:
      return searchPeopleDataSet(people);
  }

  return results;
}
function searchByGender(people) {
  let genderToSearchFor = validatedPrompt(
    "Please enter the gender you wish to filter for",
    ["male", "female"]
  );
  let genderFilterResults = people.filter(
    (person) => person.gender === genderToSearchFor
  );
  return genderFilterResults;
}
function searchByDob(people) {
  let dobToSearchFor = prompt(
    "Please enter the dob of the person you are searching for."
  );
  let dobFilterResults = people.filter(
    (person) => person.dob === dobToSearchFor
  );
  return dobFilterResults;
}
function searchByHeight(people) {
  let heightToSearchForString = prompt(
    "Please enter the height of the person you are searching for."
  );
  if (!isNaN(heightToSearchForString)) {
    let heightToSearchForInt = parseInt(heightToSearchForString);
    let heightFilterResults = people.filter(
      (person) => person.height === heightToSearchForInt
    );
    return heightFilterResults;
  } else {
    alert("Please enter a number");
    return searchByHeight(people);
  }
}
function searchByWeight(people) {
  let weightToSearchForString = prompt(
    "Please enter the weight of the person you are searching for."
  );
  if (!isNaN(weightToSearchForString)) {
    let weightToSearchForInt = parseInt(weightToSearchForString);
    let weightFilterResults = people.filter(
      (person) => person.weight === weightToSearchForInt
    );
    return weightFilterResults;
  } else {
    alert("Please enter a number");
    return searchByWeight(people);
  }
}
function searchByEyeColor(people) {
  let eyeColorToSearchFor = validatedPrompt(
    "Please enter the eyeColor you wish to filter for",
    ["black", "brown", "hazel", "blue", "green"]
  );
  let eyeColorFilterResults = people.filter(
    (person) => person.eyeColor === eyeColorToSearchFor
  );
  return eyeColorFilterResults;
}
function searchByOccupation(people) {
  let occupationToSearchFor = validatedPrompt(
    "Please enter the occupation you wish to filter for",
    [
      "programmer",
      "assistant",
      "landscaper",
      "nurse",
      "student",
      "architect",
      "doctor",
      "politician",
    ]
  );
  let occupationFilterResults = people.filter(
    (person) => person.occupation === occupationToSearchFor
  );
  return occupationFilterResults;
}
function mainMenu(person, people) {
  let mainMenuUserActionChoice = validatedPrompt(
    `Person: ${person.firstName} ${person.lastName}\n\nDo you want to know their full information, family, or descendants?`,
    ["info", "family", "descendants", "quit"]
  );

  switch (mainMenuUserActionChoice) {
    case "info":
      //! TODO :Done
      displayPersonInfo(person, people);
      break;
    case "family":
      //! TODO
      let personFamily = findPersonFamily(person, people);
      displayPeople("Family", personFamily);

      break;
    case "descendants":
      //! TODO
      let personDescendants = findPersonDescendants(person, people);
      displayPeople("Descendants", personDescendants);
      break;
    case "quit":
      return;
    default:
      alert("Invalid input. Please try again.");
  }

  return mainMenu(person, people);
}
function findPersonFamily(person, people) {
  //let personFamily={"spouse": [], "parents": [], "siblings": []}
  let personFamily = [];
  let spouse = findSpouse(person, people);
  if (spouse != undefined) {
    personFamily.push(spouse);
  }
  let parents = findParents(person, people);
  personFamily = personFamily.concat(parents);
  let siblings = FindSiblings(person, people);
  personFamily = personFamily.concat(siblings);
  return personFamily;
}
function displayPersonInfo(person, people) {
  let spouse = findSpouse(person, people);
  let parents = findParents(person, people);
  let spouseName = "";
  if (spouse != undefined) {
    spouseName = `${spouse.firstName} ${spouse.lastName}`;
  }
  let parentsNames = parents
    .map((person) => `${person.firstName} ${person.lastName}`)
    .join(", ");
  alert(`Name: ${person.firstName} ${person.lastName} \n Gender:${person.gender} \n Date of Birth: ${person.dob} \n Height: ${person.height}
Weight: ${person.weight} \n Eyecolor: ${person.eyeColor} \n Occupation: ${person.occupation}
Parents: ${parentsNames}
Spouse: ${spouseName} `);
}
function findSpouse(person, people) {
  let spouseid = person.currentSpouse;
  let spouseArray = people.filter((person) => person.id === spouseid);
  let spouse = spouseArray[0];
  return spouse;
}
function findParents(person, people) {
  let parentids = person.parents;
  let parents = people.filter(
    (person) => person.id === parentids[0] || person.id === parentids[1]
  );
  return parents;
}
function FindSiblings(person, people) {
  let siblings = people.filter(
    (el) => person.parents.includes(el.parents[0]) && person.id != el.id
  );
  return siblings;
}
function findPersonDescendants(person, people) {
  let descendants = [];
  let children = people.filter(
    (ppl) => ppl.parents[0] === person.id || ppl.parents[1] === person.id
  );
  descendants = descendants.concat(children);
  children.forEach((child) => {
    let grandKids = people.filter(
      (ppl) => ppl.parents[0] === child.id || ppl.parents[1] === child.id
    );
    descendants = descendants.concat(grandKids);
  });

  return descendants;
}
function displayPeople(displayTitle, peopleToDisplay) {
  let formatedPeopleDisplayText = peopleToDisplay
    .map((person) => `${person.firstName} ${person.lastName}`)
    .join("\n");
  alert(`${displayTitle}\n\n${formatedPeopleDisplayText}`);
}
function validatedPrompt(message, acceptableAnswers) {
  acceptableAnswers = acceptableAnswers.map((aa) => aa.toLowerCase());

  let builtPromptWithAcceptableAnswers = `${message} \nAcceptable Answers: ${acceptableAnswers
    .map((aa) => `\n-> ${aa}`)
    .join("")}`;

  let userResponse = prompt(builtPromptWithAcceptableAnswers).toLowerCase();

  if (acceptableAnswers.includes(userResponse)) {
    return userResponse;
  } else {
    alert(
      `"${userResponse}" is not an acceptable response. The acceptable responses include:\n${acceptableAnswers
        .map((aa) => `\n-> ${aa}`)
        .join("")} \n\nPlease try again.`
    );
    return validatedPrompt(message, acceptableAnswers);
  }
}

function exitOrRestart(people) {
  let userExitOrRestartChoice = validatedPrompt(
    "Would you like to exit or restart?",
    ["exit", "restart"]
  );

  switch (userExitOrRestartChoice) {
    case "exit":
      return;
    case "restart":
      return app(people);
    default:
      alert("Invalid input. Please try again.");
      return exitOrRestart(people);
  }
}
