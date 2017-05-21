<template>
        <div id="get-all-persons-div" class="starter-template container">
            <h1>List all persons</h1>

            <div>
                <span v-for="p in allPersons">{{ p.lastName }}, {{ p.firstName }}, {{ p.middleNames }}<br /></span>
            </div>

            <form class="form-horizontal" id="get-person-form">
                <label class="col-sm-2 control-label">Display all persons</label>
                <div class="form-group">
                    <div class="col-sm-offset-2 col-sm-10">
                        <button class="" @click="getPersons">Refresh</button>
                    </div>
                </div>
            </form>

        </div>
</template>

<script>
    import Vue from 'vue';
    export default {
        data() {
            return {
                allPersons: this.getPersons()
            }
        },
        methods: {
            getPersons: function () {
                Vue.prototype.http.get('/api/person/all').then(persons => {
                        this.allPersons = persons.data;
                    },
                    error => {
                        console.log('getPersons Error ', error);
                    });
            }

        }
    }
</script>

<style>

</style>