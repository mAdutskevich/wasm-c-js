import factory from './increment.js';

factory().then((instance) => {
  console.log('instance', instance);
  instance._sayHi(); // direct calling works
  instance.ccall("sayHi"); // using ccall etc. also work
  console.log(instance._daysInWeek()); // values can be returned, etc.
});