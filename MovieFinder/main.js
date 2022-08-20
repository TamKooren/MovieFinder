let inputs = document.querySelectorAll('input[name=filtertypes]');


const addMoviesToDom = movies => {
    let animationDelay = 100;
    let moviesOverview = document.getElementById('movieoverview');
    moviesOverview.innerHTML = '';
    movies
        .map(element => ({imagelink: element.poster, id: element.imdbID}) )
        .forEach(element => {
        let listItem = document.createElement('li')
        let anchorTag = document.createElement('a')
        anchorTag.href = getImdbLink(element.id);
        let image = document.createElement('img')
        image.src = element.imagelink;
        image.setAttribute('data-delay', animationDelay);
        animationDelay += 100;
        listItem.append(anchorTag)
        anchorTag.append(image)
        moviesOverview.append(listItem)
    })

}

const getImdbLink = id => `https://www.imdb.com/title/${id}`;
const filterLatestMovies = () => {
    addMoviesToDom(movies.filter(element => parseInt(element.year) > 2014 ))
}
const filterMovies = wordInMovie => {
    addMoviesToDom(movies.filter(element => element.title.includes(wordInMovie)))
}

const filterStuff = e => {
    switch (e.target.value) {
        case 'newest':
            filterLatestMovies();
            break;
        case 'avengers':
            filterMovies('Avengers')
            break;
        case 'xmen':
            filterMovies('X-Men')
            break;
        case 'princess':
            filterMovies('Princess')
            break;
        case 'batman':
            filterMovies('Batman')
            break;
    }

}

inputs.forEach(element => element.addEventListener('change', filterStuff));
addMoviesToDom(movies);

// For the search
const getToTyping = e => {
    let foundMovies = movies.filter(element => element.title.toLowerCase().includes(e.target.value.toLowerCase()));
    addMoviesToDom(foundMovies);
}

let getSearch = document.getElementById('search');
getSearch.addEventListener('keyup', getToTyping);