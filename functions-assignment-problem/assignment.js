const DEFAULT_PHRASE = "HI ";

const sayHello = (name, phrase = DEFAULT_PHRASE) => {
  console.log(phrase + name);
};

// const sayHello = () => console.log("Hi Max");

// const sayHello = name => message = `Hi ${name}`; 


const checkInput = (testCallback,...strings) => {
  let isEmptyString = false;
  for(const text of strings){
    if(!text){
        isEmptyString = true;
        break;
    }
  }

  if(!isEmptyString){
    testCallback();
  }
}

const testCallback = () => {
  console.log("test callback called!");
}

checkInput(testCallback, "a", "b", "c", "bggg");
sayHello('Max');
