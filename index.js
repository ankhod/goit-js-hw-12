import{a as y,S as f,i as c}from"./assets/vendor-tnUJPedx.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function s(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(e){if(e.ep)return;e.ep=!0;const o=s(e);fetch(e.href,o)}})();const b="48303483-31cfd41ec7662904a2a6a727b",L="https://pixabay.com/api/";async function h(t,r=1,s=15){const i=`${L}?key=${b}&q=${encodeURIComponent(t)}&image_type=photo&orientation=horizontal&safesearch=true&page=${r}&per_page=${s}`,e=await y.get(i);if(e.status!==200)throw new Error("Failed to fetch images");return e.data}function g({webformatURL:t,largeImageURL:r,tags:s,likes:i,views:e,comments:o,downloads:n}){return`
    <a href="${r}" class="gallery-item" title="${s}">
      <img src="${t}" alt="${s}" loading="lazy" />
      <div class="info">
        <p class="info-item"><b>Likes</b>${i}</p>
        <p class="info-item"><b>Views</b>${e}</p>
        <p class="info-item"><b>Comments</b>${o}</p>
        <p class="info-item"><b>Downloads</b>${n}</p>
      </div>
    </a>
  `}function v(t){const r=document.querySelector(".gallery");r.innerHTML=t.map(g).join(""),new f(".gallery a",{captions:!0,captionsData:"alt",captionDelay:250}).refresh()}function E(t){document.querySelector(".gallery").insertAdjacentHTML("beforeend",t.map(g).join("")),new f(".gallery a",{captions:!0,captionsData:"alt",captionDelay:250}).refresh()}const $=document.querySelector("#search-form"),u=document.querySelector(".gallery"),m=document.querySelector("#load-more-btn"),a=document.createElement("div");a.classList.add("loader","hidden");document.body.appendChild(a);let l=1,d="";$.addEventListener("submit",async t=>{if(t.preventDefault(),d=t.currentTarget.elements.searchQuery.value.trim(),!d){c.error({title:"Error",message:"Please enter a search query"});return}try{a.classList.remove("hidden"),u.innerHTML="",l=1;const r=await h(d,l);if(a.classList.add("hidden"),r.hits.length===0){c.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!"});return}v(r.hits),r.totalHits>15&&m.classList.remove("hidden"),p(u)}catch(r){c.error({title:"Error",message:r.message}),a.classList.add("hidden")}});m.addEventListener("click",async()=>{try{l+=1,a.classList.remove("hidden");const t=await h(d,l);a.classList.add("hidden"),E(t.hits),l*15>=t.totalHits&&(m.classList.add("hidden"),c.error({title:"Error",message:"We're sorry, but you've reached the end of search results."})),p(u)}catch(t){c.error({title:"Error",message:t.message}),a.classList.add("hidden")}});function p(t){const{height:r}=t.firstElementChild.getBoundingClientRect();window.scrollBy({top:r*2,behavior:"smooth"})}
//# sourceMappingURL=index.js.map
