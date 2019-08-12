<template>
    <v-ons-page>
        <custom-toolbar v-bind="toolbarInfo"></custom-toolbar>
        <v-ons-card>
            <v-ons-row>
                <ons-col><h1>{{reader.titulo}}</h1></ons-col>
            </v-ons-row>
            <v-ons-row>
                <v-ons-col>
                    <div v-html="reader.texto"></div>
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
        }
    }
</script>

<style scoped>

</style>