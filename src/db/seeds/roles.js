/*
  This seed will create the basic roles and store it on the database.
  These roles are required for the security and permissions on the app.
  it run only the first time the app is launched.
*/

import consola from 'consola';
import { Role } from '../models';

// Adding 'SUPER-ADMIN' role.
Role.findOne({ name: "SUPER-ADMIN" }, async (error, role) => {
  if (error) { consola.error('error', error); }
  if (!role) {
    let role = { name: "SUPER-ADMIN" }
    await Role(role).save();
  }
})

// Adding 'USER' role.
Role.findOne({ name: "USER" }, async (error, role) => {
  if (error) { consola.error('error', error); }
  if (!role) {
    let role = { name: "USER" }
    await Role(role).save();
  }
})

// Adding 'ADMIN' role.
Role.findOne({ name: "ADMIN" }, async (error, role) => {
  if (error) { consola.error('error', error); }
  if (!role) {
    let role = { name: "ADMIN" }
    await Role(role).save();
  }
})
