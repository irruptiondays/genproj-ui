<template>
  <div id="app">
    <div>
      <app-persons></app-persons>
    </div>
  </div>
</template>

<script>
    import Persons from './components/Persons.vue';

    export default {
        name: 'app',
        data() {
            return {}
        },
        components: {
            appPersons: Persons,
        }
    }
</script>

<style lang="scss">

</style>
