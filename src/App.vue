<template>
  <div id="nav">
    <div v-if="false">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
  </div>
  <router-view />
</template>

<style lang="scss">
@import "./assets/svg.css";
// Theme light
@mixin theme-light {
  --th-background: #fff;
  --th-body-bg: #fcfcfc;
  --th-text-df: #161f38;
  --th-border: #dbe5e2;
  --th-hover: rgba(0, 0, 0, 0.1);
  //tab
  --th-tab-df: #f3f3f3;
  --th-tab-disable: #ebebeb;
  --th-tab-navegate: #fcfcfc;
}

// Theme dark
@mixin theme-dark {
  --th-background: #242625;
  --th-body-bg: #181a19;
  --th-text-df: #eee;
  --th-border: #252525;
  --th-hover: rgba(255, 255, 255, 0.1);
  //tab
  --th-tab-df: #181818;
  --th-tab-disable: #1d1d1d;
  --th-tab-navegate: #202020;
}

:root {
  @include theme-light;
  --font-family: "Roboto", Helvetica, sans-serif;
  --green-active: #1a8d5f;
  --green: #168362;
  --white: #fff;
  --hover-red: rgba(232, 17, 35, 0.9);
  --hover-green: #e7f3ef;
  --size-small: 0.5rem;
  --size-medium: 0.875rem;
  --size-normal: 1rem;
  --size-large: 1.5rem;
  --size-xlarge: 2rem;
}

[theme="dark"] {
  @include theme-dark;
}

*,
::after,
::before {
  box-sizing: border-box;
}

button,
input,
optgroup,
select,
textarea {
  margin: 0;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
}

::-webkit-scrollbar {
  background-color: var(--th-background);
  width: 10px;
}

::-webkit-scrollbar-track {
  background-color: var(--th-background);
}

::-webkit-scrollbar-thumb {
  background-color: var(--th-hover);
  border-radius: 16px;
  border: 2px solid var(--th-background);
  transition: all 0.2s;
}

::-webkit-scrollbar-thumb:hover {
  background-color: var(--th-hover);
  transition: all 0.2s;
}

::-webkit-scrollbar-button {
  display: none;
}

body {
  margin: 0px;
  padding: 0px;
  font-family: var(--font-family);
  font-weight: normal;
  overflow: hidden;
  -webkit-font-smoothing: antialiased;
  background-color: var(--th-body-bg);
  color: var(--th-text-df);
  height: 100vh;
}

p {
  font-size: var(--size-normal);
}

h1 {
  font-size: var(--size-xlarge);
}

#app {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
