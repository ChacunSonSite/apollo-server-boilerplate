import consola from 'consola';
import Roles from '../models/Role';

// Adding 'SUPER-ADMIN' role.
Roles.findOne({ name: "SUPER-ADMIN" }, (error, role) => {
  if (error) { consola.error('error', error); }
  if (!role) {
    let role = { name: "SUPER-ADMIN" }
    const saveObject = new Roles(role);
    saveObject.save();
  }
})

// Adding 'USER' role.
Roles.findOne({ name: "USER" }, (error, role) => {
  if (error) { consola.error('error', error); }
  if (!role) {
    let role = { name: "USER" }
    const saveObject = new Roles(role);
    saveObject.save();
  }
})

// Adding 'ADMIN' role.
Roles.findOne({ name: "ADMIN" }, (error, role) => {
  if (error) { consola.error('error', error); }
  if (!role) {
    let role = { name: "ADMIN" }
    const saveObject = new Roles(role);
    saveObject.save();
  }
})
