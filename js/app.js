//Variables
const form = document.querySelector('#formulario');
const listTweets = document.querySelector('#lista-tweets');

let tweets = [];

eventListeners();

//Event Listeners
function eventListeners() {

    form.addEventListener('submit', addTweet);
    
    /* Cuando el documento este listo*/
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];

        console.log('LocalStorage Cargado');

        createHtml();

    })

}

//Funciones
function addTweet(e) {
    e.preventDefault();

    //Seleccionamos el textarea y obtenemos su valor
    const tweet = document.querySelector('#tweet').value;

    //validación
    if(tweet === ''){
        showError('Campo obligatorio');
        return;
    }

    const tweetObj = {
        id: Date.now(),
        tweet
    }

    /* Añadir al arreglo de tweets */
    tweets = [...tweets, tweetObj]

    /* Agregamos el HTML */
    createHtml();

    /* Reinicia el formulario */
    form.reset();

}

function showError(error) {
    
    /* Creación un nuevo elemento párrafo */
    const messageError = document.createElement('p');

    /* Establece el contenido de texto del párrafo en el mensaje de error. */
    messageError.textContent = error;

    /* Agregamos la clase error al párrafo */
    messageError.classList.add('error');

    /* Seleccionamos el div con el id: contenido */
    const content = document.querySelector('#contenido');

    /* Inseta el mensaje de error */
    content.appendChild(messageError);

    /* Desabilitamos el boton */
    const button = form.querySelector('input[type=submit]');
    button.disabled = true;


    /* Elimina mensaje de error */
    setTimeout(() => {
        messageError.remove();
        button.disabled = false;
    }, 3000);

}

/* Muestra listado del html */
function createHtml() {

    clearHtml();
    
    if(tweets.length > 0){
        tweets.forEach( tweet => {

            /* Agrega un boton de eliminar */
            const btnDelete = document.createElement('a');
            btnDelete.classList.add('borrar-tweet');
            btnDelete.innerText = 'X';

            /*Funcion eliminar */
            btnDelete.onclick = () => {
                removeTweet(tweet.id);
            }

            /*cear un li */
            const li = document.createElement('li');
            li.classList.add('list-group-item');

            /*Añadir texto al li*/
            li.innerText = tweet.tweet;


            /*Asignar el boton al li */
            li.appendChild(btnDelete);

            /*inseta el li en el html */
            listTweets.appendChild(li);

        });
    }

    addLocalStorage();

}

/*Agrega los tweets actules al localStorage */
function addLocalStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

/*Elimina el tweet */
function removeTweet(id) {
    tweets = tweets.filter( tweet => tweet.id !== id);

    createHtml();
}


/* Limpia el html */
function clearHtml() {

    /* Mientras existan elementos */
    while (listTweets.firstChild) {
        /* Remueve el primer hijo encontrado */
        listTweets.removeChild(listTweets.firstChild);
    }
}