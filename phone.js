const searchPhone=()=>{
    const inputField = document.getElementById('input-field');
    const inputValue = inputField.value;
    inputField.value = '';
    const url = `https://openapi.programming-hero.com/api/phones?search=${inputValue}`;
    fetch(url)
    .then(res=>res.json())
    .then(data=>displayResult(data.data));
}
const displayResult = phones =>{
    const searchResult = document.getElementById('search-result');
    searchResult.innerHTML=``;
    phones.forEach(phone => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML=`<div>
        <div class="card h-100">
            <img src="${phone.image}" class="card-img-top w-50 h-50 mx-auto" alt="${phone.slug}">
            <div class="card-body">
                <h5 class="card-title text-center">${phone.phone_name}</h5>
                <p class="card-text text-center">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            </div>
            <button class="bg-primary mb-2 p-2 rounded-pill w-50 mx-auto">Phone Details</button>
        </div>
        </div>`;
        searchResult.appendChild(div);
    });
}