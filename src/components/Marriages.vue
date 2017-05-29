<template>

    <div class="container starter-template">
        <h1>Set Marriages</h1>

        <h2>Select Person</h2>
        <div class="display: inline-block;">
            <form>
                <select id="family-origin-ego" v-model="egoSelected">
                    <option value="0"></option>
                    <option v-for="p in allPersons" :value="p.id">{{ p.lastName }}, {{p.firstName }} {{
                        p.middleNames }}
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
                    <th></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="s in egoMarriages" :value="s.id">
                    <td>{{ s.spouse.lastName }}, {{ s.spouse.firstName }}</td>
                    <td>{{ s.date }}</td>
                    <td><span @click="updateMarriage(s)" class="click-edit-marriage">Edit</span></td>
                    <td>Delete</td>
                </tr>
                </tbody>
            </table>
        </div>

        <br/>

        <h2>Add Marriage <input type="checkbox" v-model="addMarriage"></h2>
        <div v-if="addMarriage">
            <form>
                <select id="family-origin-spouse" v-model="spouseSelected">
                    <option value="0"></option>
                    <option v-for="p in allPersons" :value="p.id">{{ p.lastName }}, {{p.firstName }} {{ p.middleNames
                        }}
                    </option>
                </select>
            </form>
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
    import RestResource from '../services/person';
    const restResourceService = new RestResource();

    export default {
        data() {
            return {
                egoSelected: 0,
                egoMarriages: [],
                spouseSelected: 0,
                addMarriage: false,
                selectedYear: 1900,
                selectedMonth: 0,
                selectedDay: 1,
                dateKnown: false,
                allPersons: this.getAllPersons(),
                marriage: {},
                marriageId: 0
            }
        },
        methods: {
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
                let personToPopulate = _.find(this.allPersons, function (person) {
                    return person.id === self.egoSelected;
                });

                if (!personToPopulate) {
                    Object.assign(this.$data, restResourceService.initialState());
                    return;
                }

                this.egoMarriages = this.getMarriages();
            },
            getAllPersons: function () {
                Vue.prototype.http.get('/api/person/all').then(persons => {
                        this.allPersons = persons.data;
                    },
                    error => {
                        console.log('getPersons Error ', error);
                    });
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

                var self = this;
                Vue.prototype.http.post('/api/person/marriage', self.marriage).then(newMarriage => {
                        this.egoSelected = 0;
                        this.spouseSelected = 0;
                        this.dateKnown = false;
                        this.selectedYear = 1900;
                        this.selectedMonth = 0;
                        this.selectedDay = 1;
                        this.marriage.id = 0;
                        this.egoMarriages = [];
                    },
                    error => {
                        console.log('getPersons Error ', error);
                    });
            },
            getPersonById: function (personId) {
                return _.find(this.allPersons, function (person) {
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
                this.marriageId = spouseObject.id;
            }
        }
    }

</script>


<style>

    .click-edit-marriage {
        color: blue;
        cursor: pointer;
    }

</style>