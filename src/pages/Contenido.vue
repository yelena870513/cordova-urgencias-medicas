<template>
    <v-ons-page>
        <custom-toolbar v-bind="toolbarInfo"></custom-toolbar>
        <v-ons-card>
            <v-ons-row>
                <ons-col><h1>{{reader.titulo}}</h1></ons-col>
            </v-ons-row>
            <v-ons-row>
                <v-ons-col>

                    <div class="contenido" v-html="reader.texto"></div>
                </v-ons-col>
            </v-ons-row>
        </v-ons-card>
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
                image.attributes.src.nodeValue = './assets/images/app/'+image.attributes.src.nodeValue;
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
        }
    }
</script>

<style scoped>
p > .content-image{
    width: 100%;
    display: block;
}
    table{
        width: 100% !important;
    }
</style>