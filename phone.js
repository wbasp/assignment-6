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
        document.getElementById('ph-details').style.display = 'none';
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
    phoneDetailsDiv.style.display='block';
    phoneDetailsDiv.textContent='';
    const newDiv = document.createElement('div');
    newDiv.classList.add('card');
    newDiv.innerHTML=`
    <div class="row g-0">
        <div class="col-md-4">
            <img src="${phone.data.image}" class="w-75 h-75 ms-5 mt-5 rounded-start" alt="picture of a phone of ${phone.data.brand}">
        </div>
        <div class="col-md-8 d-flex mt-5">
            <div class="card-body mx-4">
                <p class="card-title">Brand: ${phone.data.brand}</p>
                <p class="card-title">Phone name: ${phone.data.name}</p>
                <p id="Rdate" class="card-title">Release date: ${phone.data.releaseDate}</p>
                <p class="card-title">WLAN: ${phone.data.others.WLAN}</p>
                <p class="card-title">Bluetooth: ${phone.data.others.Bluetooth}</p>
                <p class="card-title">GPS: ${phone.data.others.GPS}</p>
            </div>
            <div class="card-body mx-4">
                <h3>Main Features:</h3>
                <p class="card-title">Storage: ${phone.data.mainFeatures.storage}</p>
                <p class="card-title">Display size: ${phone.data.mainFeatures.displaySize}</p>
                <p class="card-title">Chip set: ${phone.data.mainFeatures.chipSet}</p>
                <p class="card-title">Memory: ${phone.data.mainFeatures.memory}</p>
            </div>
        </div>
    </div>
    `;
    if(${phone.data.releaseDate}==undefined||${phone.data.releaseDate}==null||${phone.data.releaseDate}==''){
        document.getElementById('Rdate').innerText='Release date: no release found';
    }
    phoneDetailsDiv.appendChild(newDiv);
}