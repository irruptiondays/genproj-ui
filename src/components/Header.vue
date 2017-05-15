<template>
    <div>
        <nav class="navbar navbar-inverse">
            <div class="container">
                <div class="navbar-header">
                    <span class="navbar-brand" id="add-person-div-link">Add Person</span>
                    <span class="navbar-brand" id="get-all-persons-div-link" @click="getAllPersons">Get All Persons</span>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
    export default {
        methods: {
            getAllPersons() {
                this.$router.push('/persons-index');
            }
        }
    }
</script>

<style>

</style>