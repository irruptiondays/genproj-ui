<template>
    <div>
        <nav class="navbar navbar-inverse">
            <div class="container">
                <div class="navbar-header">
                    <span class="navbar-brand" id="home-div-link"
                          @click="goHome">Home</span>
                    <span class="navbar-brand" id="add-person-div-link"
                          @click="createPerson">Add Person</span>
                    <span class="navbar-brand" id="get-all-persons-div-link"
                          @click="getAllPersons">Get All Persons</span>
                    <span class="navbar-brand" id="set-family-origin-div-link"
                          @click="setFamilyOrigin">Set Family Origin</span>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
    export default {
        methods: {
            goHome() {
                this.$router.push('/');
            },
            getAllPersons() {
                this.$router.push('/persons-index');
            },
            createPerson() {
                this.$router.push('/add-person');
            },
            setFamilyOrigin() {
                this.$router.push('/set-family-origin');
            }
        }
    }
</script>

<style>

</style>