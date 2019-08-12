<template>
    <v-ons-page>
        <custom-toolbar v-bind="toolbarInfo"></custom-toolbar>

        <v-ons-carousel fullscreen swipeable auto-scroll overscrollable
                        :index.sync="carouselIndex"
        >
            <v-ons-carousel-item v-for="(question, key) in questions" :key="key"
                                 class="carousel-item"
                                 :style="{ backgroundColor: '#ffffff' }"
            >
                <v-ons-row>
                    <v-ons-col>
                        <v-ons-list v-if="question.type === 'radio'">
                            <v-ons-list-header>{{ question.header }}</v-ons-list-header>
                            <v-ons-list-item v-for="(ask, $index) in question.questionSet" :key="ask.id"
                                             tappable
                                             :modifier="($index === question.questionSet.length - 1) ? 'longdivider' : ''"
                            >
                                <label class="left">
                                    <v-ons-radio
                                            :input-id="'radio-' + $index"
                                            :value="ask.text"
                                            v-model="answer"
                                            @change="printAnswer()"

                                    >
                                    </v-ons-radio>
                                </label>
                                <label :for="'radio-' + $index" class="center">
                                    <span v-bind:class="{'success':ask.value && ask.text === answer, 'fail':!ask.value && ask.text === answer}">  {{ ask.text }}</span>
                                </label>
                            </v-ons-list-item>

                        </v-ons-list>
                        <v-ons-list v-show="question.type === 'write'">
                            <v-ons-list-header>{{ question.header }}</v-ons-list-header>
                            <v-ons-list-item :modifier="md ? 'nodivider' : ''">
                                <label class="center">
                                    <v-ons-input float maxlength="20"
                                                 placeholder="Respuesta"
                                                 v-model="textAnswer"
                                                 v-bind:class="{'success': checkQuestion(question) && textAnswer.length > 3, 'fail': !checkQuestion(question) && textAnswer.length > 3 }"
                                                 @keyup.enter="checkQuestion(question)"
                                    >
                                    </v-ons-input>
                                    <v-ons-icon icon="md-check green" class="list-item__icon" v-show="checkQuestion(question) && textAnswer.length > 3"></v-ons-icon>
                                    <v-ons-icon icon="fa-times fail" class="list-item__icon" v-show="!checkQuestion(question) && textAnswer.length > 3"></v-ons-icon>
                                </label>
                            </v-ons-list-item>
                        </v-ons-list>
                    </v-ons-col>
                </v-ons-row>
            </v-ons-carousel-item>
        </v-ons-carousel>
    </v-ons-page>
</template>

<script>
    import {mapGetters} from 'vuex';
    import _ from "lodash";


    export default {
        name: "Questionaire",
        data() {
            return {
                carouselIndex: 0,
                answer: '',
                textAnswer: ''
            };
        },
        computed: {
            questions() {
                return this['multimedia/questions'];
            },
            ...mapGetters(['multimedia/questions'])
        },
        methods: {
            printAnswer() {
                console.log(this.answer);
            },
            checkQuestion(question) {
                if (this.textAnswer.length > 3) {
                    const result = _.find(question.questionSet, q => {
                        return q.text.toLowerCase().indexOf(this.textAnswer.toLowerCase()) !== -1;
                    });
                   return !_.isNil(result);
                }
                return true;
            }
        }
    }
</script>

<style scoped>
    .carousel-item {
        display: flex;
        justify-content: space-around;
        align-items: center;
    }

    .color-tag {
        color: #fff;
        font-size: 48px;
        font-weight: bold;
        text-transform: uppercase;
    }

    .dots {
        text-align: center;
        font-size: 30px;
        color: #fff;
        position: absolute;
        bottom: 40px;
        left: 0;
        right: 0;
    }

    .dots > span {
        cursor: pointer;
    }

    .success {
        color: green;
    }

    .fail {
        color: red;
    }

    .fail .text-input--material{
        color:red;
        border: solid 1px red;
    }

    .success .text-input--material{
        color:green;
        border: solid 1px green;
    }
</style>