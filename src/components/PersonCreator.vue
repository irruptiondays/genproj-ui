<template>
    <div id="add-a-person-div" class="starter-template container">
        <h1>Add a Person</h1>

        <form class="form-horizontal" id="create-new-person-form">
            <div class="form-group form-group-lg">

                <div class="col-sm-10">

                    Update existing person?
                    <input id="update-existing-person-checkbox" type="checkbox" v-model="existingPerson"/><br/><br/>
                    <div id="update-existing-person-chooser" v-if="existingPerson">
                        <form>
                            <select id="family-origin-ego" v-model="selectedPersonToUpdate">
                                <option value="0"></option>
                                <option v-for="p in displayPersons" :value="p.id">{{ p.printedName }}
                                </option>
                            </select>
                        </form>
                        <div class="col-sm-offset-2 col-sm-10">
                            <button type="submit"
                                    class="btn btn-primary" @click="selectedPerson">Fetch Person
                            </button>

                            <button type="submit"
                                    class="btn btn-primary" @click="resetWindow">Clear Fields
                            </button>

                            <button type="submit"
                                    class="btn btn-primary" @click="openDeletePersonWarning" onclick="return false;">Delete This Person
                            </button>
                        </div>
                    </div>

                    <div id="delete-person-confirm" v-if="deletePersonConfirm" class="alert alert-warning">
                        <span><strong>Are you sure you want to delete this person?</strong></span>
                        <span @click="deletePerson" class="click-edit-person">Yes</span>
                        <span @click="resetDeletePerson" class="click-edit-person">No</span>
                    </div>

                    <br/><br/>

                    First name:<br/>
                    <input id="create-new-person-first-name" type="text" name="first-name"
                           v-model="firstName"/><br/><br/>
                    Middle names:<br/>
                    <input id="create-new-person-middle-names" type="text" name="middle-names"
                           v-model="middleNames"/><br/><br/>
                    Last name:<br/>
                    <input id="create-new-person-last-name" type="text" name="last-name" v-model="lastName"/><br/><br/>
                    Suffix:<br/>
                    <input id="create-new-person-suffix" type="text" name="suffix" v-model="suffix"/><br/><br/>
                    Maiden name:<br/>
                    <input id="create-new-person-maiden-name" type="text" name="maiden-name" v-model="maidenName"/><br/><br/>


                    Gender:<br/><br/>
                    <select id="create-new-person-gender" v-model="gender">
                        <option value="MALE">Male</option>
                        <option value="FEMALE">Female</option>
                        <option value="UNKNOWN">Unknown</option>
                    </select>

                    <br/><br/>

                    Birthdate (YYYY MM DD) Known?:
                    <input id="create-new-person-birth-date-known" type="checkbox" checked="true"
                           value="birthdate-known" v-model="birthdateKnown"/>
                    <br/><br/>
                    <input id="create-new-person-birth-date-year" type="text" name="birth-date-year"
                           v-model="birthdateYear" v-if="birthdateKnown"/>

                    <select id="create-new-person-birth-date-month" v-model="birthdateMonth" v-if="birthdateKnown">
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

                    <input id="create-new-person-birth-date-day" type="text" name="birth-date-day"
                           v-model="birthdateDay" v-if="birthdateKnown"/><br/><br/>

                    Birthplace:<br/>
                    <input id="create-new-person-birth-place" type="text" name="birth-place" v-model="birthplace"/><br/><br/>

                    Died (YYYY MM DD) Known (Uncheck if not deceased)?:
                    <input id="create-new-person-death-date-known" type="checkbox" checked="true"
                           v-model="deathdateKnown"/>
                    <br/><br/>
                    <input id="create-new-person-death-date-year" type="text" name="death-date-year"
                           v-model="deathdateYear" v-if="deathdateKnown"/>
                    <select id="create-new-person-death-date-month" v-model="deathdateMonth" v-if="deathdateKnown">
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
                    <input id="create-new-person-death-date-day" type="text" name="death-date-day"
                           v-model="deathdateDay" v-if="deathdateKnown"/><br/><br/>

                    Residence:<br/>
                    <input id="create-new-person-death-place" type="text" name="death-place"
                           v-model="currentOrLateHome"/><br/><br/>

                    Family Branch:<br/><br/>
                    <select id="create-new-person-family-branch" v-model="familyBranch">
                        <option value="PATERNAL">Paternal</option>
                        <option value="MATERNAL">Maternal</option>
                        <option value="COMMON">Common</option>
                    </select>
                    <br/><br/>
                </div>
            </div>

            <div class="form-group">
                <div class="col-sm-offset-2 col-sm-10">
                    <button type="submit"
                            class="btn btn-primary" @click="savePerson">Submit
                    </button>
                </div>
            </div>
        </form>


    </div>

</template>

