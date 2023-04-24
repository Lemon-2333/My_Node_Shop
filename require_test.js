function Hello() { 
    //var name; 
    this.name;
    this.setName = function(thyName) { 
        this.name = thyName; 
    }; 
    this.sayHello = function() { 
        console.log('Hello ' + this.name); 
    }; 
}; 

module.exports = Hello