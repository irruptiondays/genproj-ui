<template>
    <div>
        <nav class="navbar navbar-inverse">
            <div class="container">
                <div class="navbar-header">
                    <ul class="nav nav-pills">
                        <li role="presentation"><router-link to="/">Home</router-link></li>
                        <li role="presentation"><router-link to="/add-person">Add Person</router-link></li>
                        <li role="presentation"><router-link to="/persons-index">Get All Persons</router-link></li>
                        <li role="presentation"><router-link to="/set-family-origin">Set Family Origin</router-link></li>
                        <li role="presentation"><router-link to="/set-marriages">Set Marriages</router-link></li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
    export default {
        methods: {
        }
    }
</script>

<style>

</style>