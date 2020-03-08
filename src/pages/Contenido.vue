<template>
    <v-ons-page>
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
        <v-ons-fab modifier="material" background="rgba(0, 58, 82, 0.8)" position="bottom right" ripple @click.stop="goTop()">
            <v-ons-ripple  modifier="material" background="rgba(0, 58, 82, 0.8)" color="rgb(0, 58, 82)"></v-ons-ripple>
            <v-ons-icon icon="ion-chevron-up, material:md-arrow_upward" size="32px, material:24px" color="#ffffff"></v-ons-icon>
        </v-ons-fab>
    </v-ons-page>
</template>

<script>
    export default {
        name: "Contenido",
        computed:{
           reader(){
               return this.$store.getters['multimedia/reader'];
           }
        },
        mounted(){
            const  images = document.querySelectorAll('.contenido img');
            for (const image of images) {
                let imageFilename = image.attributes.src.nodeValue.split('/').pop();
                image.attributes.src.nodeValue = './assets/images/app/' + imageFilename;
                image.style.width="100%";
                image.style.display="block";
                this.$nextTick(()=>{
                    image.classList.add('content-image');
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
            }
        }
    }
</script>

<style scoped>
p > .content-image{
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
</style>
