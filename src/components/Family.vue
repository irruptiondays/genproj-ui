<template>
    <div class="container starter-template">
        <h1>Set Family Origin</h1>

        <h2>Select Person</h2>
        <form>
            <select id="family-origin-ego" v-model="egoSelected">
                <option v-for="p in allPersons" v-bind:value="p.id">{{ p.lastName }}, {{p.firstName }} {{ p.middleNames }}</option>
            </select>
        </form>
        <span>Selected Ego: {{ egoSelected }}</span>


        <h2>Select Father

        <input id="add-father" type="checkbox" checked="true"
               v-model="fatherAdded"/></h2>

        <form v-if="fatherAdded">
            <select id="family-origin-father" v-model="fatherSelected">
                <option v-for="p in males" v-bind:value="p.id">{{ p.lastName }}, {{p.firstName }} {{ p.middleNames }}</option>
            </select>
        </form>
        <span>Selected Father: {{ fatherSelected }}</span>



        <h2>Select Mother

        <input id="add-mother" type="checkbox" checked="true"
               v-model="motherAdded"/></h2>

        <form v-if="motherAdded">
            <select id="family-origin-mother" v-model="motherSelected">
                <option v-for="p in females" v-bind:value="p.id">{{ p.lastName }}, {{p.firstName }} {{ p.middleNames }}</option>
            </select>
        </form>
        <span>Selected Mother: {{ motherSelected }}</span>


        <form class="form-horizontal" id="submit-parents">
            <label class="col-sm-2 control-label">Display all persons</label>
            <div class="form-group">
                <div class="col-sm-offset-2 col-sm-10">
                    <button class="btn btn-primary btn-lg" @click="saveParents">Add Parents</button>
                </div>
            </div>
        </form>
    </div>
</template>


<script>
    import Vue from 'vue';
    import Person from './Persons.vue'
    export default {
        data() {
            return {
                allPersons: this.getPersons(),
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
            getPersons: function () {
                Vue.prototype.http.get('/api/person/all').then(persons => {
                        this.allPersons = persons.data;
                        this.males = this.setMales(this.allPersons);
                        this.females = this.setFemales(this.allPersons);
                    },
                    error => {
                        console.log('getPersons Error ', error);
                    });
            },
            saveParents: function (evt) {
                evt.preventDefault();
                if (this.egoSelected === 0) return;
                var fatherId = this.fatherAdded ? this.fatherSelected : 0;
                var motherId = this.motherAdded ? this.motherSelected : 0;
                Vue.prototype.http.post('/api/person/origin/' + this.egoSelected + '/' + fatherId + '/' + motherId).then(result => {
                    console.log('person: ', result);
                }, error => {
                    console.log('Error: ', error);
                });
            },
            setMales: function(persons) {
                return persons.filter(person => {
                    if (person.gender == 'MALE') return person;
                });
            },
            setFemales: function(persons) {
                return persons.filter(person => {
                    if (person.gender == 'FEMALE') return person;
                });
            }

        }
    }

</script>


<style>

</style>