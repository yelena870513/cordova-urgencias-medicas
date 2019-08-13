import axios from 'axios';
const MultimediaClient = axios.create({
    baseURL:'./assets/data/multimedia.content.json'
});

export default MultimediaClient;