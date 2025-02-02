import{a as h,S as f,i}from"./assets/vendor-DEenWwFD.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function a(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(t){if(t.ep)return;t.ep=!0;const r=a(t);fetch(t.href,r)}})();const v=e=>`<li class="gallery-card">
            <article class="card">
            <a class="gallery-link" href="${e.largeImageURL}" target="_blank" rel="noopener noreferrer">
              <img class="gallery-img" src="${e.webformatURL}" alt="${e.tags}" />
            </a>
            <div class="gallery-container">
              <div class="gallery-item">
                <p class="gallery-title">Likes</p>
                <p class="gallery-count">${e.likes}</p>
              </div>
              <div class="gallery-item">
                <p class="gallery-title">Views</p>
                <p class="gallery-count">${e.views}</p>
              </div>
              <div class="gallery-item">
                <p class="gallery-title">Comments</p>
                <p class="gallery-count">${e.comments}</p>
              </div>
              <div class="gallery-item">
                <p class="gallery-title">Downloads</p>
                <p class="gallery-count">${e.downloads}</p>
              </div>
            </div>
          </article>
        </li>`,L="48600448-a8625b0ee752919c612468958",w="https://pixabay.com/api/",S=async(e,s=1,a=15)=>{const o=new URLSearchParams({q:e,key:L,image_type:"photo",orientation:"horizontal",safesearch:"true",page:s,per_page:a});return(await h.get(`${w}?${o}`)).data},b=document.querySelector(".js-search-form"),g=document.querySelector(".js-gallery"),l=document.querySelector(".js-load-more"),p=document.querySelector(".loader");let d="",c=1;const u=15;let y=0,P=new f(".js-gallery a",{captionDelay:300,captionsData:"alt"});l.style.display="none";const q=async e=>{if(e.preventDefault(),d=e.currentTarget.elements.user_query.value.trim(),d===""){i.error({message:"Please enter your request",position:"topRight"});return}g.innerHTML="",c=1,y=0,l.style.display="none",await m()},m=async()=>{try{p.classList.remove("is-hidden");const e=await S(d,c,u);if(e.totalHits===0){i.error({message:"Sorry, there are no images matching your search query.",position:"topRight"});return}y=e.totalHits;const s=e.hits.map(a=>v(a)).join("");g.insertAdjacentHTML("beforeend",s),P.refresh(),c*u<y?l.style.display="block":(l.style.display="none",i.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"})),c+=1,R()}catch{i.error({message:"Something went wrong. Please try again later.",position:"topRight"})}finally{p.classList.add("is-hidden")}},R=()=>{const e=document.querySelector(".gallery-card").getBoundingClientRect().height;window.scrollBy({top:e*2,behavior:"smooth"})};b.addEventListener("submit",q);l.addEventListener("click",m);
//# sourceMappingURL=index.js.map
