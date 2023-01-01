document.getElementById('err-message').style.display = 'none';
const searchPhone=()=>{
    const inputField = document.getElementById('input-field');
    const inputValue = inputField.value;
    inputField.value = '';
    const url = `https://openapi.programming-hero.com/api/phones?search=${inputValue}`;
    // fetch(url)
    // .then(res=>res.json())
    // .then(data=>console.log(data));
    fetch(url)
    .then(res=>res.json())
    .then(data=>{if(data.status==false){
        searchResult.textContent='';
        document.getElementById('err-message').style.display = 'block';
    }
    else{
        document.getElementById('err-message').style.display = 'none';
        displayResult(data.data);
    }});
}
const searchResult = document.getElementById('search-result');
const displayResult = phones =>{
    searchResult.textContent='';
    phones.forEach(phone => {
        const newDiv = document.createElement('div');
        newDiv.classList.add('col');
        newDiv.innerHTML=`
        <div class="card h-100 w-75 mx-auto">
            <img src="${phone.image}" class="card-img-top w-50 h-50 mx-auto mt-4 mb-0" alt="picture of a phone of ${phone.brand}">
            <div class="card-body">
                <h5 class="card-title text-center">${phone.phone_name}</h5>
                <p class="text-center fw-bold mb-0">${phone.brand}</p>
            </div>
            <button onclick="loadPhoneDetail('${phone.slug}')" class="bg-warning fw-bold text-danger mb-3 p-2 rounded-pill w-50 mx-auto">Phone Details</button>
        </div>
        `;
        searchResult.appendChild(newDiv);
    });
}
const loadPhoneDetail = phoneId => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayPhoneDetails(data));
    // .then(data => console.log(data));
    }
const displayPhoneDetails = phone =>{
    const phoneDetailsDiv = document.getElementById('ph-details');
    phoneDetailsDiv.textContent='';
    const newDiv = document.createElement('div');
    newDiv.innerHTML=`
    <div class="card mb-3" style="max-width: 540px;">
        <div class="row g-0">
            <div class="col-md-4">
                <img src="..." class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
            </div>
            </div>
        </div>
    </div>
    `;
    phoneDetailsDiv.appendChild(newDiv);
}