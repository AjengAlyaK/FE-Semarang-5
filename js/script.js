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