<template>
    <v-ons-page>
        <custom-toolbar v-bind="toolbarInfo"></custom-toolbar>
        <v-ons-row>
            <v-ons-col>
                <h2>Equipo</h2>
            </v-ons-col>
        </v-ons-row>
        <v-ons-row>
            <v-ons-col>
                <v-ons-card v-for="t of equipo"
                            :key="t.id"
                >
                    <div class="title">{{ t.name }}</div>
                    <div class="content">{{ t.cargo }}</div>
                </v-ons-card>
            </v-ons-col>
        </v-ons-row>
        <v-ons-row>
            <v-ons-col>
                <h2>Autor</h2>
            </v-ons-col>
        </v-ons-row>
        <v-ons-row>
            <v-ons-col>
                <v-ons-card v-for="t of autores"
                            :key="t.id"
                >
                    <div class="title">{{ t.name }}</div>
                    <div class="content">{{ t.cargo }}</div>
                </v-ons-card>
            </v-ons-col>
        </v-ons-row>
        <v-ons-row>
            <v-ons-col>
                <h2>Institucional</h2>
            </v-ons-col>
        </v-ons-row>
        <v-ons-row>
            <v-ons-col>
                <v-ons-card v-for="t of institucional"
                            :key="t.id"
                >
                    <div class="title">{{ t.name }}</div>
                    <div class="content">{{ t.cargo }}</div>
                </v-ons-card>
            </v-ons-col>
        </v-ons-row>
    </v-ons-page>
</template>

<script>
    import { mapGetters } from 'vuex';
    export default {
        name: "Credits",
        computed:{
            institucional(){
                return this['multimedia/creditos'].filter(f=>f.tipo==='institucional');
            },
            equipo(){
                return this['multimedia/creditos'].filter(f=>f.tipo==='equipo');
            },
            autores(){
                return this['multimedia/creditos'].filter(f=>f.tipo==='autor');

            },
            ...mapGetters(['multimedia/creditos'])
        }

    }
</script>

<style scoped>

</style>