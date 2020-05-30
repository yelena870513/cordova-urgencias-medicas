import axios from 'axios'

const QuestionClient = axios.create({
  baseURL: './assets/data/preguntas.json'
});

export default QuestionClient;
