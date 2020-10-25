import consola from 'consola';
import { Role } from '../models/Role';

// Adding 'SUPER-ADMIN' role.
Role.findOne({ name: "SUPER-ADMIN" }, (error, role) => {
  if (error) { consola.error('error', error); }
  if (!role) {
    let role = { name: "SUPER-ADMIN" }
    const saveObject = new Roles(role);
    saveObject.save();
  }
})

// Adding 'USER' role.
Role.findOne({ name: "USER" }, (error, role) => {
  if (error) { consola.error('error', error); }
  if (!role) {
    let role = { name: "USER" }
    const saveObject = new Roles(role);
    saveObject.save();
  }
})

// Adding 'ADMIN' role.
Role.findOne({ name: "ADMIN" }, (error, role) => {
  if (error) { consola.error('error', error); }
  if (!role) {
    let role = { name: "ADMIN" }
    const saveObject = new Roles(role);
    saveObject.save();
  }
})
