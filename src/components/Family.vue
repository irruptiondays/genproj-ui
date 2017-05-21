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

        <h2>Select Father</h2>
        <form>
            <select id="family-origin-father" v-model="fatherSelected">
                <option v-for="p in males" v-bind:value="p.id">{{ p.lastName }}, {{p.firstName }} {{ p.middleNames }}</option>
            </select>
        </form>
        <span>Selected Father: {{ fatherSelected }}</span>

        <h2>Select Mother</h2>
        <form>
            <select id="family-origin-mother" v-model="motherSelected">
                <option v-for="p in females" v-bind:value="p.id">{{ p.lastName }}, {{p.firstName }} {{ p.middleNames }}</option>
            </select>
        </form>
        <span>Selected Mother: {{ motherSelected }}</span>
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
                motherSelected: 0
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