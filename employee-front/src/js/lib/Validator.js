export default class Validator {
  constructor(data) {
    this.data = data;
    this.errors = {
      name: [],
      salary: [],
      business: []
    };
  }

  validatePresence(attr) {
    if(this.data[attr] == ""){ 
      this.errors[attr].push("Ingresa un valor plis");
    }
    return this;
  }

  isValid() {
    let count = Object.keys(this.errors.name).length +
    Object.keys(this.errors.salary).length +
    Object.keys(this.errors.business).length;

    return count == 0;
  }
}

