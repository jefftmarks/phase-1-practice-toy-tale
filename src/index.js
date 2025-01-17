let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });


//Render Toy Card Function
function renderCard(toy) {
  //create html elements for card and provide class names when necessary
  const toyCollection = document.querySelector('#toy-collection');
  const divCard = document.createElement('div');
  divCard.className = 'card';
  const h2 = document.createElement('h2');
  const img = document.createElement('img');
  img.className = 'toy-avatar';
  const pLikes = document.createElement('p');
  const btn = document.createElement('button');
  btn.className = 'like-btn';
  btn.textContent = 'Like ❤️';

  //populate text content of elements with  toy data
  h2.textContent = toy.name;
  img.src = toy.image;
  pLikes.textContent = toy.likes;
  btn.id = toy.id;

  //append divCard to toy collection div and toy data to divCard
  toyCollection.append(divCard);
  divCard.append(h2, img, pLikes, btn);

  //add event listener to like button with function to increase likes
  btn.addEventListener('click', () => {
    toy.likes++
    fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/jason'
      },
      body: JSON.stringify(toy)
    })
    .then(res => res.json())
    .then(toy => pLikes.textContent = toy.likes)
    .catch(e => console.error(e))
  });
}

//Form handling

  //Grab form and assign event listener
  const form = document.querySelector('form');
  form.addEventListener('submit', handleForm);

  //Function for handling form
  function handleForm(event) {
    event.preventDefault();

    //Create new toy card
    const toy = {
      name: event.target.name.value,
      image: event.target.image.value,
      likes: 0
    }

    //Fetch POST request and render new toy card
    fetch('http://localhost:3000/toys/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(toy)
    })
    .then(res => res.json())
    .then(renderCard)
    .catch(e => console.error(e));
  }
  
//Make fetch requests

  //Fetch GET request preliminary toy data and invoke renderCard
  fetch('http://localhost:3000/toys')
  .then(res => res.json())
  .then(toys => toys.forEach(renderCard))
  .catch(e => console.error(e));

});
