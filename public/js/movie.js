const main = document.querySelector('main');
const imdbId = window.location.search.match(/imdbId=(.*)/)[1];
const BASE_URL = 'https://cineview-alpha.vercel.app/';


function getMovie(imdbId) {
    return fetch(`${BASE_URL}movie/${imdbId}`)
        .then(res => res.json());
}

async function showMovie(movie) {
    console.log(movie);
    const section = document.createElement('section');
    document.title = `${movie.title}`;
    main.appendChild(section);
    const properties = [
        {
            title: 'PG-Rating',
            property: 'rating'
        },
        {
            title: 'Cineview-Rating',
            property: 'irating'
        },
        {
            title: 'Release Date',
            property: 'rdate'
        },
        {
            title: 'Runtime',
            property: 'runtime'
        },
        {
            title: 'Budget',
            property: 'budget'
        },
        {
            title: 'Genre',
            property: 'genres'
        }
    ];

    const descriptionHTML = properties.reduce((html, property) => {
        html += `
        <dt class="col-sm-4">${property.title}</dt>
        <dd class="col-sm-8">${movie[property.property]}</dd>`;
        return html;
    }, '');

    const bproperties = [
        {
            title: 'Director',
            bproperty: 'director'
        },
        {
            title: 'Writer',
            bproperty: 'writer'
        },
        {
            title: 'Plot',
            bproperty: 'plot'
        }
    ];

    const writedirect = bproperties.reduce((html, bproperty) => {
        html += `<dt class="col-sm-3">${bproperty.title}</dt>
            <dd class="col-sm-9">${movie[bproperty.bproperty]}</dd>`;
        return html;
    }, '');

    let list = "";
    for (let i = 0; i < movie.cast.length; i++) {
        list += ` <div class="row" id="castblock">
        <img src="${movie.cast[i].image}" class="img-fluid col-5" />
        <div class="col-7 my-auto">
        <h5>${movie.cast[i].title}</h5>
        <figcaption class="blockquote-footer mt-1">
        <cite title="Source Title">${movie.cast[i].role}</cite>
        </figcation>
        </div>
        </div>`
    };

    section.outerHTML = `
            <section class="container" id="details" >
            
                <h1 class="text-center mb-5 fs-2" id="title">${movie.title}</h1>
                <section id="description">
                    <div class="row">    
                        <div class="col-sm-4" id="poster">
                            <img src="${movie.poster}" class="img-fluid" />
                        </div>
                        <div class="col-sm-8 pt-5" id="pdescription">
                            <dl class="row">
                                ${descriptionHTML}
                            </dl>
                        </div>
                    </div>
                    <div class="mt-5" id="description2">
                        <dl class="row">
                            ${writedirect}
                        </dl>
                    </div>
                    <section id="starcast" class="container">
                    <div>
                    <h3 class="fs-3">Star Casts<h3>
                     <div id="casts" class="container">
                        ${list}
                    </div>
                    </div>
                    </section>                     
                </section>
            </section>
        `;
}

getMovie(imdbId)
    .then(showMovie)




