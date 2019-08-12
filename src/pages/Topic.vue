<template>
    <v-ons-page>
        <custom-toolbar v-bind="toolbarInfo"></custom-toolbar>
        <p class="intro">
            {{topic.titulo}}
            <br><br>
        </p>

        <v-ons-card v-for="t of topics"
                    :key="t.id"
                    @click="push(t)"
        >
            <div class="title">{{ t.titulo }}</div>
        </v-ons-card>
    </v-ons-page>
</template>

<script>
    import {  mapGetters, mapActions } from 'vuex';
    import Contenido from './Contenido.vue';
    export default {
        name: "Topic",
        computed:{
            topics(){
                const topic = this['multimedia/topic'];
                return Object.values(this['multimedia/mContenido']).filter(c=>{
                    return c.tema.id === topic.id;
                });
            },
            topic(){
              return   this['multimedia/topic'];
            },
            ...mapGetters(['multimedia/topic','multimedia/contenido','multimedia/mContenido'])
        },
        methods:{
            push(item){
                this['multimedia/setReader'](item);
                this.$store.commit('navigator/push', {
                    extends: Contenido,
                    data() {
                        return {
                            toolbarInfo: {
                                backLabel: 'Contenidos',
                                title: item.titulo
                            }
                        }
                    }
                });
            },
            ...mapActions(['multimedia/setReader'])
        }
    }
</script>

<style scoped>

</style>