<script>
    import Vue from 'vue';
    import {mapActions} from 'vuex';
    import RestResource from '../services/person';
    const restResourceService = new RestResource();
    export default {
        data() {
            return {
                existingPerson: false,
                id: 0,
                firstName: '',
                middleNames: '',
                lastName: '',
                suffix: '',
                maidenName: '',
                gender: 'UNKNOWN',
                birthdateKnown: true,
                birthdateYear: 1900,
                birthdateMonth: 0,
                birthdateDay: 1,
                birthdate: 0,
                birthplace: '',
                deathdate: 0,
                deathdateKnown: false,
                deathdateYear: 1900,
                deathdateMonth: 0,
                deathdateDay: 1,
                currentOrLateHome: '',
                familyBranch: 'COMMON',
                selectedPersonToUpdate: null,
                deletePersonConfirm: false,
                personToDelete: 0
            }
        },
        components: {
            restResourceService: RestResource
        },
        computed: {
            displayPersons() {
                return this.$store.getters.allPersons;
            }
        },

        methods: {
            ...mapActions({
                fetchAllPersons: 'fetchAllPersons'
            }),
            openDeletePersonWarning: function (personId) {
                this.deletePersonConfirm = true
                this.personToDelete = personId;
            },
            selectedPerson: function (evt) {

                if (evt) {
                    evt.preventDefault();
                }

                if (!this.selectedPersonToUpdate) {
                    return null;
                }
                if (!this.existingPerson) {
                    return null;
                } else {
                    var self = this;
                    let personToPopulate = _.find(this.$store.getters.allPersons, function (person) {
                        return person.id === self.selectedPersonToUpdate;
                    });

                    if (!personToPopulate) {
                        Object.assign(this.$data, restResourceService.initialState());
                        return;
                    }

                    this.id = personToPopulate.id;
                    this.firstName = personToPopulate.firstName;
                    this.middleNames = personToPopulate.middleNames;
                    this.lastName = personToPopulate.lastName;
                    this.suffix = personToPopulate.suffix;
                    this.maidenName = personToPopulate.maidenName;
                    this.gender = personToPopulate.gender;

                    if (personToPopulate.birthdate) {
                        let birthdateArray = restResourceService.epochToDate(personToPopulate.birthdate);

                        if (birthdateArray) {
                            this.birthdateKnown = true;
                            this.birthdateYear = birthdateArray[0];
                            this.birthdateMonth = birthdateArray[1];
                            this.birthdateDay = birthdateArray[2];
                            this.birthplace = personToPopulate.birthplace;
                        } else {
                            this.birthdateKnown = false;
                        }
                    } else {
                        this.birthdateKnown = false;
                    }

                    if (personToPopulate.deathdate) {
                        let deathdateArray = restResourceService.epochToDate(personToPopulate.deathdate);

                        if (deathdateArray) {
                            this.deathdateKnown = true;
                            this.deathdateYear = deathdateArray[0];
                            this.deathdateMonth = deathdateArray[1];
                            this.deathdateDay = deathdateArray[2];
                        } else {
                            this.deathdateKnown = true;
                        }
                    } else {
                        this.deathdateKnown = false;
                    }

                    this.currentOrLateHome = personToPopulate.currentOrLateHome;
                    this.familyBranch = personToPopulate.familyBranch;
                    return personToPopulate;
                }
            },
            savePerson: function (evt) {
                evt.preventDefault();
                console.log(this.$data);
                this.birthdate = restResourceService.dateToEpoch(this.birthdateYear, this.birthdateMonth, this.birthdateDay);
                this.deathdate = restResourceService.dateToEpoch(this.deathdateYear, this.deathdateMonth, this.deathdateDay);

                if (!this.deathdateKnown) {
                    this.deathdate = null;
                }
                if (!this.birthdateKnown) {
                    this.birthdate = null;
                }
                Vue.prototype.http.post('/api/person', this.$data).then(result => {
                    console.log('person: ', result);
                    this.fetchAllPersons();
                    this.selectedPersonToUpdate = null;
                    this.resetWindow();
                }, error => {
                    console.log('Error: ', error);
                });
            },
            resetWindow: function () {
                Object.assign(this.$data, restResourceService.initialState());
            },
            deletePerson: function (evt) {
                if (evt) {
                    evt.preventDefault();
                }
                Vue.prototype.http.delete('/api/person/' + this.selectedPersonToUpdate).then(d => {
                        console.log('Person deleted');
                        this.fetchAllPersons();
                        this.resetWindow();
                        this.resetDeletePerson();
                    },
                    error => {
                        console.log('getPersons Error ', error);
                    });
            },
            resetDeletePerson: function () {
                this.deletePersonConfirm = false;
                this.personToDelete = 0;
            }
        },
        created() {
            this.fetchAllPersons();
        }
    }
</script>

<style>
    #create-new-person-form {
        margin-left: 10px;
    }
</style>