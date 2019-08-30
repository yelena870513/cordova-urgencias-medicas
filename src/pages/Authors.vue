<template>
    <v-ons-page>
        <v-ons-carousel fullscreen swipeable auto-scroll overscrollable
                        :index.sync="carouselIndex"
        >
            <v-ons-carousel-item v-for="(value, key) in autor" :key="key"
                                 class="carousel-item"
                                 :style="{ backgroundColor: '#eeeeee' }"
            >
                <v-ons-card>
                    <div class="title">
                        {{ value.name }}<br/>
                        <div class="description">
                            <div class="logo" :style="{ backgroundImage: './assets/images/'+value.pic }">
                                <img class="profile" :src="'./assets/images/'+value.pic"/>
                            </div>
                            <small>{{value.subject}}</small>
                        </div>
                    </div>
                    <div class="content">
                        <div v-html="value.body"></div>
                    </div>
                </v-ons-card>
            </v-ons-carousel-item>
        </v-ons-carousel>

        <div class="dots">
      <span v-for="dotIndex in Object.keys(autor).length" :key="dotIndex"
            @click="carouselIndex = dotIndex - 1"
      >
        {{ carouselIndex === dotIndex - 1 ? '\u25CF' : '\u25CB' }}
      </span>
        </div>

    </v-ons-page>
</template>

<script>
    import { mapGetters } from 'vuex';
    export default {
        name: "Authors",
        data() {
            return {
                carouselIndex: 0,
                items: {
                    gray: 'gray',
                    blue: '#085078',
                    dark: '#373B44',
                    orange: '#D38312'
                }
            };
        },
        computed:{
            autor(){
                return this['multimedia/creditos'].filter(f=>f.tipo==='autor');
            },
            ...mapGetters(['multimedia/creditos'])
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
        color: #000;
        position: absolute;
        bottom: 40px;
        left: 0;
        right: 0;
    }

    .dots > span {
        cursor: pointer;
    }

    .logo{
        width: 96px;
        height: 96px;
    }
    .profile {
        border-radius: 2px;
        width: 100%;
        height: 100%;
    }
</style>