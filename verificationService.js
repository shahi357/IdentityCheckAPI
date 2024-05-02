async function checkVerification(ID) {
    if (ID === "valid_id") {
      return "positive";
    } else {
      return "negative";
    }
  }
  
  module.exports = checkVerification;