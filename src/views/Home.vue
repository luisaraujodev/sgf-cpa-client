<template>
  <div class="container">
    <header>header</header>
    <nav style="width: 240px;"><Menu/></nav>
    <main>main</main>
    <footer>Footer</footer>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component"
import Menu from "../components/Menu.vue"

@Options({
  components: {
    Menu
  }
})
export default class Home extends Vue {}
</script>

<style lang="scss" scoped>
.container {
  display: grid;
  width: 100%;
  height: 100%;
  grid-template:
    "head head" 42px
    "nav main" 1fr
    "nav foot" 30px
    / auto 1fr;

  >header {
    grid-area: head;
  }

  >nav {
    background-color: var(--th-background);
    grid-area: nav;
    z-index: 2;
    border-right: 1px solid;
    border-color: var(--th-border);
  }

  >main {
    grid-area: main;
    overflow: hidden;
  }

  >footer {
    grid-area: foot;
  }
}
</style>
