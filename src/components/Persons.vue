<template>
    <div>
        <div id="get-all-persons-div" class="starter-template">
            <h1>Get all persons</h1>

            <form class="form-horizontal" id="get-person-form">
                <label class="col-sm-2 control-label">Display all persons</label>
                <div class="form-group">
                    <div class="col-sm-offset-2 col-sm-10">
                        <button type="submit" id="bth-search"
                                class="btn btn-primary btn-lg"
                                @click="getPatients">Submit
                        </button>
                    </div>
                </div>
            </form>

        </div>
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