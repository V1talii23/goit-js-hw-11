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
    return iziToast.error(
      {
        icon: '',
        position: 'topRight',
        message: `Pleeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeaaaaaaaaaaaaaaaaaaaaaaaaase, do not try to enter "${query}", i know how to use trim()!`,
        timeout: 5000,
        progressBar: false,
        close: false,
        messageColor: 'white',
      },
      clearGallery()
    );
  }

  clearGallery();
  showLoader();

  getImagesByQuery(query)
    .then(res => {
      if (!res.length) {
        throw new Error(
          'Sorry, there are no images matching your search query. Please try again!'
        );
      }

      createGallery(res);
    })
    .catch(error => {
      console.log('error');

      return iziToast.error({
        icon: '',
        position: 'topRight',
        message: error.message,

        timeout: 5000,
        progressBar: false,
        close: false,
        messageColor: 'white',
      });
    })
    .finally(() => hideLoader(), e.target.reset());
}
