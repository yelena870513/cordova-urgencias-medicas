import MultimediaClient from './MultimediaClient';
import QuestionClient from './QuestionClient';
export default {
  modules: {
    navigator: {
      strict: true,
      namespaced: true,
      state: {
        stack: [],
        options: {}
      },
      mutations: {
        push(state, page) {
          state.stack.push(page);
        },
        pop(state) {
          if (state.stack.length > 1) {
            state.stack.pop();
          }
        },
        replace(state, page) {
          state.stack.pop();
          state.stack.push(page);
        },
        reset(state, page) {
          state.stack = [page || state.stack[0]];
        },
        options(state, newOptions = {}) {
          state.options = newOptions;
        }
      }
    },

    splitter: {
      strict: true,
      namespaced: true,
      state: {
        open: false
      },
      mutations: {
        toggle(state, shouldOpen) {
          if (typeof shouldOpen === 'boolean') {
            state.open = shouldOpen;
          } else {
            state.open = !state.open;
          }
        }
      }
    },

    tabbar: {
      strict: true,
      namespaced: true,
      state: {
        index: 0
      },
      mutations: {
        set(state, index) {
          state.index = index;
        }
      }
    },

    multimedia:{
      strict: true,
      namespaced: true,
      state:{
        contenido:[],
        mContenido:[],
        tema:[],
        creditos:[],
        reader:{},
        topic:{},
        searchMode:false,
        searchTerm:'',
        questions:[]
      },
      mutations:{

      },
      actions:{
        getContent({state,commit}){
          return MultimediaClient.get()
              .then((response)=>{
                state.contenido = response.data.contenido;
                state.mContenido = Object.assign({},response.data.contenido);
                state.tema = response.data.tema;
                state.creditos = response.data.creditos;
              }).catch(e=>alert(JSON.stringify(e)))
        },
        getQuestion({state,commit}){
          return QuestionClient.get()
              .then((response)=>{
                state.questions = response.data.preguntas;

              })
              .catch(e=>alert(JSON.stringify(e)))
        },
        setReader({state,commit},reader){
          state.reader = reader;
        },
        setTopic({state,commit},topic){
          state.topic = topic;
        },
        setSearchMode({state,commit},mode){
          state.searchMode = mode;
        },
        setSearchTerm({state,commit},term){
          state.searchTerm = term;
        }
      },
      getters:{
        contenido: state=>state.contenido,
        mContenido: state=>state.mContenido,
        tema: state=>state.tema,
        creditos: state=>state.creditos,
        reader:state => state.reader,
        topic:state => state.topic,
        searchMode:state => state.searchMode,
        searchTerm:state => state.searchTerm,
        questions:state => state.questions
      }
    }
  }
};
