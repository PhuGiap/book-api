const dayjs = require('dayjs');

exports.formatBookResponse = (book) => ({
  ...book,
  published_date: dayjs(book.published_date).format('YYYY-MM-DD'),
  created_at: dayjs(book.created_at).format('YYYY-MM-DD'),
  updated_at: dayjs(book.updated_at).format('YYYY-MM-DD'),
});
