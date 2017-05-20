<template>
    <div>
        <div id="get-all-persons-div" class="starter-template">
            <h1>Get all persons</h1>

            <div>
                <span v-for="p in allPersons">{{ p.lastName }}, {{ p.firstName }}, {{ p.middleNames }}</span><br/>
            </div>

            <form class="form-horizontal" id="get-person-form">
                <label class="col-sm-2 control-label">Display all persons</label>
                <div class="form-group">
                    <div class="col-sm-offset-2 col-sm-10"> <!--type="submit" id="bth-search"-->
                        <span class="" @click="getPersons">Submit
                        </span>
                    </div>
                </div>
            </form>

        </div>

    </div>
</template>

<script>
    import Vue from 'vue';
    export default {
        data() {
            return {
                allPersons: []
            }
        },
        methods: {
            getPersons: function () {
                Vue.prototype.http.get('/api/person/all').then(persons => {
                        console.log('getPersons!!! ', persons);
                        this.allPersons = persons.data;
                        console.log('allPersons: ', this.allPersons);
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