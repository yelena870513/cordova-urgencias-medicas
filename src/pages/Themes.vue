<template>
    <v-ons-page>
        <custom-toolbar v-bind="toolbarInfo"></custom-toolbar>
        <v-ons-row>
            <v-ons-col>
                <v-ons-card>
                    <v-ons-list>
                        <v-ons-list-item :modifier="md ? 'nodivider' : ''">
                            <label class="center">
                                <v-ons-input maxlength="20"
                                             placeholder="Buscar"
                                             v-model="search"
                                             @keyup="startSearch()"
                                >
                                </v-ons-input>
                            </label>
                        </v-ons-list-item>
                    </v-ons-list>
                </v-ons-card>
            </v-ons-col>
        </v-ons-row>
        <v-ons-row v-show="!searchMode">
            <v-ons-col>
                <v-ons-card v-for="t of temas"
                            :key="t.id"
                            @click="push(t)"
                >
                    <div class="title">
                        <div class="logo"><img :src="'./assets/images/logo/'+t.img"/></div>
                        {{ t.titulo }}
                    </div>
                    <div class="content">{{ t.subtitulo }}</div>
                </v-ons-card>
            </v-ons-col>
        </v-ons-row>
        <v-ons-row v-show="searchMode">
            <v-ons-col>
                <v-ons-card v-for="r of searchResults" @click="setContent(r)">
                    <div class="title"><h5>{{ r.titulo }}</h5></div>
                    <div class="content" v-html="resolveHtml(r.texto)"></div>
                </v-ons-card>
                <v-ons-card v-show="searchResults.length === 0">
                    <div class="title"><h5>No hubo resultados para su búsqueda</h5></div>
                </v-ons-card>
            </v-ons-col>
        </v-ons-row>
    </v-ons-page>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex';
    import Topic from './Topic.vue';
    import SearchView from './SearchView.vue';
    import _ from 'lodash';


    const Resolver = {
        filterItems(items, search) {
            let searchString = search.toLowerCase();
            searchString = search.replace(/a/gi, '[a|á]');
            searchString = search.replace(/e/gi, '[e|é]');
            searchString = search.replace(/i/gi, '[i|í]');
            searchString = search.replace(/o/gi, '[o|ó]');
            searchString = search.replace(/u/gi, '[u|ú]');
            const sItems = items.filter(f => {
                const temp = f.texto.toLowerCase().replace(/<\/?[^>]+(>|$)/g, '');
                console.log(temp);
                return temp.search(searchString) !== -1;
            });
            console.log(sItems);
            return sItems;
        }

    };

    export default {
        data() {
            return {
                search: '',
                results: []
            }
        },
        methods: {
            push(item) {
                this['multimedia/setTopic'](item);
                this.$store.commit('navigator/push', {
                    extends: Topic,
                    data() {
                        return {
                            toolbarInfo: {
                                backLabel: 'Temas',
                                title: 'Contenidos'
                            }
                        }
                    }
                });
            },
            setContent(item) {
                const contenido = this['multimedia/mContenido'];
                const reader = _.find(contenido, f => item.id === f.id);
                this['multimedia/setSearchTerm'](this.search);
                if (!_.isNil(reader)) {
                    this['multimedia/setReader'](reader);
                    this.$store.commit('navigator/push', {
                        extends: SearchView,
                        data() {
                            return {
                                toolbarInfo: {
                                    backLabel: 'Temas',
                                    title: 'Contenidos'
                                }
                            }
                        }
                    });
                } else {
                    this.$ons.notification.toast({
                        message: 'Ha ocurrido un error cargando el contenido',
                        timeout: 2000
                    })
                }

            },
            startSearch() {
                if (this.search.length > 3) {
                    this['multimedia/setSearchMode'](true);
                } else {
                    this['multimedia/setSearchMode'](false);
                }
            },
            resolveHtml(html) {
                const search = this.search;
                if (!search) {
                    return html;
                }
                let parsed = this.parseText(html).toLowerCase();
                let exp = search.toString().toLowerCase();
                exp = exp.replace(/a/gi, '[a|á]');
                exp = exp.replace(/e/gi, '[e|é]');
                exp = exp.replace(/i/gi, '[i|í]');
                exp = exp.replace(/o/gi, '[o|ó]');
                exp = exp.replace(/u/gi, '[u|ú]');
                const regEx = new RegExp(exp, 'gi');
                const pos = parsed.search(regEx);
                const wordLength = search.length;
                let ini = pos - 30;
                let fini = pos + wordLength + 100;
                let beforeSearch = '';
                if (ini < 0) {
                    ini = 0;
                    beforeSearch = parsed.slice(ini, pos);
                } else {
                    const test = parsed.slice(ini, pos);
                    const space = test.indexOf(' ');
                    let nextToSpace = 0;

                    if (space !== -1) {
                        nextToSpace = space + 1;
                    }

                    beforeSearch = test.substr(nextToSpace, test.length);

                }

                if (fini > parsed.length) {
                    fini = parsed.length;
                }

                const afterSearch = parsed.substring(pos + wordLength, fini);

                const dword = parsed.substr(pos, wordLength);

                let todo = beforeSearch + dword + afterSearch;


                let last = todo.substr(0, Math.min(todo.length, todo.lastIndexOf(' ')));

                last = last + ' ...';

                //todo remove html special chars on content
                todo = todo.replace(/<\/?[^>]+(>|$)/g, "");


                const res = last.replace(new RegExp(exp, 'gi'), '<span class="highlightedText badge red">$&</span>');

                return res;

            },
            parseText(html) {
                var doc = new DOMParser().parseFromString(html, 'text/html');
                return doc.body.textContent || "";
            },
            ...mapActions(['multimedia/setTopic', 'multimedia/setSearchMode', 'multimedia/setReader', 'multimedia/setSearchTerm'])
        },
        computed: {
            temas() {
                return this.$store.getters['multimedia/tema'].sort((a, b) => {
                    return a.orden - b.orden
                });
            },
            searchMode() {
                return this.$store.getters['multimedia/searchMode'];
            },
            searchResults() {
                const search = this.search.toLowerCase();
                if (search.length > 3) {
                    let mResults = Object.assign({}, Resolver.filterItems(this['multimedia/contenido'], search));
                    mResults = Object.values(mResults);
                    console.log(mResults);
                    return mResults;
                } else {
                    return this['multimedia/contenido'];
                }
            },
            ...mapGetters(['multimedia/topic', 'multimedia/contenido', 'multimedia/mContenido'])

        }
    }
</script>

<style scoped>
    .logo img {
        width: 50px;
        height: 50px;
        margin-left: 0.5rem;
        margin-right: 0.5rem;
    }

    .title {
        display: flex;
        flex-direction: row;
        align-content: center;
        align-items: center;
        justify-content: flex-start;
        font-size: 14px;
    }

    .text-input--material:focus {
        background-image: linear-gradient(rgb(0, 58, 82), rgb(0, 58, 82)), linear-gradient(to top, transparent 1px, #afafaf 1px);
        -webkit-animation: material-text-input-animate 0.3s forwards;
        animation: material-text-input-animate 0.3s forwards;
    }

    v-ons-input:focus {
        background-image: linear-gradient(rgb(0, 58, 82), rgb(0, 58, 82)), linear-gradient(to top, transparent 1px, #afafaf 1px);
        -webkit-animation: material-text-input-animate 0.3s forwards;
        animation: material-text-input-animate 0.3s forwards;
    }

    .highlightedText.badge.red {
        background-color: rgb(244, 67, 54);
        color: white;
    }
</style>
