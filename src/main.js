import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';
import 'izitoast/dist/css/iziToast.min.css';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { createGalleryCardTemplate } from './js/render-functions';
import { fetchPhotosByQuery } from './js/pixabay-api';

const searchFormEl = document.querySelector('.js-search-form');
const galleryEl = document.querySelector('.js-gallery');
const loadMoreBtn = document.querySelector('.js-load-more');
const loader = document.querySelector('.loader');

let searchQuery = '';
let page = 1;
const perPage = 15;
let totalHits = 0;
let gallery = new SimpleLightbox('.js-gallery a', {
  captionDelay: 300,
  captionsData: 'alt',
});

// Hide Load More button initially
loadMoreBtn.style.display = 'none';

const onSearchFormSubmit = async event => {
  event.preventDefault();
  
  searchQuery = event.currentTarget.elements.user_query.value.trim();
  if (searchQuery === '') {
    iziToast.error({
      message: 'Please enter your request',
      position: 'topRight',
    });
    return;
  }

  galleryEl.innerHTML = ''; // Clear previous results
  page = 1; // Reset page number
  totalHits = 0; // Reset total hits
  loadMoreBtn.style.display = 'none';
  
  await fetchImages();
};

const fetchImages = async () => {
  try {
    loader.classList.remove('is-hidden');
    const data = await fetchPhotosByQuery(searchQuery, page, perPage);

    if (data.totalHits === 0) {
      iziToast.error({
        message: 'Sorry, there are no images matching your search query.',
        position: 'topRight',
      });
      return;
    }

    totalHits = data.totalHits;
    const galleryTemplate = data.hits.map(el => createGalleryCardTemplate(el)).join('');
    galleryEl.insertAdjacentHTML('beforeend', galleryTemplate);
    gallery.refresh();

    // Show Load More button if there are more images to fetch
    if (page * perPage < totalHits) {
      loadMoreBtn.style.display = 'block';
    } else {
      loadMoreBtn.style.display = 'none';
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }

    page += 1;
    smoothScroll();
  } catch (err) {
    iziToast.error({
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
    });
  } finally {
    loader.classList.add('is-hidden');
  }
};

const smoothScroll = () => {
  const cardHeight = document.querySelector('.gallery-card').getBoundingClientRect().height;
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
};

// Event Listeners
searchFormEl.addEventListener('submit', onSearchFormSubmit);
loadMoreBtn.addEventListener('click', fetchImages);
