<template>
    <v-ons-page>
        <v-ons-card>
            <v-ons-row>
                <ons-col><h1 class="c-title">Bibliografía</h1></ons-col>
            </v-ons-row>
            <v-ons-row>
                <v-ons-col>
                    <div class="contenido" v-html="texto"></div>
                </v-ons-col>
            </v-ons-row>
        </v-ons-card>
    </v-ons-page>
</template>

<script>
    import {mapGetters} from 'vuex';
    import _ from 'lodash';

    export default {
        name: "Bibliografia",
        data() {
            return {
                reader: null
            }
        },
        computed: {
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
                const pageElement = document.querySelector('.c-title');
                pageElement.scrollIntoView();

            },
            hideShowGoTopButton() {
                var toTopButton = document.querySelector("a");
                toTopButton.style.display = "none";
                document.querySelector('body').onscroll = function () {
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
                        return el.id === 30;
                    });
                }
            }
        }
    }
</script>

<style scoped>

</style>
