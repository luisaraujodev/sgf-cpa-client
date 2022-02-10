<template>
  <div class="container-tabControl">
    <div class="tabs">
      <div
        class="tab-item"
        v-for="(tabs, idx) in listTabs"
        :key="idx"
        :select="selectTab == tabs.id"
        :title="tabs.title"
      >
        <div class="tab-name" @click="selectTab = tabs.id">
          <div class="icon-container" :icon="tabs.icon">
            <i></i>
          </div>
          <span>{{ tabs.name }}</span>
        </div>
        <div
          class="icon-container"
          icon="close"
          title="Fechar (Ctrl+W)"
          @click="closeTab(tabs.id)"
        >
          <i></i>
        </div>
      </div>
      <div class="tab-action" title="Nova Guia">
        <div class="icon-container" icon="add" @click="createTabStart">
          <i></i>
        </div>
      </div>
    </div>
    <div class="tab-navigate"></div>
    <component
      v-for="comp in listTabs"
      :key="comp.id"
      v-show="selectTab == comp.id"
      :is="comp.content"
      class="tab-page"
    >
    </component>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { shallowRef } from "vue";

import { v4 as uuidv4 } from "uuid";
import { typeTabs } from "../types/tabs";
import consultCandidates from "../views/About.vue";

@Options({
  components: {
    consultCandidates,
  },
  data() {
    return {
      listTabs: [] as typeTabs[],
      selectTab: "",
    };
  },
  created() {
    this.createTabStart();
  },
  methods: {
    createTabStart: function () {
      let tabs = this.listTabs as typeTabs[];
      this.selectTab = uuidv4();
      tabs.push({
        id: this.selectTab,
        name: "Consultar Candidatos",
        title: "Consultar Candidatos",
        icon: "home",
        url: "/consultar candidatos",
        content: shallowRef(consultCandidates),
      });
    },
    closeTab: function (idTab: string) {
      let tabLength = this.listTabs.length;
      if (tabLength > 1) {
        let idxRemover = this.listTabs.findIndex(
          (tab: typeTabs) => tab.id == idTab
        );
        idxRemover = idxRemover == 0 ? 1 : idxRemover - 1;
        this.listTabs = this.listTabs.filter(
          (tab: typeTabs) => tab.id != idTab
        );
        if (this.selectTab == idTab) {
          this.selectTab = this.listTabs[idxRemover].id;
        }
      }
    },
  },
})
export default class TabControl extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.container-tabControl {
  display: flex;
  flex-direction: column;
  height: 100%;

  .tab-navigate {
    width: 100%;
    height: 22px;
    background-color: var(--th-tab-navegate);
    border-top: 1px solid;
    border-bottom: 1px solid;
    border-color: var(--th-border);
    box-shadow: 0px 2px 4px rgb(0 0 0 / 10%);
  }
}

.tabs {
  display: flex;
  flex-direction: row;
  width: 100%;
  background-color: var(--th-tab-df);

  .tab-item {
    display: flex;
    align-items: center;
    width: 120px;
    min-width: min-content;
    height: 35px;
    border-right: 1px solid var(--th-tab-disable);
    border-bottom: 1px solid var(--th-border);
    margin-bottom: -1px;
    // padding: 0 10px;
    background-color: var(--th-tab-disable);
    opacity: 0.8;
    cursor: pointer;

    .tab-name {
      display: flex;
      align-items: center;
    }

    span {
      font-size: var(--size-medium);
      // color: var(--green);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .tab-action {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
}

.icon-container {
  display: flex;
  width: 22px;
  height: 22px;
  margin: 0 10px;
  i {
    height: 100%;
    width: 100%;
    background-color: var(--th-text-df);
  }
}

.icon-container[icon="close"] {
  padding: 4px;
  margin: 0 4px 0 2px;
  border-radius: 4px;
}

.icon-container[icon="close"]:hover {
  background-color: var(--th-hover);
}

.icon-container[icon="add"] {
  padding: 2px 2px 2px 1px;
  margin: 0 4px;
  border-radius: 4px;
  opacity: .8;
}

.icon-container[icon="add"]:hover {
  background-color: var(--th-hover);
}

.tab-item[select="true"] {
  background-color: var(--th-tab-navegate);
  border-right: 1px solid var(--th-border);
  border-bottom: 1px solid var(--th-tab-navegate);
  color: var(--green);
  opacity: 1;
}

.tab-item:not([select="true"]):hover {
  background-color: var(--th-hover);
}

.tab-page {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden scroll;
}
</style>
