// Api url
const url2 = "https://akabab.github.io/superhero-api/api/all.json";

// Character Info's
const characterInfo = [];

// fetch Characters
fetch(url2)
    .then(resonse => resonse.json())
    .then(fecthCharacters);

// Character's Details 
function fecthCharacters(data) {
    characterInfo.push(...data);
}

const Ui = () => ({
    matchCharacter(matchNames, names) {
        return names.filter(character => {
            const regExpg = new RegExp(matchNames, 'gi');
            return character.name.match(regExpg)
        })
    },
    peekList(value, names) {
        const matchName = this.matchCharacter(value, names);
        const html = matchName.map(character => {
            return `
         <div id="${character.id}" data-name="${character.name}" class="peek-character">${character.name}<img class="avatar" src="${character.images.lg}"></div>
            `
        }).join('');

        searchName.innerHTML = html;
    },
    pickCharacter(target, output) {
        if (target.className === "peek-character") {
            fetch(`https://akabab.github.io/superhero-api/api/id/${target.id}.json`)
                .then(res => res.json())
                .then(data => {
                    const powerStats = data.powerstats;
                    output.innerHTML += `
                 <div id="${data.id}" class="card" data-name="${data.name}" style="width: 18rem;">
                    <img id="img" class="card-img-top" src="${data.images.lg}" alt="Card image cap" />
                    <div class="card-body">
                       <h5 class="card-title">${data.name}</h5>
                       <div>H: <span>${data.appearance.height[0]}</span>  W: ${data.appearance.weight[0]} </div>
                        <ul class="card-text">
                            <li>Intelligence: <span>${powerStats.intelligence}</span></li>
                            <li>Strength: <span>${powerStats.strength}</span></li>
                            <li>Speed: <span>${powerStats.speed}</span></li>
                            <li>Durability: <span>${powerStats.durability}</span></li>
                            <li>Power: <span>${powerStats.power}</span></li>
                            <li>Combat: <span>${powerStats.combat}</span></li>
                        </ul>
                    </div>  
                </div>`
                });
        }
    },
    characterClick() {

    },
    //   Show Message
    showMessage(messages, classAdd) {
        const message = document.querySelector("#message");
        message.innerHTML = messages;
        message.classList.add(classAdd);
        setTimeout(function () {
            message.classList.remove(classAdd);
            message.innerHTML = "";
        }, 2000);
    }
});


// selected container 
const peekContainer = document.querySelector("#peek-container").addEventListener('click', selectCharacter);
// input element
const searchInput = document.querySelector("#search");
// keyup Event
searchInput.addEventListener("keyup", peekCharacter);
// change Event
searchInput.addEventListener("change", peekCharacter);
// ul element
const searchName = document.querySelector("#peek-name");
// Selected Container
const selected = document.querySelector("#selected-container");

// input container
const fixInput = document.querySelector(".fix-input");
let fix = fixInput.offsetTop;
// fix input 
function fixinput() {

    if (fix <= this.scrollY) {
        document.body.classList.add("bodyClass");
        document.body.style.paddingTop = `${fixInput.offsetHeight}px`;
        searchInput.placeholder = "Character";
    } else {
        document.body.classList.remove("bodyClass");
        document.body.style.paddingTop = 0;
        searchInput.placeholder = "";
    }
}
// Add Scroll Listner to the Window
window.addEventListener('scroll', fixinput);


// Peek Character search
function peekCharacter() {
    //  Instantiate UI
    const ui = Ui();
    if (this.value === "") {
        searchName.innerHTML = '';
    } else {
        ui.peekList(this.value, characterInfo)
    }
}
// selected Charaters Id's
const sameChara = []

// Select Character
function selectCharacter(e) {
    // Instantiate UI
    const ui = Ui();
    //  Get the target id
    const targetId = e.target.dataset.name;

    if (!sameChara.includes(targetId)) {
        ui.pickCharacter(e.target, selected);
        ui.showMessage(`${e.target.dataset.name} Add`, "alert-success");
        sameChara.push(targetId);
    } else {
        ui.showMessage(`${e.target.dataset.name} Already Added`, "alert-danger");
    }

    console.log(sameChara)

    // Clear input value
    searchInput.value = "";
    // clear peekCharater ul
    searchName.innerHTML = '';
}