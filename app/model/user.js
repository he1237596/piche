/*
 * @Author: Chris
 * @Date: 2024-04-22 03:44:44
 * @LastEditors: Chris
 * @LastEditTime: 2024-04-22 03:45:03
 * @Descripttion: **
 */
'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const User = app.model.define('user', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING(30),
    age: INTEGER,
    created_at: DATE,
    updated_at: DATE,
  });

  return User;
};
