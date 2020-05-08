<template>
    <v-ons-page :style="swipePosition">
        <v-ons-tabbar
                position="top"
                swipeable
                :modifier="md ? 'autogrow white-content' : ''"
                :on-swipe="md ? onSwipe : null"
                :tabbar-style="swipeTheme"
                :tabs="tabs"
                :index.sync="cursor"

        ></v-ons-tabbar>
    </v-ons-page>
</template>

<script>
    // Just a linear interpolation formula
    import Glosario from "./Glosario.vue";
    import Bibliografia from "./Bibliografia.vue";
    import WrapTheme from "./WrapTheme.vue";

    const lerp = (x0, x1, t) => parseInt((1 - t) * x0 + t * x1, 10);
    // RGB colors
    const red = [244, 67, 54];
    const blue = [0, 58, 82];
    const purple = [103, 58, 183];

    export default {
        name: "ContentSelector",
        data() {
            return {
                shutUp: !this.md,
                showingTip: false,
                colors: blue,
                animationOptions: {},
                topPosition: 0,
                tabs: [
                    {
                        label: 'Temas',
                        page: WrapTheme,
                        theme: blue,
                        icon: null
                    },
                    {
                        label: 'Glosario',
                        page: Glosario,
                        theme: blue,
                        icon: null
                    },
                    {
                        label: 'Bibliografia',
                        page: Bibliografia,
                        theme: blue,
                        icon: null
                    }
                ],
                cursor: 0
            };
        },

        methods: {
            onSwipe(index, animationOptions) {
                // Apply the same transition as ons-tabbar
                this.animationOptions = animationOptions;

                // Interpolate colors and top position
                const a = Math.floor(index), b = Math.ceil(index), ratio = index % 1;
                this.colors = this.colors.map((c, i) => lerp(this.tabs[a].theme[i], this.tabs[b].theme[i], ratio));
                this.topPosition = lerp(this.tabs[a].top || 0, this.tabs[b].top || 0, ratio);
            },
            showTip(e, message) {
                if (!this.shutUp && !(e && e.swipe) && !this.showingTip) {
                    this.showingTip = true;
                    this.$ons.notification.toast({
                        message,
                        buttonLabel: 'Shut up!',
                        timeout: 2000
                    }).then(i => {
                        this.shutUp = i === 0;
                        this.showingTip = false;
                    });
                }
            }
        },

        computed: {
            title() {
                return this.md ? 'Contenidos' : this.tabs[this.cursor].label;
            },
            swipeTheme() {
                return this.md && {
                    backgroundColor: `rgb(${this.colors.join(',')})`,
                    transition: `all ${this.animationOptions.duration || 0}s ${this.animationOptions.timing || ''}`
                }
            },
            swipePosition() {
                return this.md && {
                    top: this.topPosition + 'px',
                    transition: `all ${this.animationOptions.duration || 0}s ${this.animationOptions.timing || ''}`
                }
            }
        }
    };
</script>

<style>
    /* Custom 'white-content' modifier */

    .page--material .toolbar--white-content__center,
    .page--material .toolbar-button--white-content,
    .page--material :checked + .tabbar--white-content__button {
        color: white;
    }

    .page--material .tabbar--white-content__button {
        color: rgba(255, 255, 255, 0.7);
    }

    .page--material .tabbar--white-content__border {
        background-color: white;
    }
</style>
