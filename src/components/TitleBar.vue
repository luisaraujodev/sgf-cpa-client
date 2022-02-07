<template>
  <div class="titlebar">
    <div class="titlebar-menu">
      <img src="../assets/logo.png" alt="" />
      <nav @click="aciveMenu = true">
        <ul :active="aciveMenu">
          <li
            v-for="(menu, idx) in listMenu"
            :key="menu.label"
            :select="activeMenuItem == idx"
            @mouseover="activeMenuItem = idx"
          >
            <a :title="menu.label" target="_blank" rel="noopener"
              >{{ menu.label }}
              <div class="dropdown-container dropdown-menu" v-if="menu.submenu">
                <li v-for="submenu in menu.submenu" :key="submenu.label">
                  <a
                    :title="submenu.label"
                    target="_blank"
                    rel="noopener"
                    @click="submenu.click"
                    >{{ submenu.label || submenu.role }}
                    <span>{{ submenu.accelerator }}</span>
                    <div
                      class="icon"
                      dropdownControl="arrow"
                      @click="windowsActionMinimize"
                      v-if="submenu.submenu"
                    >
                      <i></i>
                    </div>
                    <div
                      class="dropdown-container dropdown-subMenu"
                      v-if="submenu.submenu"
                    >
                      <li v-for="sub in submenu.submenu" :key="sub.label">
                        <a
                          :title="sub.label"
                          target="_blank"
                          rel="noopener"
                          @click="sub.click"
                          >{{ sub.label || sub.role }}
                          <span>{{ sub.accelerator }}</span>
                        </a>
                      </li>
                    </div>
                  </a>
                </li>
              </div>
            </a>
          </li>
        </ul>
      </nav>
    </div>
    <div class="titlebar-title">{{ title }}</div>
    <div class="titlebar-windowsControl">
      <div class="titlebar-ln"></div>
      <div
        class="titlebar-icon"
        windowsControl="minimize"
        @click="windowsActionMinimize"
      >
        <i></i>
      </div>
      <div
        class="titlebar-icon"
        windowsControl="maximize"
        @click="windowsActionMaximize"
      >
        <i></i>
      </div>
      <div
        class="titlebar-icon"
        windowsControl="close"
        @click="windowsActionClose"
      >
        <i></i>
      </div>
    </div>
    <div
      class="background-menu"
      @click="aciveMenu = false"
      v-if="aciveMenu"
    ></div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { MenuItemConstructorOptions } from "electron";

@Options({
  data() {
    return {
      title: "",
      listMenu: [],
      aciveMenu: false,
      activeMenuItem: 0,
    };
  },
  created() {
    this.title = document.title;
    console.log((window as any).remote.getMenu());
    let newMenu = (window as any).remote.getMenu();
    newMenu.map((i: any) => {
      if (i.submenu) {
        i.submenu.map((e: any) => {
          if (e.accelerator) {
            e.accelerator = String(e.accelerator).replace(
              "CommandOrControl",
              "Ctrl"
            );
          }
        });
      }
    });
    this.listMenu = newMenu;
  },
  methods: {
    windowsActionMinimize() {
      (window as any).remote.minimize();
    },
    windowsActionMaximize() {
      (window as any).remote.maximize();
    },
    windowsActionClose() {
      (window as any).remote.close();
    },
  },
})
export default class Menu extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.titlebar {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 32px;
  justify-content: space-between;
  background-color: var(--green);
  z-index: 99;
  -webkit-app-region: drag;
}

[theme="dark"] .titlebar {
  background-color: var(--th-background);
}

.titlebar > .titlebar-menu {
  display: flex;
  flex-direction: row;
  -webkit-app-region: no-drag;

  nav {
    display: flex;
    align-items: center;
    margin: 0;
    padding: 0;
  }

  img {
    width: 28px;
    height: 28px;
  }

  ul {
    display: flex;
    flex-direction: row;
    list-style-type: none;
    padding: 0 16px;
    margin: 0;
  }

  li {
    display: flex;
    flex-direction: column;
    cursor: pointer;
    z-index: 9;
  }

  a {
    justify-content: space-between;
    background-color: rgb(0, 0, 0, 0);
    border-radius: 4px;
    width: 100%;
    height: auto;
    padding: 4px 10px 4px 10px;
    text-decoration: none;
    font-weight: 500;
    font-size: var(--size-medium);
    color: var(--white);
    position: relative;
    transition: color 0.2s, background-color 0.2s;
  }

  span {
    opacity: 0.65;
  }

  .dropdown-container {
    flex-direction: column;
    position: absolute;
    border: 1px solid;
    border-color: var(--th-border);
    min-width: 180px;
    padding: 1px 0;
    margin-top: 8px;
    margin-left: -10px;
    background-color: var(--th-background);
    z-index: 2;
    transition: display 0.2s;

    a {
      display: flex;
      flex-direction: row;
      align-items: center;
      color: var(--th-text-df);
    }

    .icon {
      display: flex;
      width: 8px;
      height: 8px;

      i {
        height: 100%;
        width: 100%;
        background-color: var(--th-text-df);
      }
    }

    .icon[dropdownControl="arrow"] i {
      mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 292.362 292.362'%3E%3Cg%3E%3Cpath d='M286.935,69.377c-3.614-3.617-7.898-5.424-12.848-5.424H18.274c-4.952,0-9.233,1.807-12.85,5.424 C1.807,72.998,0,77.279,0,82.228c0,4.948,1.807,9.229,5.424,12.847l127.907,127.907c3.621,3.617,7.902,5.428,12.85,5.428 s9.233-1.811,12.847-5.428L286.935,95.074c3.613-3.617,5.427-7.898,5.427-12.847C292.362,77.279,290.548,72.998,286.935,69.377z'/%3E%3C/g%3E%3C/svg%3E")
        no-repeat 50% 50%;
      transform: rotate(270deg);
    }
  }

  .dropdown-menu {
    display: none;
  }

  .dropdown-subMenu {
    display: none;
    margin-top: 18%;
    margin-left: 90%;
  }

  ul[active="true"] li[select="true"] {
    > a {
      color: #fff;
      background-color: #1a8d5f;
    }

    .dropdown-menu {
      display: flex;
      transition: all 0.2s;

      a {
        border-radius: 0;
      }
    }
  }

  .dropdown-menu li:hover {
    > a {
      color: var(--white);
      background-color: #1a8d5f;
    }

    span {
      opacity: 1;
    }

    .icon i{
      background-color: var(--white);
    }

    .dropdown-subMenu {
      display: flex;
      transition: all 0.2s;

      a {
        border-radius: 0;
      }
    }
  }
}

