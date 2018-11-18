const url2 = "https://akabab.github.io/superhero-api/api/all.json";

// Character Info's
const characterInfo = [];

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
    // push json parse 
    for (const x in characterNames) {
        characterInfo.push(JSON.parse(characterNames[x]));
    }
}

const Ui = () => ({
    displayUsers(matchNames, names) {
        return names.filter(character => {
            const regExpg = new RegExp(matchNames, 'gi');
            return character.name.match(regExpg)
        })
    },
    setlistNames(value, names) {
        const matchName = this.displayUsers(value, names);
        const html = matchName.map(character => {
            return `
            <li class="list-group-item">
                <div>${character.name}<img class="avatar" src="${character.image}"></div>
            </li>
            `
        }).join('');

        searchName.innerHTML = html;
    },
});

const e = Ui();

// input element
const searchInput = document.querySelector("#search");
searchInput.addEventListener("keyup", getUser);
searchInput.addEventListener("change", getUser);
// ul element
const searchName = document.querySelector("#match-name");


// Get Character
function getUser() {
    //  Instantiate UI
    const ui = Ui();
    if (this.value === "") {
        searchName.innerHTML = '';
    } else {
        ui.setlistNames(this.value, characterInfo)
    }
}



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