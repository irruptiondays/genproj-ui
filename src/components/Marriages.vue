<template>

    <div class="container starter-template">
        <h1>Set Marriages</h1>

        <h2>Select Person</h2>
        <div class="display: inline-block;">
            <form>
                <select id="family-origin-ego" v-model="egoSelected">
                    <option value="0"></option>
                    <option v-for="p in displayPersons" :value="p.id">{{ p.printedName }}
                    </option>
                </select>
            </form>
            <div class="col-sm-offset-2 col-sm-10">
                <button type="submit" class="btn btn-primary" @click="getMarriages">Fetch Marriages
                </button>
            </div>
        </div>
        <br/>

        <div>
            <table class="table table-striped" v-if="egoMarriages && egoMarriages.length > 0">
                <thead>
                <tr>
                    <th>Spouse Name</th>
                    <th>Marriage Date</th>
                    <th>Most Recent</th>
                    <th></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="s in egoMarriages" :value="s.id">
                    <td>{{ s.spouse.lastName }}, {{ s.spouse.firstName }}</td>
                    <td>{{ s.date }}</td>
                    <td>{{ s.mostRecent ? s.mostRecent : false }}</td>
                    <td><span @click="updateMarriage(s)" class="click-edit-marriage">Edit</span></td>
                    <td><span @click="openDeleteMarriageWarning(s.id)" class="click-edit-marriage">Delete</span></td>
                </tr>
                </tbody>
            </table>
        </div>

        <div id="delete-marriage-confirm" v-if="deleteMarriageConfirm" class="alert alert-warning"><span><strong>Are you sure you want to delete this marriage?</strong></span>
            <span @click="deleteMarriage" class="click-edit-marriage">Yes</span>
            <span @click="resetDeleteMarriage" class="click-edit-marriage">No</span>
        </div>


        <br/>

        <h2>Add Marriage <input type="checkbox" v-model="addMarriage"></h2>
        <div v-if="addMarriage">
            <form>
                <select id="family-origin-spouse" v-model="spouseSelected">
                    <option value="0"></option>
                    <option v-for="p in displayPersons" :value="p.id">{{ p.printedName }}
                    </option>
                </select>
            </form>

            <div v-if="addMarriage">
                <label>Current Marriage? </label><input type="checkbox" v-model="selectedCurrentMarriage"><br/><br/>
            </div>

            <input type="checkbox" v-model="dateKnown">
            <div v-if="dateKnown">
                <input id="create-new-marriage-year" type="text" v-model="selectedYear"/>
                <select id="create-new-marriage-month" v-model="selectedMonth">
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
                <input id="create-new-marriage-day" type="text" v-model="selectedDay"/><br/><br/>
            </div>
            <br/>
            <div class="col-sm-offset-2 col-sm-10">
                <button type="submit"
                        class="btn btn-primary" @click="createMarriage">Create Marriage
                </button>
            </div>
            <br/>
        </div>

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
                egoSelected: 0,
                egoMarriages: [],
                spouseSelected: 0,
                addMarriage: false,
                selectedCurrentMarriage: false,
                selectedYear: 1900,
                selectedMonth: 0,
                selectedDay: 1,
                dateKnown: false,
                marriage: {},
                marriageId: 0,
                deleteMarriageConfirm: false,
                marriageToDelete: 0
            }
        },
        methods: {
            ...mapActions({
                fetchAllPersons: 'fetchAllPersons'
            }),
            getMarriages: function () {
                Vue.prototype.http.get('/api/person/marriage/' + this.egoSelected).then(marriages => {
                        this.egoMarriages = marriages.data;
                    },
                    error => {
                        console.log('getPersons Error ', error);
                    });
            },
            selectedPerson: function (evt) {
                if (evt) {
                    evt.preventDefault();
                }

                if (!this.egoSelected) {
                    return null;
                }


                var self = this;
                let personToPopulate = _.find(this.$store.getters.allPersons, function (person) {
                    return person.id === self.egoSelected;
                });

                if (!personToPopulate) {
                    Object.assign(this.$data, restResourceService.initialState());
                    return;
                }

                this.egoMarriages = this.getMarriages();
            },
            createMarriage: function () {
                var spouseA = this.getPersonById(this.egoSelected);
                var spouseB = this.getPersonById(this.spouseSelected);
                this.marriage.spouse1 = spouseA;
                this.marriage.spouse2 = spouseB;
                this.marriage.id = this.marriageId;
                if (this.dateKnown) {
                    this.marriage.date = restResourceService.dateToEpoch(this.selectedYear, this.selectedMonth, this.selectedDay);
                }
                this.marriage.mostRecent = this.selectedCurrentMarriage;

                var self = this;
                Vue.prototype.http.post('/api/person/marriage', self.marriage).then(newMarriage => {
                        self.resetScreen();
                    },
                    error => {
                        console.log('getPersons Error ', error);
                    });
            },
            getPersonById: function (personId) {
                return _.find(this.$store.getters.allPersons, function (person) {
                    return person.id === personId;
                });
            },
            updateMarriage: function (spouseObject) {
                this.addMarriage = true;
                this.spouseSelected = spouseObject.spouse.id;
                if (spouseObject.date) {
                    var dateToSet = restResourceService.epochToDate(spouseObject.date);
                    this.dateKnown = true;
                    this.selectedYear = dateToSet[0];
                    this.selectedMonth = dateToSet[1];
                    this.selectedDay = dateToSet[2];
                }
                this.selectedCurrentMarriage = spouseObject.mostRecent;
                this.marriageId = spouseObject.id;
            },
            openDeleteMarriageWarning: function (marriageId) {
                this.deleteMarriageConfirm = true
                this.marriageToDelete = marriageId;
            },
            deleteMarriage: function () {
                Vue.prototype.http.delete('/api/person/marriage/' + this.marriageToDelete).then(d => {
                        console.log('Marriage deleted');
                        this.resetDeleteMarriage();
                        this.resetScreen();
                    },
                    error => {
                        console.log('getPersons Error ', error);
                    });
            },
            resetDeleteMarriage: function () {
                this.deleteMarriageConfirm = false;
                this.marriageToDelete = 0;
            },
            resetScreen: function () {
                this.addMarriage = false;
                this.egoSelected = 0;
                this.spouseSelected = 0;
                this.dateKnown = false;
                this.selectedCurrentMarriage = false;
                this.selectedYear = 1900;
                this.selectedMonth = 0;
                this.selectedDay = 1;
                this.marriage.id = 0;
                this.egoMarriages = [];
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

    .click-edit-marriage {
        color: blue;
        cursor: pointer;
    }

    #delete-marriage-confirm {
        display: block;
    }

</style>