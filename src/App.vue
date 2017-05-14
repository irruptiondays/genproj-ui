<template>
  <div id="app">
    <app-header></app-header>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
    import Header from './components/Header.vue';

    export default {
        name: 'app',
        data() {
            return {}
        },
        components: {
            appHeader: Header,
        }
    }
</script>

<style lang="scss">

</style>
