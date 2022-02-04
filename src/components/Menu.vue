<template>
  <main>
    <ul>
      <li v-for="menu in listMenu" :key="menu.name">
        <a
          :href="menu.url"
          :title="menu.title"
          target="_blank"
          rel="noopener"
          >{{ menu.name }}</a
        >
      </li>
    </ul>
  </main>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { typeMenu } from "../types/menu";
import populationMenu from "../data/GetMenuData.json";
@Options({
  data() {
    return {
      listMenu: [] as typeMenu[],
    };
  },
  created() {
    this.listMenu = populationMenu;
    console.log(populationMenu);
  },
})
export default class Menu extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
main {
  display: flex;
  flex-direction: column;
}

ul {
  display: flex;
  flex-direction: column;
  list-style-type: none;
  padding: 0 16px;
  margin: 0;
}

li {
  display: flex;
  flex-direction: column;
  margin: 4px 0;
  cursor: pointer;
  z-index: 9;
}

a {
  justify-content: left;
  background-color: var(--th-background);
  border-radius: 4px;
  width: 100%;
  padding: 10px 10px;
  text-decoration: none;
  font-weight: 500;
  font-size: var(--size-normal);
  color: var(--th-text-df);
  transition: color 0.2s, background-color 0.2s;
}

.dropdown-menu {
  display: none;
  z-index: 9;
  margin-left: 10px;
  padding-right: 0;
  transition: display 0.2s;
}

li:hover {
  > a {
    color: #fff;
    background-color: #1a8d5f;
  }
  > .dropdown-menu {
    display: flex;
    transition: all 0.2s;
  }
}
</style>
