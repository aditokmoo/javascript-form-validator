class Validate {
    constructor(config) {
        this.elConfig = config;
        this.errors = {};
        this.generateErrorObject();
        this.inputListener();
    }

    generateErrorObject() {
        for(let field in this.elConfig) {
            this.errors[field] = [];
        }
    }

    inputListener() {
        for(let field in this.elConfig) {
            let input = document.querySelector(`input[name="${field}"]`);

            input.addEventListener('input', this.validate.bind(this));
        }
    }

    validate(e) {
        let target = e.target;
        let inputName = target.getAttribute('name');
        let inputValue = target.value;

        this.errors[inputName] = [];

        // Check if inputs are required
        if(this.elConfig[inputName].required) {
            if(inputValue === '') {
                this.errors[inputName].push('Polje ne moze biti prazno')
            }
        }
        // Check if name is valid
        switch(inputName) {
            case 'ime_prezime':
                let valid = inputValue.trim();
                valid = valid.split(' ');

                if(valid.length < 2) {
                    this.errors[inputName].push('Polje mora da sadrzi ime i prezime')
                }
        }
        
        // Check if postal code is negative
        if(document.querySelector('#postal_code').value < 0) {
            this.errors[inputName].push('Kod ne moze biti negativan')
        }

        // Check min and max charachters
        if(inputValue.length < this.elConfig[inputName].minLength || inputValue.length > this.elConfig[inputName].maxLength) {
            this.errors[inputName].push(`Polje mora da sadrzi minimalno ${this.elConfig[inputName].minLength} i maksimalno ${this.elConfig[inputName].maxLength}`);
        }

        // Check if email is valid
        if(this.elConfig[inputName].email) {
            if(!this.validateEmail(inputValue)) {
                this.errors[inputName].push('Email nije ispravan')
            }
        }

        // Check password
        if(this.elConfig[inputName].matching) {
            let pass = document.querySelector('#lozinka').value;

            if(inputValue !== pass) {
                this.errors[inputName].push(`Lozinka nije ista`)
            }
        }

        this.populateErrors();
    }

    populateErrors() {

        for(let elem of document.querySelectorAll('ul')) {
            elem.remove();
        }
        
        for(let key of Object.keys(this.errors)) {
            let input = document.querySelector(`input[name="${key}"]`);
            let parentElement = input.parentElement;
            let ul = document.createElement('ul');

            parentElement.appendChild(ul);

            this.errors[key].forEach(error => {
                let li = document.createElement('li');
                li.innerText = error;

                ul.appendChild(li);
            })
        }
    }

    validateEmail(inputValue) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(inputValue)) {
            return true;
        }
        return false;
    }
}