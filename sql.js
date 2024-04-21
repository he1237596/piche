/*
 * @Author: Chris
 * @Date: 2024-04-22 03:34:53
 * @LastEditors: Chris
 * @LastEditTime: 2024-04-22 03:35:04
 * @Descripttion: **
 */
const { Sequelize, DataTypes } = require('sequelize');

// 初始化 Sequelize 实例
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false, // 可以在开发中设置为 true 来查看 SQL 查询
});

// 用户表
const User = sequelize.define('User', {
  username: DataTypes.STRING,
  password: DataTypes.STRING,
  email: DataTypes.STRING,
  phoneNumber: DataTypes.STRING,
  createdAt: DataTypes.DATE
});

// 行程表
const Trip = sequelize.define('Trip', {
  departureLocation: DataTypes.STRING,
  destination: DataTypes.STRING,
  departureTime: DataTypes.DATE,
  availableSeats: DataTypes.INTEGER,
  vehicleType: DataTypes.STRING,
  description: DataTypes.TEXT
});

// 行程预约表
const Booking = sequelize.define('Booking', {
  bookingTime: DataTypes.DATE,
  status: DataTypes.ENUM('pending', 'confirmed', 'cancelled')
});

// 车辆表
const Vehicle = sequelize.define('Vehicle', {
  vehicleType: DataTypes.STRING,
  licensePlate: DataTypes.STRING,
  capacity: DataTypes.INTEGER
});

// 消息表
const Message = sequelize.define('Message', {
  content: DataTypes.TEXT,
  sentTime: DataTypes.DATE
});

// 评价表
const Review = sequelize.define('Review', {
  rating: DataTypes.INTEGER,
  comment: DataTypes.TEXT,
  createdAt: DataTypes.DATE
});

// 地区表
const Region = sequelize.define('Region', {
  regionName: DataTypes.STRING
});

// 用户地区关联表
const UserRegion = sequelize.define('UserRegion', {
  // 此表可能不需要额外字段，只需外键关联
});

// 定义关联关系
User.hasMany(Trip, { foreignKey: 'userId' });
Trip.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Booking, { foreignKey: 'userId' });
Booking.belongsTo(User, { foreignKey: 'userId' });

Trip.hasMany(Booking, { foreignKey: 'tripId' });
Booking.belongsTo(Trip, { foreignKey: 'tripId' });

User.hasMany(Message, { foreignKey: 'senderId' });
User.hasMany(Message, { foreignKey: 'receiverId' });
Message.belongsTo(User, { foreignKey: 'senderId' });
Message.belongsTo(User, { foreignKey: 'receiverId' });

User.hasMany(Review, { foreignKey: 'userId' });
Review.belongsTo(User, { foreignKey: 'userId' });

Trip.hasMany(Review, { foreignKey: 'tripId' });
Review.belongsTo(Trip, { foreignKey: 'tripId' });

User.belongsToMany(Region, { through: UserRegion, foreignKey: 'userId', otherKey: 'regionId' });
Region.belongsToMany(User, { through: UserRegion, foreignKey: 'regionId', otherKey: 'userId' });

// 同步所有模型到数据库，如果表不存在则创建它们
sequelize.sync().then(() => {
  console.log('All models synced successfully.');
}).catch(err => {
  console.error('Error syncing models:', err);
});