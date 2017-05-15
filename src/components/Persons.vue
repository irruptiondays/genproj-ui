<template>
    <div>
        <nav class="navbar navbar-inverse">
            <div class="container">
                <div class="navbar-header">
                    <span class="navbar-brand" id="add-person-div-link"
                          @click="setTab('addAPersonTab')">Add Person</span>
                    <span class="navbar-brand" id="get-all-persons-div-link" @click="setTab('displayAllPersonsTab')">Get All Persons</span>
                </div>
            </div>
        </nav>
        <div id="get-all-persons-div" class="starter-template" v-if="currentPage === 'displayAllPersonsTab'">
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
        <div id="add-a-person-div" class="starter-template" v-if="currentPage === 'addAPersonTab'">
            <h1>Add a Person</h1>

            <div id="add-person-div" class="starter-template hidden">
                <h2>Create a person</h2>

                <form class="form-horizontal" id="create-new-person-form">
                    <div class="form-group form-group-lg">
                        <label class="col-sm-2 control-label">Username</label>
                        <div class="col-sm-10">

                            Update existing person?
                            <input id="update-existing-person-checkbox" type="checkbox"/><br/><br/>
                            <div id="update-existing-person-chooser">

                            </div>

                            First name:<br/>
                            <input id="create-new-person-first-name" type="text" name="first-name"/><br/>
                            Middle names:<br/>
                            <input id="create-new-person-middle-names" type="text" name="middle-names"/><br/>
                            Last name:<br/>
                            <input id="create-new-person-last-name" type="text" name="last-name"/><br/>
                            Suffix:<br/>
                            <input id="create-new-person-suffix" type="text" name="suffix"/><br/>
                            Maiden name:<br/>
                            <input id="create-new-person-maiden-name" type="text" name="maiden-name"/><br/>
                            Birthdate (YYYY MM DD) Known?:
                            <input id="create-new-person-birth-date-known" type="checkbox" checked="true"
                                   value="birthdate-known"/>
                            <br/>
                            <input id="create-new-person-birth-date-year" type="text" name="birth-date-year"/>
                            <select id="create-new-person-birth-date-month">
                                <option value="0">January</option>
                                <option value="1">February</option>
                                <option value="2">March</option>
                                <option value="3">April</option>
                                <option value="4">May</option>
                                <option value="5">June</option>
                                <option value="6">July</option>
                                <option value="7">August</option>
                                <option value="8">September</option>
                                <option value="9">October</option>
                                <option value="10">November</option>
                                <option value="11">December</option>
                            </select>
                            <input id="create-new-person-birth-date-day" type="text" name="birth-date-day"/><br/>


                            Died (YYYY MM DD) Known (Uncheck if not deceased)?:
                            <input id="create-new-person-death-date-known" type="checkbox" checked="true"/>
                            <br/>
                            <input id="create-new-person-death-date-year" type="text" name="death-date-year"/>
                            <select id="create-new-person-death-date-month">
                                <option value="0">January</option>
                                <option value="1">February</option>
                                <option value="2">March</option>
                                <option value="3">April</option>
                                <option value="4">May</option>
                                <option value="5">June</option>
                                <option value="6">July</option>
                                <option value="7">August</option>
                                <option value="8">September</option>
                                <option value="9">October</option>
                                <option value="10">November</option>
                                <option value="11">December</option>
                            </select>
                            <input id="create-new-person-death-date-day" type="text" name="death-date-day"/><br/>


                            Birthplace:<br/>
                            <input id="create-new-person-birth-place" type="text" name="birth-place"/><br/>
                            Deathdate:<br/>
                            <input id="create-new-person-death-date" type="text" name="death-date"/><br/>
                            Family Branch:<br/>
                            <select id="create-new-person-family-branch">
                                <option value="PATERNAL">Paternal</option>
                                <option value="MATERNAL">Maternal</option>
                                <option value="COMMON">Common</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-group">
                        <div class="col-sm-offset-2 col-sm-10">
                            <button type="submit"
                                    class="btn btn-primary btn-lg">Submit
                            </button>
                        </div>
                    </div>
                </form>

            </div>

        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    export default {
        data() {
            return {
                currentPage: 'displayAllPersonsTab',
                allPersons: []
            }
        },
        methods: {
            setTab: function (tab) {
                this.currentPage = tab;
            },
            getPersons: function () {
                Vue.prototype.http.get('/person/all').then(persons => {
                        console.log('getPersons!!! ', persons);
                        this.allPersons = persons.data;
                        console.log('allPersons: ', this.allPersons[0]);
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