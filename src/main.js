import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import getImagesByQuery from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions';

const form = document.querySelector('.form');

form.addEventListener('submit', formSubmit);

function formSubmit(e) {
  e.preventDefault();

  const query = String(e.target.elements['search-text'].value.trim());
  if (!query) {
    return iziToast.error({
      icon: '',
      position: 'topRight',
      message: 'Please, enter your search query!',
      timeout: 5000,
      progressBar: false,
      close: false,
      messageColor: 'white',
    });
  }

  showLoader();
  getImagesByQuery(query)
    .then(res => {
      if (!res.length) {
        clearGallery();
        return iziToast.info({
          icon: '',
          position: 'topRight',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          timeout: 5000,
          progressBar: false,
          close: false,
          messageColor: 'white',
        });
      }
      createGallery(res);
      e.target.reset();
    })
    .catch(error => {
      clearGallery();

      return iziToast.error({
        icon: '',
        position: 'topRight',
        message:
          error.message || 'Something went wrong. Please try again later.',

        timeout: 5000,
        progressBar: false,
        close: false,
        messageColor: 'white',
      });
    })
    .finally(() => {
      hideLoader();
    });
}
