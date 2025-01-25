// main.js
import { fetchImages } from './js/pixabay-api.js';
import { renderGallery, appendImages } from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import './css/styles.css';

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('#load-more-btn');
const loader = document.createElement('div');
loader.classList.add('loader', 'hidden');
document.body.appendChild(loader);

let currentPage = 1;
let currentQuery = '';

form.addEventListener('submit', async event => {
  event.preventDefault();
  currentQuery = event.currentTarget.elements.searchQuery.value.trim();
  if (!currentQuery) {
    iziToast.error({ title: 'Error', message: 'Please enter a search query' });
    return;
  }

  try {
    loader.classList.remove('hidden');
    gallery.innerHTML = '';
    currentPage = 1;
    const data = await fetchImages(currentQuery, currentPage);

    loader.classList.add('hidden');
    if (data.hits.length === 0) {
      iziToast.error({
        title: 'Error',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
      return;
    }

    renderGallery(data.hits);
    if (data.totalHits > 15) {
      loadMoreBtn.classList.remove('hidden');
    }

    smoothScroll(gallery);
  } catch (error) {
    iziToast.error({ title: 'Error', message: error.message });
    loader.classList.add('hidden');
  }
});

loadMoreBtn.addEventListener('click', async () => {
  try {
    currentPage += 1;
    loader.classList.remove('hidden');
    const data = await fetchImages(currentQuery, currentPage);
    loader.classList.add('hidden');

    appendImages(data.hits);
    if (currentPage * 15 >= data.totalHits) {
      loadMoreBtn.classList.add('hidden');
      iziToast.error({
        title: 'Error',
        message: "We're sorry, but you've reached the end of search results.",
      });
    }

    smoothScroll(gallery);
  } catch (error) {
    iziToast.error({ title: 'Error', message: error.message });
    loader.classList.add('hidden');
  }
});

function smoothScroll(element) {
  const { height: cardHeight } =
    element.firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
