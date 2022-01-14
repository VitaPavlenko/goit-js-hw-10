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
 
    fetchCountries(inputEl.value).then((countries) => {
        console.log(countries);
        renderName(countries)
    }).catch()  

}


function renderName(countries) {
    
    if (countries.length > 10) {
        Notiflix.Notify.warning('Too many matches found. Please enter a more specific name.');
    }

    else if (countries.length > 2 && countries.length < 10) {
        const markup = countries
            .map((country) => {
                return `<li>
         <img src="${country.flags.svg}" width="30"> ${country.name.common}</li>`;
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
        countryInfo.innerHTML = markup;

    

    }
    
}       
        
        
        
        
//       const markup = users
//     .map((user) => {
//       return `<li>
//           <p><b>Name</b>: ${name.name.official }</p>
//           <p><b>Capital</b>: ${name.capital}</p>
//           <p><b>Population</b>: ${name.population}</p>
//           <p><b>Flags</b>: ${name.flags.svg}</p>
//           <p><b>Languages </b>: ${name.languages}</p>
//         </li>`;
//     })
//     .join("");
//   userList.innerHTML = markup; 
//   }  


