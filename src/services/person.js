export default class RestResource {

    initialState() {
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
            birthplace: '',
            deathdateKnown: false,
            deathdateYear: 1900,
            deathdateMonth: 0,
            deathdateDay: 1,
            currentOrLateHome: '',
            familyBranch: 'COMMON'
        }
    }
}
