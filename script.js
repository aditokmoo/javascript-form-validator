let config = {
    'ime_prezime': {
        minLength: 5,
        maxLength: 50,
        required: true,
    },
    'korisnicko_ime': {
        minLength: 5,
        maxLength: 50,
        required: true,
    },
    'email': {
        required: true,
        email: true,
        minLength: 5,
        maxLength: 50,
    },
    'broj_telefona': {
        minLength: 9,
        maxLength: 13,
    },
    'postal_code': {
        maxLength: 5,
        minLength: 0,
    },
    'lozinka': {
        required: true,
        minLength: 5,
        maxLength: 25,
        matching: 'ponovi_lozinka',
    },
    'ponovi_lozinku': {
        required: true,
        minLength: 5,
        maxLength: 25,
        matching: 'lozinka',
    }
}

let validate = new Validate(config);