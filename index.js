const mongoose = require('mongoose');
const Nations = require('./models/nations'); // Nhập schema Nations

const url = 'mongodb://localhost:27017/football'; // Kết nối với cơ sở dữ liệu MongoDB
const connect = mongoose.connect(url);

connect.then((db) => {
  console.log('Connected correctly to server');

  // Tạo một quốc gia mới
  Nations.create({
    name: 'Qatar',
    description: 'Home Team'
  })
  .then((nation) => {
    console.log(nation);

    // Tìm và cập nhật quốc gia
    return Nations.findByIdAndUpdate(nation._id, {
      $set: { description: 'WC 2022' }
    }, { new: true }).exec();
  })
  .then((nation) => {
    console.log(nation);

    // Thêm một bình luận (sub-document)
    nation.comments.push({
      rating: 5,
      comment: 'Please give me beer!',
      author: 'Hacker'
    });

    // Lưu quốc gia đã cập nhật
    return nation.save();
  })
  .then((nation) => {
    console.log(nation);

    // Xóa quốc gia
    return Nations.deleteOne({});
  })
  .then(() => {
    return mongoose.connection.close();
  })
  .catch((err) => {
    console.log(err);
  });
});
