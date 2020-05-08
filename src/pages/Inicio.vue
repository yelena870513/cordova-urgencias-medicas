<template>
    <v-ons-page>
        <p class="intro justified">
            Una urgencia médica es una condición clínica que requiere de una actuación rápida, precisa, solidez del conocimiento teórico y la presencia de habilidades prácticas por parte del personal de atención.
            Es por ello que la asistencia médica en los servicios de urgencia constituye dentro del sistema de salud de cada país, una de las actividades de mayor complejidad. Es el resultado de la interacción de múltiples factores implicados en disponer de cobertura asistencial con elevada tecnología, que satisfaga la demanda por la morbilidad poblacional de una manera constante y continua.
            <br /><br />La atención al paciente grave requiere de competencia profesional. Sin embargo, es crucial que dicho personal disponga de un elevado nivel de recursos que complementen la actuación. Así será posible alcanzar la calidad de la atención que se ofrece, en situaciones en que el tiempo impone al médico la mayor celeridad y certeza.
            <br /><br />En múltiples ocasiones, producto del grosor del contenido que se debe memorizar en relación con los criterios de diagnóstico y conducta a seguir con las entidades a las cuales nos enfrentamos en nuestras guardias médicas, nos hemos encontrado ante la necesidad de una guía de referencia rápida, principalmente en el personal de poca experiencia.
            Por todo ello se hace necesario contar con un soporte digital que nos permita cumplir con mayor prontitud nuestra tarea.
        </p>
        <parallax :speed-factor="0.3" breakpoint="(min-width: 80px)">
            <img src="assets/images/parallax2.png" alt="urgencias">
        </parallax>
    </v-ons-page>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    import Parallax from 'vue-parallaxy'

    import  Themes  from './Themes.vue';
    import  Questionaire  from './Questionaire.vue';
    import  Credits  from './Credits.vue';
    export default {
        name: "Inicio",
        data(){
            return {
                pages: [
                    {
                        component: Themes,
                        label: 'Temas',
                        desc: 'Temas de urgencias.'
                    },
                    {
                        component: Questionaire,
                        label: 'Cuestionario',
                        desc: 'Ejercicios'
                    },
                    {
                        component: Credits,
                        label: 'Créditos Institucionales',
                        desc: 'Equipo y Autores'
                    }
                ]

            }
        },
        methods: {
            push(page, key) {
                this.$store.commit('navigator/push', {
                    extends: page,
                    data() {
                        return {
                            toolbarInfo: {
                                backLabel: 'Inicio',
                                title: key
                            }
                        }
                    }
                });
            }
            ,
            ...mapActions(['multimedia/getContent', 'multimedia/getQuestion'])
        },
        created() {
            this['multimedia/getContent']();
            this['multimedia/getQuestion']();
        },
        components: {
            Parallax
        }
    }
</script>

<style scoped lang="scss">
.intro{
    text-align: left;
    padding: .8rem;
}
</style>
