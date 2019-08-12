<template>
    <v-ons-page>
        <custom-toolbar v-bind="toolbarInfo"></custom-toolbar>
        <v-ons-card>
            <v-ons-row>
                <ons-col><h1>{{reader.titulo}}</h1></ons-col>
            </v-ons-row>
            <v-ons-row>
                <v-ons-col v-go-result="search">
                    <div v-html="searchFor(reader.texto)"></div>
                </v-ons-col>
            </v-ons-row>
        </v-ons-card>
    </v-ons-page>
</template>

<script>
    import {mapGetters} from 'vuex';
    import _ from 'lodash';
    export default {
        name: "SearchView",
        computed: {
            reader() {
                return this.$store.getters['multimedia/reader'];
            },
            search() {
                return this['multimedia/searchTerm'];
            },
            ...mapGetters(['multimedia/searchTerm'])
        },
        methods: {
            searchFor(html) {
                if (!html) {
                    return;
                }
                if (!this['multimedia/searchTerm']) {
                    return html;
                }
                let exp = this['multimedia/searchTerm'];

                exp = exp.replace(/a/gi, '[a|á]');
                exp = exp.replace(/e/gi, '[e|é]');
                exp = exp.replace(/i/gi, '[i|í]');
                exp = exp.replace(/o/gi, '[o|ó]');
                exp = exp.replace(/u/gi, '[u|ú]');

                /* case-insensitive search */

                const regEx = new RegExp(exp, 'gi');

                const full = html.replace(new RegExp(exp, 'gi'), '<span class="highlightedText badge red">$&</span>');

                return full;
            }
        },
        directives: {
            'go-result'(el, binding, vnode) {
                const refreshNodes=()=>{
                    const list = document.querySelectorAll('span.highlightedText');
                    const arr = Array.prototype.slice.call(list);
                    for (const a of arr) {
                        a.classList.remove('visited');
                    }
                };
                const handleClick = () => {
                    const value = binding.value;
                    if (_.isNil(value)) {
                        return;
                    }
                    const nodeList = document.querySelectorAll('span.highlightedText:not(.visited)');
                    const buffer = Array.prototype.slice.call(nodeList);
                    let len = buffer.length;
                    if (buffer.length > 0) {
                        window.scrollTo(buffer[0].offsetLeft, buffer[0].offsetTop);
                        buffer[0].scrollIntoView();
                        buffer[0].classList.add('visited');
                        len--;
                        if (len===0) {
                            refreshNodes();
                        }
                    }
                    else{
                        refreshNodes();
                    }
                };
                el.addEventListener('click', handleClick);

            }
        }
    }
</script>

<style lang="scss">
    .highlightedText.badge.red {
        background-color: rgb(244, 67, 54);
        color: white;
    }
</style>