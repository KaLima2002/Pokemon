function CapitalizeFirsty(Word) {
    const firstLetter = Word.charAt(0).toUpperCase(); 
    const remainingLetters = Word.substring(1);
    return firstLetter + remainingLetters;
};

function lowerFirsty(Word) {
    const firstLetter = Word.charAt(0).toLowerCase(); 
    const remainingLetters = Word.substring(1);
    return firstLetter + remainingLetters;
};

function TypeColor(Type) {
    switch (Type) {
        case ("Normal"):
            return ["#A8A878", "#C6C6A7"];
            break;
        case ("Fighting"):
            return ["#C03028", "#D67873"];
            break;
        case ("Flying"):
            return ["#A890F0", "#C6B7F5"];
            break;
        case ("Poison"):
            return ["#A040A0", "#C183C1"];
            break;
        case ("Ground"):
            return ["#E0C068", "#EBD69D"];
            break;
        case ("Rock"):
            return ["#B8A038", "#D1C17D"];
            break;
        case ("Bug"):
            return ["#A8B820", "#C6D16E"];
            break;
        case ("Ghost"):
            return ["#705898", "#A292BC"];
            break;
        case ("Steel"):
            return ["#B8B8D0", "#D1D1E0"];
            break;
        case ("Fire"):
            return ["#F08030", "#F5AC78"];
            break;
        case ("Water"):
            return ["#6890F0", "#9DB7F5"];
            break;
        case ("Grass"):
            return ["#78C850", "#A7DB8D"];
            break;
        case ("Electric"):
            return ["#F8D030", "#FAE078"];
            break;
        case ("Psychic"):
            return ["#F85888", "#FA92B2"];
            break;
        case ("Ice"):
            return ["#98D8D8", "#BCE6E6"];
            break;
        case ("Dragon"):
            return ["#7038F8", "#A27DFA"];
            break;
        case ("Dark"):
            return ["#705848", "#A29288"];
            break;
        case ("Fairy"):
            return ["#EE99AC", "#F4BDC9"];
            break;
        default:
            ["#FFFFFF", "#FFFFFF"]
    }
}

function CreateStyle(Type1,PokedexId, Type2){
    Type1Color = TypeColor(Type1);
    if(Type2 == undefined){
            let Type1Html = document.getElementById(Type1+PokedexId+"B");
            Type1Html.style.backgroundColor =Type1Color[1];
            let backgroundType1 = document.getElementById(Type1+PokedexId);
            backgroundType1.style.background =Type1Color[0];
            
        }
    else if(Type2 != undefined){
            var Type2Color = TypeColor(Type2);
            let TypeHtml = document.getElementById(Type1+Type2+PokedexId+"B");
            TypeHtml.style.background =`linear-gradient(135deg, ${Type1Color[1]}, ${Type2Color[1]})`;
            let backgroundType1 = document.getElementById(Type1+PokedexId+"A");
            backgroundType1.style.background =Type1Color[0];
            let backgroundType2 = document.getElementById(Type2+PokedexId+"A");
            backgroundType2.style.background =Type2Color[0];
        }
}

function CreateModalStyle(Type1, Type2){
    Type1Color = TypeColor(Type1);
    if(Type2 == undefined){
            let Type1Html = document.getElementById(Type1+"Modal");
            Type1Html.style.backgroundColor =Type1Color[1];
        }
    else if(Type2 != undefined){
            var Type2Color = TypeColor(Type2);
            let backgroundType1 = document.getElementById(Type1+"Modal");
            backgroundType1.style.background =Type1Color[0];
            let backgroundType2 = document.getElementById(Type2+"Modal");
            backgroundType2.style.background =Type2Color[0];
        }
}

async function CallAPIBase(Id) {
    var response = {};
    await fetch('https://pokeapi.co/api/v2/pokemon/' + Id)
        .then(res => {
            return res.json().then(data => Object.assign(response, data) )
        })
        .catch(error => {
            console.error('Ocorreu um erro:', error);
        });
    return{ 
        PokemonName: response.name,
        PokedexId: response.id,
        PokemonSprite: response.sprites.other.home.front_default,
        PokemonTypes: response.types
    };
}

async function CallAPIPokedex(Id) {
    var response = {};
    await fetch('https://pokeapi.co/api/v2/pokemon-species/' + Id)
        .then(res => {
            return res.json().then(data => Object.assign(response, data) )
        })
        .catch(error => {
            console.error('Ocorreu um erro:', error);
        });
        return{ 
            PokedexEntry: response.flavor_text_entries[1].flavor_text,
        }
}

