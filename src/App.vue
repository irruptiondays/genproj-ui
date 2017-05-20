<template>
  <div id="app">
    <div>
      <appHeader></appHeader>
    </div>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
    import Persons from './components/Persons.vue';
    import Header from './components/Header.vue';

    export default {
        name: 'app',
        data() {
            return {}
        },
        components: {
            appPersons: Persons,
            appHeader: Header
        }
    }
</script>

<style lang="scss">

</style>
