let upgrades = {
  "Power" : {price:5, effects:["this.accel*=1.05", "this.maxSpeed*=1.05", "this.fuelConsumption*=1.025"], desc:"Increase the power delivered by the engine, however more fuel will be consumed"},
  
  "Tires" : {price:5, effects:["this.grip*=1.05", "this.tireConsumption*=0.975", "this.turnSpeed *= 1.025"], desc:"Install tires with better grip, however they degrade faster. May also be harder to drift"},
  
  "Fuel Tank" : {price:5, effects:["this.fuelCap*=1.05", "this.fuel*=1.05", "this.maxSpeed*=0.975"], desc:"You can expand the size of the fuel tank, however the increased drag causes a slight top speed decrease"},
  
  "Fuel Efficiency" : {price:5, effects:["this.fuelConsumption*=0.95", "this.accel*=0.975"], desc:"Use available fuel slower, but affects your acceleration"},
  
  "Tire Durability" : {price:5, effects:["this.tireConsumption*=0.95", "this.grip*=0.975", "this.grip*=0.975", "this.turnSpeed*=0.975"], desc:"Tires degrade slower, but grip is reduced"},
  
  "Tire Manufacturing" : {price:5, effects:["this.tireCap*=1.05", "this.grip*0.975"], desc:"Tires need more wear to become unuseable, but have decreased grip"},
  
  "Stronger Materials" : {price:5, effect:["this."]}
}