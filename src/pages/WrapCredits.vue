<template>
    <v-ons-page>
        <v-ons-row>
            <v-ons-col>
                <h2 class="center">Equipo de Desarrollo</h2>
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
                <h2 class="center">Crédito Institucional</h2>
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
        name: "WrapCredits",
        computed:{
            institucional(){
                return this['multimedia/creditos'].filter(f=>f.tipo==='institucional');
            },
            equipo(){
                return this['multimedia/creditos'].filter(f=>f.tipo==='equipo');
            },
            ...mapGetters(['multimedia/creditos'])
        }

    }
</script>

<style scoped>
h2.center {
    color: rgb(0, 58, 82) ;
    text-align: center;
}
</style>