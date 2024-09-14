const mongoose = require('mongoose');
const Nations = require('./models/nations');

const url = 'mongodb://localhost:27017/football';  // URL kết nối tới MongoDB
const connect = mongoose.connect(url);

connect.then((db) => {
  console.log('Connected correctly to server');

  var newNation = Nations({
    name: 'Qatar',
  });

  // Lưu quốc gia mới
  newNation.save()
  .then((nation) => {
    console.log(nation);
    return Nations.find({}).exec();  // Tìm tất cả các quốc gia
  })
  .then((nations) => {
    console.log(nations);

    return Nations.deleteMany({});  // Xóa tất cả quốc gia
  })
  .then(() => {
    return mongoose.connection.close();  // Đóng kết nối
  })
  .catch((err) => {
    console.log(err);
  });
});
