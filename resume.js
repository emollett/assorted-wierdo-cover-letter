const Sentencer = require('sentencer');
const fetch = require("node-fetch");
// const fs = require('fs');

async function getData(){
    const response = await fetch('https://emollett.github.io/assorted-wierdo-cover-letter/entities.json');
    return await response.json();
}
 
getData().then((data) => {
  console.log(data); // JSON data parsed by `response.json()` call
  let rolesList = createLists(data, "ROLE")
  let organizationList = createLists(data, "ORGANIZATION")
  let personList = createLists(data, "PERSON")
  let locationList = createLists(data, "LOCATION")
  let eventList = createLists(data, "EVENT")
  let quantityList = createLists(data, "QUANTITY")
  let titleList = createLists(data, "TITLE")
  Sentencer.configure({
    actions: {
        ROLE: function() {
            return rolesList[Math.floor(Math.random() * rolesList.length)]
        },
        ORGANIZATION: function() {
            return organizationList[Math.floor(Math.random() * organizationList.length)]
        },
        PERSON: function() {
            return personList[Math.floor(Math.random() * personList.length)]
        },
        LOCATION: function() {
            return locationList[Math.floor(Math.random() * locationList.length)]
        },
        EVENT: function() {
            return eventList[Math.floor(Math.random() * eventList.length)]
        },
        QUANTITY: function() {
            return quantityList[Math.floor(Math.random() * quantityList.length)]
        },
        TITLE: function() {
            return titleList[Math.floor(Math.random() * titleList.length)]
        }
      }
  });
  generateCoverletter()
});


function createLists(data, match){
    let rolesList = []
    for(i=0; i<data.Entities.length; i++){
        if(data.Entities[i].Type == match){
            rolesList.push(data.Entities[i].Text)
        }  
    }

    return rolesList
}



function generateCoverletter(){
    let text = Sentencer.make("I would like to apply for the role of {{ ROLE }}. \r\n \r\n I believe my skills are a good match to be working with you and your team, particularly the experience I gained working with {{ ORGANIZATION }} as a {{ ROLE }}. \r\n I am currently working with {{ PERSON }} at {{ ORGANIZATION }} in {{ LOCATION }}, but since {{EVENT}} happened, I feel that my talents are best used in government. \r\n In addition to the above, I have {{QUANTITY}} knowlege about {{EVENT}} and {{TITLE}}, and previous experience as the {{ROLE}} for {{ORGANIZATION}}. \r\n \r\n Thank you for your time and consideration. I look forward to speaking with you about this employment opportunity.");

    console.log(text);
    
    var textContainer = document.getElementById("textContainer");
    
    var new_span = document.createElement('p');
    new_span.innerText = text;
    textContainer.appendChild(new_span);
}


// I would like to apply for the role of {{ROLE}}.

// I believe my skills are a good match to be working with you and your team, particularly the experience I gained working with {{ORGANIZATION}} as a {{ROLE}}.
// I am currently working with {{PERSON}} at {{ORGANISATION}} in {{LOCATION}}, but since {{EVENT}}, I feel that my talents are best used in government.
// In addition to the above, I have {{QUANTITY}} knowlege about {{EVENT}} and {{TITLE}}, and previous experience as the {{ROLE}} for {{ORGANIZATION}}. 


// Thank you for your time and consideration. I look forward to speaking with you about this employment opportunity.