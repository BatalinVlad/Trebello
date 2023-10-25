
import axios from 'axios'
import SocketService from './SocketService';

export default {
  getRandomId,
  createUserIcon,
  getRandomColor,
  uploadImg,
  getImagesFromUnsplash,
  emitNotification
}

function getRandomId() {
  let letters = '1234567890poiiytreqwasdfghjklmnbvcxxssersgyushquiz';
  let id = '';
  for (let i = 0; i < 10; i++) {
    let ind = Math.floor(Math.random() * letters.length)
    id += letters[ind];
  }
  return id;
}

function createUserIcon(firstName, lastName) {
  let newIcon = firstName.charAt(0) + lastName.charAt(0)
  return (newIcon)
}

function getRandomColor() {
  const randomBrightColor = generateRandomBrightColor();
  const linearGradient = createLinearGradient(randomBrightColor, true);
  return linearGradient;
}

function generateRandomBrightColor() {
  const hue = Math.floor(Math.random() * 360);
  const saturation = 90 + Math.floor(Math.random() * 10);
  const lightness = 70 + Math.floor(Math.random() * 10);

  return {
    hue,
    saturation,
    lightness,
    toString: function () {
      return `hsl(${this.hue}, ${this.saturation}%, ${this.lightness}%)`;
    },
  };
}

function createLinearGradient(brightColor, moreBright = true) {
  const lightness = moreBright ? brightColor.lightness + 10 : brightColor.lightness - 10;
  const secondColor = `hsl(${brightColor.hue}, ${brightColor.saturation}%, ${lightness}%)`;
  return `linear-gradient(90deg, ${brightColor}, ${secondColor})`;
}










function uploadImg(file) {
  const CLOUD_NAME = 'dujlxvxxv'
  const PRESET_NAME = 'xi62wuas'
  const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', PRESET_NAME);

  return axios.post(UPLOAD_URL, formData)
    .then(res => res.data)
    .then(res => {
      return res.url
    })
    .catch(err => console.error(err))
}

function getImagesFromUnsplash(filterName, perpage) {
  const client_id = '9a992bf0a58ef7c4735758c98ec044dcdb524c2178db25d55cd773d7436f15d1'
  const URL = `https://api.unsplash.com/search/photos?per_page=${perpage}&query=${filterName}&client_id=${client_id}`
  return axios.get(URL)
    .then(res => res.data)
    .then(res => {
      return res.results
    })
    .catch(err => console.error(err))
}

function emitNotification(msg, type) {
  const notification = {
    message: msg,
    type: type,
    insert: "top",
    container: "bottom-right",
    animationIn: ["animated", "zoomIn"],
    animationOut: ["animated", "fadeOut"],
    dismiss: {
      duration: 5000,
    }
  };
  SocketService.emit('sendNotification', notification);
}

