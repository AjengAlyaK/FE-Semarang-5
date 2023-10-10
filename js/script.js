const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar')

if (bar) {
    bar.addEventListener('click', () =>{
        nav.classList.add('active');
    })
}
if (close) {
    close.addEventListener('click', () =>{
        nav.classList.remove('active');
    })
}

function generateStarRating(rating) {
    const maxRating = 5; 
    const filledStars = rating;
    const emptyStars = maxRating - filledStars;
    let starHTML = '';
    for (let i = 0; i < filledStars; i++) {
        starHTML += '<i class="fas fa-star"></i>';
    }
    for (let i = 0; i < emptyStars; i++) {
        starHTML += '<i class="far fa-star"></i>';
    }
    return starHTML;
}

const getProduk = async ()=>{
    try {
        const respone = await fetch('https://be-semarang-5-production.up.railway.app/produk');
        const res = await respone.json();
        const produkContainer = document.querySelector('.pro-container');
        for (let i = 0; i < res.data.length; i++) {
            const div = document.createElement('div');
            div.classList.add('pro');

            const produk = `
        
            <img src=${res.data[i].gambar} alt="">
            <div class="des">
                <span>${res.data[i].brand}</span>
                <h5>${res.data[i].nama_produk}</h5>
                <div class="star">
                ${generateStarRating(Number(res.data[i].rating))}
                </div>
                <h4>${res.data[i].harga}</h4>
            </div>
            <a href=""><i class="fal fa-shopping-cart cart"></i></a>
        `
        div.innerHTML = produk;
        produkContainer.append(div);
        }
    } catch (error) {
        
    }

}

getProduk();

// email validator
function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (emailRegex.test(email)) {
        return true;
    } else {
        return false;
    }
}

// get news letter
function postNewsLetter() {
    const railwayEndpointUrl = 'https://be-semarang-5-production.up.railway.app/get-news-letter';

    const emailInput = document.getElementById('emailInput');
    const email = emailInput.value;
    // console.log(email)
    // validate email
    if(validateEmail(email)){
        const dataToSend = {
            email: email
        };
    
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend), 
        };
    
        fetch(railwayEndpointUrl, requestOptions)
        .then((response) => {
            if (!response.ok) {
            throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            alert('success');
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    } else {
        alert('Email format is not valid');
    }
    
}

const postButton = document.getElementById('postButton');
if (postButton) {
    postButton.addEventListener('click', postNewsLetter);
}

// send message
function sendMessage() {
    const railwayEndpointUrl1 = 'https://be-semarang-5-production.up.railway.app/send-message';

    const name = document.getElementById('name').value;
    const emailMessage = document.getElementById('emailMessage').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    // console.log(name);

    if(validateEmail(emailMessage)){
        const dataToSend = {
            name: name,
            email: emailMessage,
            subject: subject,
            message: message
        };
    
        const requestOptions1 = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend), 
        };
    
        fetch(railwayEndpointUrl1, requestOptions1)
        .then((response) => {
            if (!response.ok) {
            throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            alert('success');
            console.log('Response:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    } else {
        alert('Email format is not valid');
    }

}

const postMessage = document.getElementById('postMessage');
if (postMessage) {
    postMessage.addEventListener('click', sendMessage);
}