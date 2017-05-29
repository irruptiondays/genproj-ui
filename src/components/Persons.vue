<template>
        <div id="get-all-persons-div" class="starter-template container">
            <h1>List all persons</h1>

            <div>
                <span v-for="p in displayPersons">{{ p.lastName }}, {{ p.firstName }} {{ p.middleNames }}<br /></span>
            </div>

            <form class="form-horizontal" id="get-person-form">
                <div class="form-group">
                    <div class="col-sm-offset-2 col-sm-10">
                        <button class="btn btn-primary" @click="fetchAllPersons" onclick="return false;">Refresh</button>
                    </div>
                </div>
            </form>

        </div>
</template>

<script>
    import Vue from 'vue';
    import { mapActions } from 'vuex';
    export default {
        data() {
            return {
                allPersons: this.$store.getters.allPersons
            }
        },
        methods: {
            ...mapActions({
                fetchAllPersons: 'fetchAllPersons'
            })
        },
        computed: {
            displayPersons() {
                return this.$store.getters.allPersons;
            }
        },
        created() {
            this.fetchAllPersons();
        }
    }
</script>

<style>

</style>