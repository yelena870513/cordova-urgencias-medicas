<template>
  <v-ons-page :style="swipePosition">
    <custom-toolbar :style="swipeTheme" modifier="white-content">
      {{ title }}
     <!-- <v-ons-toolbar-button slot="right" modifier="white-content"
        @click="$store.commit('splitter/toggle');"
      >
        <v-ons-icon icon="ion-navicon, material:md-menu"></v-ons-icon>
      </v-ons-toolbar-button> -->
    </custom-toolbar>

    <v-ons-tabbar position="bottom"
      swipeable
      :modifier="md ? 'autogrow white-content' : ''"
      :on-swipe="md ? onSwipe : null"
      :tabbar-style="swipeTheme"
      :tabs="tabs"
      :index.sync="index"

    ></v-ons-tabbar>
  </v-ons-page>
</template>

<script>
import Inicio from './pages/Inicio.vue';
import WrapQuestionaire from './pages/WrapQuestionaire.vue';
import WrapCredits from './pages/WrapCredits.vue';
import WrapTheme from './pages/WrapTheme.vue';
import Authors from './pages/Authors.vue';
// Just a linear interpolation formula
const lerp = (x0, x1, t) => parseInt((1 - t) * x0 + t * x1, 10);
// RGB colors
const red = [244, 67, 54];
const blue = [0, 58, 82];
const purple = [103, 58, 183];

export default {
  data () {
    return {
      shutUp: !this.md,
      showingTip: false,
      colors: red,
      animationOptions: {},
      topPosition: 0,
      tabs: [
        {
          label: 'Inicio',
          icon: this.md ? 'md-home' : 'ion-home',
          page: Inicio,
          theme: blue
        },
        {
          label: 'Temas',
          icon: this.md ? 'md-book' : 'ion-ios-book-outline',
          page: WrapTheme,
          theme: blue
        },
        {
          label: 'Cuestionario',
          icon: this.md ? 'md-edit' : 'ion-edit',
          page: WrapQuestionaire,
          theme: blue
        },
        {
          label: 'Créditos',
          icon: this.md ? 'md-group-work' : 'ion-ios-list',
          page: WrapCredits,
          theme: blue
        },
        {
          label: 'Autores',
          icon: this.md ? 'md-accounts' : 'fa-fa-users',
          page: Authors,
          theme: blue
        }
      ]
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
    index: {
      get() {
        return this.$store.state.tabbar.index;
      },
      set(newValue) {
        this.$store.commit('tabbar/set', newValue)
      }
    },
    title() {
      return this.md ? 'Urgencias Médicas' : this.tabs[this.index].title || this.tabs[this.index].label;
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
