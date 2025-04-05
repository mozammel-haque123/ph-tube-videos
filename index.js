// hurs , minit, secend object
const convertToHMS = (seconds) => {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  return `${hrs} hour, ${mins} minute, ${secs} second`;
}

// button click active class add and remove
const removeClass = () => {
  const elements = document.getElementsByClassName(`cata-id-data`);
  for (let element of elements) {
    element.classList.remove('active');
  }
};

// ---------------------------------------------------------------------

// button data 
const phfetchData = ()=>{
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then(res => res.json())
    .then(data => phlodingData(data.categories))
    .catch((e)=> console.log(e))
}

// button html
const phlodingData = (datas) =>{
const tadaButton = document.getElementById('tada-button');
datas.forEach((p) =>{
  const CreatButton = document.createElement('div');
  CreatButton.innerHTML = `
  <button id="btn-${p.category_id}" class="btn cata-id-data" onclick="clickPh('${p.category_id}')">${p.category}</button>
  `;
  tadaButton.append(CreatButton);
})
}
// onclick id
const clickPh = (id) =>{
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
  .then(res => res.json())
  .then(data => {
    removeClass()
   const active = document.getElementById(`btn-${id}`)
   active.classList.add('active')
   videoData(data.category)
  })
  .catch((e)=> console.log(e))
  }

  // video Data Fetch
const videoFetchPhData = () =>{
  fetch(" https://openapi.programming-hero.com/api/phero-tube/videos")
  .then(res => res.json())
  .then(data => videoData(data.videos))
  .catch((e)=> console.log(e))
}

// sho Modal

const shoModal = (vdId) => {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/video/${vdId}`)
    .then(res => res.json())
    .then(data => ModalDataDainamic(data.video))
    .catch((e)=> console.log(e))
}

// search Data
const searchTextData = (ed) =>{
fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${ed}`)
.then(res => res.json())
.then(data => videoData(data.videos))
.catch((e)=> console.log(e))
}



// modal html
const ModalDataDainamic = (dm) =>{
console.log(dm)
const modalData = document.getElementById('modal-data');
modalData.innerHTML = `
 <img class="w-full" src="${dm.thumbnail}">
 <p class="font-bold">${dm.title}</p>
    <p class="text-gray-400 my-1">${dm.authors[0].profile_name}</p>
    <p>${dm.description}</p>
`
my_modal_5.showModal()
}



// videos data html
const videoData = (vData)=>{
  console.log(vData)
const videoDataAppen = document.getElementById('video-data');
videoDataAppen.innerHTML = ""

  if(vData.length === 0){
      videoDataAppen.className = 'flex flex-col justify-center items-center'
      videoDataAppen.innerHTML = `
      <div class="text-center mt-10">
        <img class="w-40 h-40 mx-auto" src="assets/icon.png" alt="No Content">
        <p class="text-xl mt-4 text-gray-600 font-bold">Oops!! Sorry, There is no content <br> here</p>
      </div>
    `;
  }else{
    videoDataAppen.className = 'grid max-sm:grid-cols-1 max-md:grid-cols-2 grid-cols-4 justify-center items-center gap-2 mt-10';
  }

vData.forEach((vd)=>{
const videoCardData = document.createElement('div');
videoCardData.className = 'card bg-base-100'
videoCardData.innerHTML = `
<figure class="relative">
    <img class="h-80 object-cover rounded-sm"
      src="${vd.thumbnail}" />
        <p class="absolute bg-black text-white mt-[200px]">${vd.others?.posted_date.length === 0 ? "" : convertToHMS(vd.others?.posted_date)}</p>
  </figure>

  <div class="flex justify-between items-center">
   <div class="flex gap-2 mt-5">
   <img class="w-10 h-10 rounded-full object-cover" src="${vd.authors[0].profile_picture}">
   <div> 
   <p class="font-bold"> ${vd.title}</p>
   <div class="flex gap-3 items-center">
   <p class="text-gray-400 my-1">${vd.authors[0].profile_name}</p>
<p>
  ${
    vd.authors[0].verified === false
      ? ''
      : '<img class="w-5 h-5 inline" src="https://img.icons8.com/?size=96&id=D9RtvkuOe31p&format=png" />'
  }
</p>
   </div>
   <p class="text-gray-400 text-xs">${vd.others.views} views</p>
   </div>
   
   </div>
<button onclick="shoModal('${vd.video_id}')" class="px-4 py-2 rounded border border-transparent bg-secondary text-white hover:bg-white hover:text-secondary hover:border-secondary transition">
  details
</button>

  </div>
`
videoDataAppen.append(videoCardData)
})

}

// search document
const searchText = document.getElementById('search-text')
searchText.addEventListener('keyup', (e)=>{
  searchTextData(e.target.value)
})

// button
phfetchData()
// video data
videoFetchPhData()