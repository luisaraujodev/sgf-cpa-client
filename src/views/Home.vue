<template>
  <div class="container">
    <header><TitleBar /></header>
    <nav><Menu /></nav>
    <main><TabControl /></main>
    <footer>Footer</footer>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Menu from "../components/Menu.vue";
import TitleBar from "../components/TitleBar.vue";
import TabControl from "../components/TabControl.vue";
@Options({
  components: {
    TitleBar,
    Menu,
    TabControl,
  },
})
export default class Home extends Vue {}
</script>

<style lang="scss" scoped>
.container {
  display: grid;
  width: 100%;
  height: 100%;
  grid-template:
    "head head" auto
    "nav main" 1fr
    "nav foot" 30px
    / auto 1fr;

  > header {
    grid-area: head;
  }

  > nav {
    background-color: var(--th-background);
    grid-area: nav;
    border-right: 1px solid;
    border-color: var(--th-border);
  }

  > main {
    grid-area: main;
    overflow: hidden;
  }

  > footer {
    grid-area: foot;
    border-top: 1px solid var(--th-border);
  }
}
</style>
