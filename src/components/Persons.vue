<template>
    <div>
        <div id="get-all-persons-div" class="starter-template">
            <h1>Get all persons</h1>

            <form class="form-horizontal" id="get-person-form">
                <label class="col-sm-2 control-label">Display all persons</label>
                <div class="form-group">
                    <div class="col-sm-offset-2 col-sm-10"> <!--type="submit" id="bth-search"-->
                        <span
                                class=""
                                @click="getPersons">Submit
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
        methods: {
            getPersons: function() {
                console.log('Vue.proto ', Vue.prototype);
                Vue.prototype.http.get('http://localhost:8081/person/all').then(persons => {
                    alert('getPersons!!! ' + persons);
                },
                error => {
                    alert('getPersons Error ' + error);
                });
            }

        }
    }
</script>

<style>

</style>