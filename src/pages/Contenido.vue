<template>
    <v-ons-page :infinite-scroll="dispatchScroll">
        <custom-toolbar v-bind="toolbarInfo"></custom-toolbar>
        <v-ons-card>
            <v-ons-row>
                <ons-col><h1 class="c-title">{{reader.titulo}}</h1></ons-col>
            </v-ons-row>
            <v-ons-row>
                <v-ons-col>
                    <div class="contenido" v-html="reader.texto"></div>
                </v-ons-col>
            </v-ons-row>
        </v-ons-card>
        <vue-easy-lightbox
                :visible="visible"
                :imgs="album"
                :index="index"
                @hide="handleHide"
        >
        <div toolbar></div>  
        </vue-easy-lightbox>
    </v-ons-page>
</template>

<script>
    import VueEasyLightbox from 'vue-easy-lightbox'
    import _ from 'lodash';
    export default {
        name: "Contenido",
        data() {
          return {
              album: [],
              visible: false,
              index: 0,
              hasScrolled: false
          }
        },
        computed:{
           reader(){
               return this.$store.getters['multimedia/reader'];
           }
        },
        mounted(){
            const  images = document.querySelectorAll('.contenido img');
            const self = this;
            for (const image of images) {
                let imageFilename = image.attributes.src.nodeValue.split('/').pop();
                image.attributes.src.nodeValue = './assets/images/app/' + imageFilename;
                image.style.width="100%";
                image.style.display="block";
                self.album.push({
                    src: image.src,
                    title: image.alt
                });
                this.$nextTick(()=>{
                    image.classList.add('content-image');
                    image.addEventListener('click', () => {
                        const index  = _.findIndex(self.album, (el) => {
                            return el.src === image.src;
                        })

                        if (index !== -1) {
                            self.showImg(index);
                        }

                    })
                });
            }
            const tables = document.querySelectorAll('table');
            for (const t of tables) {
                t.style.width = "100%";
            }
            this.$forceUpdate();
        },
        methods: {
            goTop() {
                const pageElement = document.querySelector('.c-title');
                pageElement.scrollIntoView();

            },
            hideShowGoTopButton() {
              var toTopButton = document.querySelector("a");
              toTopButton.style.display = "none";
              document.querySelector('body').onscroll = function(){
                if (window.innerHeight + 150 < document.body.offsetHeight) {
                  if (window.scrollY + window.innerHeight > document.body.offsetHeight - 150) {
                      toTopButton.style.display = "block";
                  } else {
                      toTopButton.style.display = "none";
                  }
                }
                
              };
            },
            showImg (index) {
                this.index = index;
                this.visible = true;
            },
            handleHide () {
                this.visible = false;
            },
            dispatchScroll() {
                this.hasScrolled = true;
            }
        },
        components: {
            VueEasyLightbox
        }
    }
</script>

<style scoped>
p > .content-image {
    width: 100%;
    display: block;
}
table {
        width: 100% !important;
}
h3 {
  font-size: 1.5em !important;
  color: #2bba9e;
  font-weight: bold;
}

h4 {
  font-size: 22px;
  color: #2bba9e;
  font-weight: 700;
}

.vel-toolbar {
  display: none;
}
</style>
