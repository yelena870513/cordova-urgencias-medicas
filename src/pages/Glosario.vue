<template>
    <v-ons-page>
        <v-ons-card class="reader">
            <v-ons-row>
                <ons-col><h1 class="c-title">Glosario</h1></ons-col>
            </v-ons-row>
            <v-ons-row>
                <v-ons-col>
                    <div class="contenido" v-html="texto || ''"></div>
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
    import { mapGetters } from 'vuex';
    export default {
        name: "Glosario",
        data(){
          return {
              reader: null
          }
        },
        computed:{
            ...mapGetters(['multimedia/contenido']),
            texto() {
                if (!_.isNil(this.reader)) {
                    return this.reader.texto;
                }
                return '';
            },
            contenido() {
                return this['multimedia/contenido']
            }
        },
        methods: {
            goTop() {
                const pageElement = document.querySelector('.reader');
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
        },
        watch: {
            contenido(val) {
                if (val.length > 0) {
                    this.reader = _.find(val, function (el) {
                        return el.id === 22;
                    });
                }
            }
        }
    }
</script>

<style scoped>

</style>
