const url2 = "https://akabab.github.io/superhero-api/api/all.json";
// const url2 = "https://akabab.github.io/superhero-api/api/id/115.json";

// Character Info's
const characterInfo = [];
// Character Names
const characternames = [];

// fetch Characters
fetch(url2)
    .then(resonse => resonse.json())
    .then(fecthCharacters);

// Character's Details 
function fecthCharacters(data) {
    const characterNames = [];
    // push character's  id, name, powerStats, img
    for (const i in data) {
        characterNames.push(`{"id":${data[i].id},"name":"${data[i].name}","powerstats":{"intelligence": ${data[i].powerstats.intelligence},"strength": ${data[i].powerstats.strength},"speed": ${data[i].powerstats.speed},"durability": ${data[i].powerstats.durability},"power": ${data[i].powerstats.power},"combat": ${data[i].powerstats.combat}},"image":"${data[i].images.lg}"}`);
    }
    // push character's names
    for (const i in data) {
        characternames.push(data[i].name);
    }
    // push json parse 
    for (const x in characterNames) {
        characterInfo.push(JSON.parse(characterNames[x]));
    }
}

const CharacterInput = (input) => ({
    input,
})


const Ui = () => {};


// Get Character
function getUser(e) {
    // Get Input
    const searchInput = document.querySelector("#search").value;
    // set Input 
    const charInput = CharacterInput(searchInput);

    return charInput;
}



// function displayUsers(data) {
//     const container = document.querySelector("#marvel-contain");
//     container.innerHTML = `
//     <div><img src="${data[109].images.md}"></div>
//     <div>${data[109].name}</div>`
//     // console.log(data[0].biography.alignment)
//     // for (const i in data) {
//     //     const powerStats = data[i].powerstats;
//     //     const measurements = data[i].appearance;
//     //     if (i < 50) {
//     //         container.innerHTML +=

//     //     }
//     // }
// }






// fetch(url2)
//     .then(resonse => resonse.json())
//     .then(displayUsers);

// function displayUsers(data) {
//     const container = document.querySelector("#marvel-contain");
//     console.log(data[0].biography.alignment)
//     for (const i in data) {
//         const powerStats = data[i].powerstats;
//         const measurements = data[i].appearance;
//         if (i < 50) {
//             container.innerHTML += ` 
//             <div class="card" style="width: 18rem;">
//             <img id="img" class="card-img-top" src="${data[i].images.md}" alt="Card image cap" />
//             <div class="card-body">
//               <h5 class="card-title">${data[i].name}</h5>
//               <div>H: <span>${measurements.height[0]}</span>  W: ${measurements.weight[0]} </div>
//               <ul class="card-text">
//               <li>Intelligence: <span>${powerStats.intelligence}</span></li>
//               <li>Strength: <span>${powerStats.strength}</span></li>
//               <li>Speed: <span>${powerStats.speed}</span></li>
//               <li>Durability: <span>${powerStats.durability}</span></li>
//               <li>Power: <span>${powerStats.power}</span></li>
//               <li>Combat: <span>${powerStats.combat}</span></li>
//               </ul>
//               <div>${data[i].biography.alignment}</a>
//             </div>  
//          </div>
//             `
//         }
//     }
// }