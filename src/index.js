import fetchCountries from './fetchCountries';
import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const inputEl = document.querySelector("#search-box");
const countryList = document.querySelector(".country-list");
const countryInfo = document.querySelector(".country-info");

const DEBOUNCE_DELAY = 300;



inputEl.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(e) {
    let inputElValue = inputEl.value;

    if (inputElValue === '') {
        countryList.innerHTML = " "; 
        countryInfo.innerHTML = " ";
    }

    if (inputElValue.trim() === '') return;


    

    fetchCountries(inputElValue)
        .then((countries) => { renderName(countries) })
        .then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  })
        .catch((error) => { onFetchError(error) });  

};

function onFetchError(countries) {

Notiflix.Notify.failure (`Oops, there is no country with that name`)

};



function renderName(countries) {
   
    if (countries.length > 10) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
    }

    else if (countries.length > 2 && countries.length < 10) {
        const markup = countries
            .map((country) => {
                return `<li>
         <img src="${country.flags.svg}" width="30"> <span>${country.name.common}</span></li>`;
            })
            .join("");
        countryList.innerHTML = markup;
        
    } else if (countries.length === 1) {

        const markup = countries
            .map((country) => {
                return `
       <img src="${country.flags.svg}" width="30"><span>${country.name.common}</span>
        <p><b>Capital</b>: ${country.capital}</p>
        <p><b>Population</b>: ${country.population}</p>
        <p><b>Languages </b>: ${Object.values(country.languages)}</p>`
            }).join("");
         countryList.innerHTML = '';
        countryInfo.innerHTML = markup;

    }
    
}       
        
        
        
        
