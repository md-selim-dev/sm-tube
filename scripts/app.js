




const errorElement = document.getElementById('error-element');


const loadCategory = async () => {
  const res = await fetch("https://openapi.programming-hero.com/api/phero-tube/categories");
  const data = await res.json();
  const categories = data.categories;

  const videoContainer = document.getElementById('video-container');
  videoContainer.textContent = '';

  const categorieSection = document.getElementById("category-section");
  const catContainer = document.createElement('div');
  catContainer.classList = (`flex justify-center gap-4`)

  errorElement.classList.add('hidden')

  const div1 = document.createElement('div');
  div1.classList = `btn btn-error px-6`;
  div1.innerHTML = `<button onclick="showAllVideos()">All</button>`;
  catContainer.appendChild(div1)

  categories.forEach(category => {
    const div = document.createElement('div');
    div.classList = `catBtn btn px-7`
    div.innerHTML = `<button onclick="videoByCategory('${category.category_id}')">${category.category}</button>`;
    catContainer.appendChild(div);

  })

  categorieSection.appendChild(catContainer)
}

const videoByCategory = async (catId) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${catId}`);
  const data = await res.json();
  const category = data.category;
  // console.log(data);

  const videoContainer = document.getElementById('video-container');
  videoContainer.textContent = '';

  const allBtn = document.querySelectorAll(".catBtn")
  allBtn.forEach(btn => {
    btn.classList.remove('bg-red-500')
  })



  if(category.length === 0){
    errorElement.classList.remove('hidden')
  }else{
    errorElement.classList.add('hidden')
  }

  category.forEach(card => {

    let isVerified = '';
    if(card.authors[0].verified){
      isVerified = '<img class="w-5 h-5" src="./images/verify.png"/>' ;
    }

    const cardElem = document.createElement('div');
    cardElem.className = 'card bg-base-100 w-full shadow-xl';
    cardElem.innerHTML = `
       <figure class="overflow-hidden h-64">
            <img class="w-full"
              src="${card.thumbnail}"
              alt="Shoes" />
              <span class="absolute bottom-[40%] right-5 bg-gray-800 text-white p-.5"><span>0</span> hours</span>
          </figure>
          <div class="card-body">
           <div class="flex gap-3">
            <div class="w-10 rounded-xl">
              <img class="rounded-full w-12 h-12" src="${card?.authors[0]?.profile_picture}" alt="author">
            </div>
            <div class="flex flex-col gap-1">
              <h4>${card.title}</h4>
              <div class="flex gap-4 items-center">
                <h6>${card?.authors[0]?.profile_name}</h6>
                ${isVerified}
              </div>
              <p><span>${card?.others?.views}</span> View</p>
            </div>
           </div>
          </div>
    `;
    videoContainer.appendChild(cardElem);
  })
}

const showAllVideos = async () => {
  const res = await fetch('https://openapi.programming-hero.com/api/phero-tube/videos');
  const data = await res.json();
  const videos = data.videos;
  // console.log(videos);

  if(videos.length === 0){
    errorElement.classList.remove('hidden')
  }else{
    errorElement.classList.add('hidden')
  }

  const videoContainer = document.getElementById('video-container');
  videoContainer.textContent = '';

  videos.forEach(card => {
    let isVerified = '';
    if(card.authors[0].verified){
      isVerified = '<img class="w-5 h-5" src="./images/verify.png"/>' ;
    }

    const cardElem = document.createElement('div');
    cardElem.className = 'card bg-base-100 w-full shadow-xl';
    cardElem.innerHTML = `
       <figure class="overflow-hidden h-64">
            <img class="w-full"
              src="${card.thumbnail}"
              alt="Shoes" />
              <span class="absolute bottom-[40%] right-5 bg-gray-800 text-white p-.5"><span>0</span> hours</span>
          </figure>
          <div class="card-body">
           <div class="flex gap-3">
            <div class="w-10 rounded-xl">
              <img class="rounded-full w-12 h-12" src="${card?.authors[0]?.profile_picture}" alt="author">
            </div>
            <div class="flex flex-col gap-1">
              <h4>${card.title}</h4>
              <div class="flex gap-4 items-center">
                <h6>${card?.authors[0]?.profile_name}</h6>
                ${isVerified}
              </div>
              <p><span>${card?.others?.views}</span> View</p>
            </div>
           </div>
          </div>
    `;
    videoContainer.appendChild(cardElem);
  })

}

showAllVideos()

// videoByCategory('1001')

loadCategory()