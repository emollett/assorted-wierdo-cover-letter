const Sentencer = require('sentencer');
const fs = require('fs');

let data = fs.readFileSync('entities.json');
let entities = JSON.parse(data);

let rolesList = []
for(i=0; i<entities.Entities.length; i++){
    if(entities.Entities[i].Type == "ROLE"){
        rolesList.push(entities.Entities[i].Text)
    }  
}

Sentencer.configure({
    actions: {
        ROLE: function() {
            return rolesList[Math.floor(Math.random() * rolesList.length)]
        }
      }

  });

function generateCoverletter(){
    let text = Sentencer.make("I would like to apply for the role of {{ ROLE }}.");

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