function AddCard1(PokemonName,PokedexId, PokemonSprite, Type1, Type2){
    var NewCard;
    if(Type2!= undefined){
         NewCard = 
            `<div id=${PokemonName}>
            <div class="Pokemon-image" id="${Type1}${Type2}${PokedexId}B">
                <img src="${PokemonSprite}" id="PokemonSprite">
            </div>
            <div class="Pokemon-info">
                <p>
                    <span id="PokedexId">#${PokedexId}</span><span id="PokemonName">${PokemonName}</span>
                </p>
                <p id = "PokemonTypesModal">
                    <span class="PokemonType1" id="${Type1}${PokedexId}A">${Type1}</span>
                    <span class="PokemonType2" id="${Type2}${PokedexId}A">${Type2}</span>
                </p>
            </div>
        </div></div>`
    }
    else{
        NewCard =
            ` <div id=${PokemonName}>
            <div class="Pokemon-image" id="${Type1}${PokedexId}B">
                <img src="${PokemonSprite}" id="PokemonSprite">
            </div>
            <div class="Pokemon-info">
                <p>
                    <span id="PokedexId">#${PokedexId}</span><span id="PokemonName">${PokemonName}</span>
                </p>
                <p id = "PokemonTypesModal">
                    <span class="PokemonType1" id="${Type1}${PokedexId}">${Type1}</span>
                </p>
            </div>
        </div></div>`
    }
    const newCard = document.createElement("div");
    newCard.classList.add("card");
    newCard.innerHTML = NewCard;
    const cardsContainer = document.querySelector(".cards");
    cardsContainer.appendChild(newCard);
}

 function CreateModal(PokemonName,PokedexId,PokemonSprite,PokedexEntry, Type1, Type2){
    const modal = document.createElement('div');
    modal.id = `${PokemonName}Modal`;
    modal.className = 'modal';
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    
    if(Type2!= undefined){
        modalContent.innerHTML = `
        <span id="PokedexIdModal">${PokedexId}</span><span id="PokemonNameModal">${PokemonName}</span>
        <span class= "close" id="close${PokemonName}">&times;</span>
        <img src="${PokemonSprite}" id="PokemonSpriteModal">
        <p id = "PokemonTypesModal">
            <span class="PokemonType1" id="${Type1}Modal">${Type1}</span>
            <span class="PokemonType1" id="${Type2}Modal">${Type2}</span>
        </p>
        <p id="PokedexEntry">${PokedexEntry}</p>
        `;
    }
    else{
        modalContent.innerHTML = `
            <span id="PokedexIdModal">${PokedexId}</span><span id="PokemonNameModal">${PokemonName}</span>
            <span class= "close" id="close${PokemonName}">&times;</span>
            <img src="${PokemonSprite}" id="PokemonSpriteModal">
            <p id = "PokemonTypesModal">
                <span class="PokemonType1" id="${Type1}Modal">${Type1}</span>
            </p>
            <p id="PokedexEntry">${PokedexEntry}</p>
    `;
    }
     modal.appendChild(modalContent);
     document.body.appendChild(modal);
}

function InsertPokemon(Pokemon){
    let PokemonName = CapitalizeFirsty(Pokemon.PokemonName);
        let PokedexId = Pokemon.PokedexId;
        let PokemonSprite = Pokemon.PokemonSprite;
        let PokemonType1 = CapitalizeFirsty(Pokemon.PokemonTypes[0].type.name);
        if(Pokemon.PokemonTypes.length == 1){
            AddCard1(PokemonName,PokedexId,PokemonSprite,PokemonType1);
            CreateStyle(PokemonType1,PokedexId);
        }
        else if(Pokemon.PokemonTypes.length == 2){
            let PokemonType2 = CapitalizeFirsty(Pokemon.PokemonTypes[1].type.name);
            AddCard1(PokemonName,PokedexId,PokemonSprite,PokemonType1,PokemonType2);
            CreateStyle(PokemonType1,PokedexId,PokemonType2);
        }
}

window.onload = async () => {
    var AmountPokemons = 300;
    var Pokemons = [];
    for (var i = 1; i < AmountPokemons+1; i++) {
        PokemonBaseData = await CallAPIBase(i);
        InsertPokemon(PokemonBaseData);
        PokemonEntryData = await CallAPIPokedex(i); //Quebra no 899
        Pokemons[i] = {
            PokemonName: PokemonBaseData.PokemonName,
            PokedexEntry: PokemonEntryData.PokedexEntry
        };
}
    Pokemons.forEach(element => {
        PokemonName = CapitalizeFirsty(element.PokemonName);
        var PokemonDiv = document.getElementById(PokemonName);
        PokemonDiv.addEventListener('click', () => {
            var ChosenName = PokemonDiv.id;   
            var ChosenId = PokemonDiv.querySelector("#PokedexId").textContent;
            var ChosenSprite = PokemonDiv.querySelector("#PokemonSprite").src;
            var ChosenType1 = PokemonDiv.getElementsByClassName("PokemonType1")[0].textContent;
            var ChosenType2;
            var id = ChosenId.substring(1);
            var ChosenPokedexEntry = Pokemons[id-1].PokedexEntry;
            if(PokemonDiv.getElementsByClassName("PokemonType2").length ==1){
                ChosenType2 = PokemonDiv.getElementsByClassName("PokemonType2")[0].textContent;
                CreateModal(ChosenName,ChosenId,ChosenSprite,ChosenPokedexEntry,ChosenType1,ChosenType2);
                CreateModalStyle(ChosenType1,ChosenType2);
            }
            else{
                CreateModal(ChosenName,ChosenId,ChosenSprite,ChosenPokedexEntry,ChosenType1);
                CreateModalStyle(ChosenType1);
            }
            var modal = document.getElementById(`${PokemonDiv.id}Modal`);
            modal.style.display = "block";
            var CloseDivPokemon = ('close'+`${PokemonDiv.id}`);
            var CloseDiv = document.getElementById(CloseDivPokemon);
            CloseDiv.addEventListener('click', () => {
            document.body.removeChild(modal)
            })
        });
    });
};
