<template>
    <div class="container starter-template">
        <h1>Set Family Origin</h1>

        <h2>Select Person</h2>
        <form>
            <select id="family-origin-ego" v-model="egoSelected">
                <option v-for="p in displayPersons" :value="p.id">{{ p.lastName }}, {{p.firstName }} {{ p.middleNames
                    }}
                </option>
            </select>
        </form>
        <div class="col-sm-offset-2 col-sm-10">
            <button type="submit"
                    class="btn btn-primary" @click="selectedPerson">Fetch Person
            </button>
        </div>
        <span>Selected Ego: {{ egoSelected }}</span>


        <h2>Select Father

            <input id="add-father" type="checkbox" checked="true"
                   v-model="fatherAdded"/></h2>

        <form v-if="fatherAdded">
            <select id="family-origin-father" v-model="fatherSelected">
                <option value="0"></option>
                <option v-for="p in males" :value="p.id">{{ p.lastName }}, {{p.firstName }} {{ p.middleNames }}
                </option>
            </select>
        </form>
        <span>Selected Father: {{ fatherSelected }}</span>


        <h2>Select Mother

            <input id="add-mother" type="checkbox" checked="true"
                   v-model="motherAdded"/></h2>

        <form v-if="motherAdded">
            <select id="family-origin-mother" v-model="motherSelected">
                <option value="0"></option>
                <option v-for="p in females" :value="p.id">{{ p.lastName }}, {{p.firstName }} {{ p.middleNames
                    }}
                </option>
            </select>
        </form>
        <span>Selected Mother: {{ motherSelected }}</span>


        <form class="form-horizontal" id="submit-parents">
            <div class="form-group">
                <div class="col-sm-offset-2 col-sm-10">
                    <button class="btn btn-primary" @click="saveParents">Add Parents</button>
                </div>
            </div>
        </form>
    </div>
</template>


<script>
    import Vue from 'vue';
    import Person from './Persons.vue'
    import { mapActions } from 'vuex';

    export default {
        data() {
            return {
                males: [],
                females: [],
                egoSelected: 0,
                fatherSelected: 0,
                motherSelected: 0,
                fatherAdded: true,
                motherAdded: true
            }
        },
        methods: {
            ...mapActions({
                fetchAllPersons: 'fetchAllPersons'
            }),
            saveParents: function (evt) {
                evt.preventDefault();
                if (this.egoSelected === 0) return;
                var fatherId = this.fatherAdded ? this.fatherSelected : 0;
                var motherId = this.motherAdded ? this.motherSelected : 0;
                Vue.prototype.http.post('/api/person/origin/' + this.egoSelected + '/' + fatherId + '/' + motherId).then(result => {
                    console.log('person: ', result);
                    //this.displayPersons();
                    this.egoSelected = 0;
                    this.fatherSelected = 0;
                    this.motherSelected = 0;
                    this.fatherAdded = true;
                    this.motherAdded = true;
                    this.fetchAllPersons();
                }, error => {
                    console.log('Error: ', error);
                });
            },
            setMales: function () {
                this.males = this.$store.getters.allPersons.filter(person => {
                    if (person.gender == 'MALE') return person;
                });
            },
            setFemales: function () {
                this.females = this.$store.getters.allPersons.filter(person => {
                    if (person.gender == 'FEMALE') return person;
                });
            },
            selectedPerson: function (evt) {

                this.setFemales();
                this.setMales();

                this.fatherSelected = 0;
                this.motherSelected = 0;

                if (evt) {
                    evt.preventDefault();
                }

                if (!this.egoSelected) {
                    console.log('first null');
                    return null;
                }

                var self = this;
                let personToPopulate = _.find(this.$store.getters.allPersons, function (person) {
                    return person.id === self.egoSelected;
                });

                console.log('personToPopulate ', personToPopulate);

                if (!personToPopulate) {
                    Object.assign(this.$data, restResourceService.initialState());
                    return;
                }

                if (personToPopulate.father) {
                    this.fatherAdded = true;
                    this.fatherSelected = personToPopulate.father.id;
                }

                if (personToPopulate.mother) {
                    this.motherAdded = true;
                    this.motherSelected = personToPopulate.mother.id;
                }


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

</style>