<template>
    <div id="get-all-persons-div" class="starter-template container">
        <h1>List all persons</h1>

        <div>
            <table class="table">
                <thead>
                <tr>
                    <td>Name</td>
                    <td>DOB</td>
                    <td>Birthplace</td>
                    <td>Died</td>
                    <td>Father</td>
                    <td>Mother</td>
                </tr>
                </thead>
                <tbody>
                <tr v-for="p in displayPersons">
                    <td>{{ p.printedName }}</td>
                    <td>{{ p.birthdate | dateFormat }}</td>
                    <td>{{ p.birthplace }}</td>
                    <td>{{ p.deathdate | dateFormat}}</td>
                    <td>{{ p.father ? p.father.printedName : '' }}</td>
                    <td>{{ p.mother ? p.mother.printedName : '' }}</td>
                    <td></td>
                </tr>
                </tbody>
            </table>
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
    import {mapActions} from 'vuex';
    export default {
        data() {
            return {}
        },
        methods: {
            ...mapActions({
                fetchAllPersons: 'fetchAllPersons'
            })
        },
        filters: {
            dateFormat(value) {
                if (value) {
                    return moment(value).format('YYYY/MM/DD');
                } else {
                    return '';
                }
            }
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