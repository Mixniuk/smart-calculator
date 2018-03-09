class SmartCalculator {
  
  constructor(initialValue) {
    this.values = [initialValue];
    this.operations = [];    
  }

  add(number) {
    this.values.push(number);
    this.operations.push("+");
    return this;
  }
  
  subtract(number) {
    this.values.push(number);
    this.operations.push("-");
    return this;
  }

  multiply(number) {
    this.values.push(number);
    this.operations.push("*");
    return this;
  }

  devide(number) {
    this.values.push(number);
    this.operations.push("/");
    return this;
  }

  pow(number) {
    this.values.push(number);
    this.operations.push("^");
    return this;
  }

  execute_high_priority(){
    for (let i = this.operations.length; i >= 0; i--)
      if(this.operations[i] == "^") this.execute_pow(i);
      this.clear();
  }

  execute_middle_priority(){
    for (let i = 0; i < this.operations.length; i++)
      if(this.operations[i] == "*") this.execute_multiply(i);
      else if(this.operations[i] == "/")this.execute_devide(i);
      this.clear();
  }

  execute_low_priority(){
    for (let i = 0; i < this.operations.length; i++)
    if(this.operations[i] == "+") this.execute_add(i);
    else if(this.operations[i] == "-")this.execute_subtract(i);
    this.clear();
  }

  execute_add(i){
    this.values[i+1] = this.values[i]+this.values[i+1];
    this.values[i] = null;
    this.operations[i] = null;
  }

  execute_subtract(i){
    this.values[i+1] = this.values[i]-this.values[i+1];
    this.values[i] = null;
    this.operations[i] = null;
  }

  execute_multiply(i){
    this.values[i+1] = this.values[i]*this.values[i+1];
    this.values[i] = null;
    this.operations[i] = null;
  }

  execute_devide(i){
    this.values[i+1] = this.values[i]/this.values[i+1];
    this.values[i] = null;
    this.operations[i] = null;
  }

  execute_pow(i){
    this.values[i] = Math.pow(this.values[i],this.values[i+1]);
    this.values[i+1] = null;
    this.operations[i] = null;
  }

  clear(){
    let new_values = [];
    let k = 0;
    for (let i = 0; i < this.values.length; i++) {
        if(this.values[i] != null)new_values[k++] = this.values[i];        
    }
    this.values = new_values;
    let new_operations = [];
    k = 0;
    for (let i = 0; i < this.operations.length; i++) {
        if(this.operations[i] != null)new_operations[k++] = this.operations[i];        
    }
    this.operations = new_operations;
  }

  valueOf(){
    this.execute_high_priority();
    this.execute_middle_priority();
    this.execute_low_priority();
    return this.values[0];
  }

}

module.exports = SmartCalculator;