.titlebar-title {
  font-size: var(--size-normal);
  font-weight: 600;
  color: var(--white);
}

.titlebar-windowsControl {
  display: flex;
  flex-direction: row;
  width: 120px;
  height: 32px;
  -webkit-app-region: no-drag;

  .titlebar-icon {
    display: flex;
    height: 100%;
    width: 42px;

    i {
      height: 100%;
      width: 100%;
      background-color: #fff;
    }
  }

  .titlebar-icon:not([windowsControl="close"]):hover {
    background-color: var(--th-hover);
  }

  .titlebar-icon[windowsControl="close"]:hover {
    background-color: var(--hover-red);
  }

  .titlebar-icon[windowsControl="minimize"] i {
    -webkit-mask: url("data:image/svg+xml;charset=utf-8,%3Csvg width='11' height='11' viewBox='0 0 11 11' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 4.399V5.5H0V4.399h11z' fill='%23000'/%3E%3C/svg%3E")
      no-repeat 50% 50%;
    mask: url("data:image/svg+xml;charset=utf-8,%3Csvg width='11' height='11' viewBox='0 0 11 11' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 4.399V5.5H0V4.399h11z' fill='%23000'/%3E%3C/svg%3E")
      no-repeat 50% 50%;
  }

  .titlebar-icon[windowsControl="unmaximize"] i {
    -webkit-mask: url("data:image/svg+xml;charset=utf-8,%3Csvg width='11' height='11' viewBox='0 0 11 11' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 8.798H8.798V11H0V2.202h2.202V0H11v8.798zm-3.298-5.5h-6.6v6.6h6.6v-6.6zM9.9 1.1H3.298v1.101h5.5v5.5h1.1v-6.6z' fill='%23000'/%3E%3C/svg%3E")
      no-repeat 50% 50%;
    mask: url("data:image/svg+xml;charset=utf-8,%3Csvg width='11' height='11' viewBox='0 0 11 11' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 8.798H8.798V11H0V2.202h2.202V0H11v8.798zm-3.298-5.5h-6.6v6.6h6.6v-6.6zM9.9 1.1H3.298v1.101h5.5v5.5h1.1v-6.6z' fill='%23000'/%3E%3C/svg%3E")
      no-repeat 50% 50%;
  }

  .titlebar-icon[windowsControl="maximize"] i {
    -webkit-mask: url("data:image/svg+xml;charset=utf-8,%3Csvg width='11' height='11' viewBox='0 0 11 11' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 0v11H0V0h11zM9.899 1.101H1.1V9.9h8.8V1.1z' fill='%23000'/%3E%3C/svg%3E")
      no-repeat 50% 50%;
    mask: url("data:image/svg+xml;charset=utf-8,%3Csvg width='11' height='11' viewBox='0 0 11 11' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 0v11H0V0h11zM9.899 1.101H1.1V9.9h8.8V1.1z' fill='%23000'/%3E%3C/svg%3E")
      no-repeat 50% 50%;
  }

  .titlebar-icon[windowsControl="close"] i {
    -webkit-mask: url("data:image/svg+xml;charset=utf-8,%3Csvg width='11' height='11' viewBox='0 0 11 11' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6.279 5.5L11 10.221l-.779.779L5.5 6.279.779 11 0 10.221 4.721 5.5 0 .779.779 0 5.5 4.721 10.221 0 11 .779 6.279 5.5z' fill='%23000'/%3E%3C/svg%3E")
      no-repeat 50% 50%;
    mask: url("data:image/svg+xml;charset=utf-8,%3Csvg width='11' height='11' viewBox='0 0 11 11' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6.279 5.5L11 10.221l-.779.779L5.5 6.279.779 11 0 10.221 4.721 5.5 0 .779.779 0 5.5 4.721 10.221 0 11 .779 6.279 5.5z' fill='%23000'/%3E%3C/svg%3E")
      no-repeat 50% 50%;
  }
}

.background-menu {
  background-color: rgb(0, 0, 0, 0);
  position: absolute;
  width: 100%;
  height: 100%;
  top: 32px;
  left: 0;
  z-index: 1;
}
</style>
