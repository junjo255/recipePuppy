// ###################################################################
//                         SEARCH BAR
// ###################################################################

$('#search_bar').on('submit', (e) => {
    e.preventDefault();

    let searchWords = $('#search').val()
    let arrWords = keyWords(searchWords)
    let data = document.getElementById('search')


    let apiUrl = `http://www.recipepuppy.com/api/?i=${arrWords}`
    const app = document.getElementById('search_main')

    const container = document.createElement('div');
    container.setAttribute('class', 'container');

    app.appendChild(container)

    doCORSRequest({
        method: 'GET',
        url: apiUrl,
        data: data
    }, function printResult(result) {

        var data = result.results
        data.forEach(food => {
            const card = document.createElement('div')
            card.setAttribute('class', 'card');
            card.setAttribute('onclick', 'handleClick(this)')

            const h1 = document.createElement('h1');
            h1.setAttribute('class', 'h1');
            h1.textContent = food.title;

            const img = document.createElement('img')
            img.setAttribute('class', 'img');
            img.src = food.thumbnail;

            const a = document.createElement('a')
            a.setAttribute('class', 'a')
            a.href = food.href;
            a.textContent = 'Take me to the website!';

            const p = document.createElement('p');
            p.textContent = `Intredients: ${food.ingredients}`;


            container.appendChild(card)
            card.appendChild(h1)
            card.appendChild(img)
            card.appendChild(a)
            card.appendChild(p)

        })
    });

})

// ###################################################################
//                         CORS VALIDATOR
// ###################################################################

var cors_api_url = 'https://cors-anywhere.herokuapp.com/';

function doCORSRequest(options, printResult) {
    var x = new XMLHttpRequest();
    x.open(options.method, cors_api_url + options.url);
    x.onload = x.onerror = function () {
        printResult(
            JSON.parse(x.response)
        );
    };
    if (/^POST/i.test(options.method)) {
        x.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    }
    x.send(options.data);
}


// ###################################################################
//             HELPER FUNCTION FOR THE SEARCHBAR (KEYWORDS)
// ###################################################################
function keyWords(str) {
    str = str.replace(/ +?/g, '').split(',')
    return (str.filter((word) => word.length > 0)).join(',')
}



// ###################################################################
//    SAVE TO FAVORITES -> LOCALSTORAGE (PERSIST BETWEEN PAGE VIEWS)
// ###################################################################
const ul = document.querySelector('ul');
let itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];

localStorage.setItem('items', JSON.stringify(itemsArray));
const data = JSON.parse(localStorage.getItem('items'));


function handleClick(e) {
    let h1 = e.getElementsByTagName('h1')[0].textContent
    itemsArray.push(h1);
    localStorage.setItem('items', JSON.stringify(itemsArray));
    listMaker(h1)
}


const listMaker = (text) => {
    const li = document.createElement('li');

    li.textContent = text;
    ul.appendChild(li)

}

data.forEach(item => {
  listMaker(item);
});


document.getElementById('Btn').addEventListener('click', function () {
  localStorage.clear();
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }
  itemsArray = [];
});