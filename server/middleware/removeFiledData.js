module.exports = (data, field) => {
   let encode = { ...data };
   delete encode[field];
   return encode;
};
