
const form = document.querySelector("#votes-form")
const input = document.createElement("input")
input.type = "hidden"
input.className = "inputs"
form.appendChild(input)
const votes = document.querySelector("#vote-count");

fetch("http://localhost:3000/characters")
  .then((res) => res.json())

  .then(function (characters) {
    console.log(characters);

    characters.map(function (character) {
      let upperDiv = document.getElementById("character-bar");

      const name = document.createElement("h2");

      name.className = "namee";

      upperDiv.appendChild(name);

      name.innerHTML = `<span id = "character-bar" >${character.name}</span>`;

     

      name.addEventListener("click", dropDown);

      function dropDown() {
        let namess = document.querySelector("#name");
        let imgs = document.querySelector("#image");

        

        namess.textContent = character.name;
        imgs.src = character.image;
        votes.textContent = character.votes;

        
        input.id = character.id
      }

      
    });
  });

 

  form.addEventListener("submit", formSubmit)

  function formSubmit(e){
    e.preventDefault()

    
    const id = document.querySelector(".inputs").id
    let votesNum = document.querySelector("#vote-count").textContent;
    let voteCount = document.querySelector("#votes").value
    votesNum = parseInt(votesNum,10)
    voteCount = parseInt(voteCount,10)||0

    voteCount = voteCount + votesNum



    fetch(`http://localhost:3000/characters/${id}`,{
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json'
            
          },
          body: JSON.stringify({votes:voteCount})
    }).then(res => res.json()).then(character => votes.textContent = character.votes )

    
  }

  const resetButton = document.querySelector("#reset-btn")

  resetButton.addEventListener("click",buttonReset)

  function buttonReset(e){
    e.preventDefault();

    const id = document.querySelector(".inputs").id
    let votesNum = document.querySelector("#vote-count").textContent = 0
    let voteCount = document.querySelector("#votes").value = 0
    votesNum = parseInt(votesNum,10)
    voteCount = parseInt(voteCount,10)||0

    voteCount = voteCount + votesNum
   document.getElementById("vote-count").textContent = 0;

    fetch(`http://localhost:3000/characters/${id}`,{
      method: "PATCH",
      headers: {
          'Content-Type': 'application/json'
          
        },
        body: JSON.stringify({votes:voteCount})
  })
  .then(res => res.json())
  .then(character => votes.textContent = character.votes )
  e.reset()
  
  }