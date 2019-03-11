import app from './js/app';
import './scss/index.scss';

const element = document.querySelector('#app');

const wrapper = document.createElement('div');
wrapper.classList.add('card-wrapper');

element.appendChild(wrapper);

app.GetData(wrapper,element);

