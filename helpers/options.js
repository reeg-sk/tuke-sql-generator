const options = { // from faker readme - transformed to array
  custom: ["fullname", "null", "enum"],
  address: ["address-zipCode", "address-zipCodeByState", "address-city", "address-cityPrefix", "address-citySuffix"],
  animal: ["animal-dog", "animal-cat", "animal-snake", "animal-bear", "animal-lion", "animal-cetacean"],
  commerce: ["commerce-color", "commerce-department", "commerce-productName", "commerce-price"],
  company: ["company-suffixes", "company-companyName", "company-companySuffix", "company-catchPhrase", "company-bs"],
  database: ["database-column", "database-type", "database-collation", "database-engine"],
  datatype: ["datatype-number", "datatype-float", "datatype-datetime", "datatype-string", "datatype-uuid", "datatype-boolean"],
  date: ["date-past", "date-future", "date-between", "date-recent", "date-soon", "date-month"],
  finance: ["finance-account", "finance-accountName", "finance-routingNumber", "finance-mask", "finance-amount"],
  git: ["git-branch", "git-commitEntry", "git-commitMessage", "git-commitSha", "git-shortSha"],
  hacker: ["hacker-abbreviation", "hacker-adjective", "hacker-noun", "hacker-verb", "hacker-ingverb", "hacker-phrase"],
  image: ["image-image", "image-avatar", "image-imageUrl", "image-abstract", "image-animals", "image-business"],
  internet: ["internet-avatar", "internet-email", "internet-exampleEmail", "internet-userName", "internet-protocol"],
  lorem: ["lorem-word", "lorem-words", "lorem-sentence", "lorem-slug", "lorem-sentences", "lorem-paragraph"],
  music: ["music-genre"],
  name: ["name-firstName", "name-lastName", "name-middleName", "name-findName", "name-jobTitle", "name-gender"],
  phone: ["phone-phoneNumber", "phone-phoneNumberFormat"],
  system: ["system-fileName", "system-commonFileName", "system-mimeType", "system-commonFileType"],
  vehicle: ["vehicle-vehicle", "vehicle-manufacturer", "vehicle-model", "vehicle-type", "vehicle-fuel", "vehicle-vin"],
  time: ["time-recent"],
};

const locales = ["az", "ar", "cz", "de", "de_AT", "de_CH", "en", "en_AU", "en_AU_ocker", "en_BORK", "en_CA", "en_GB", "en_IE", "en_IND", "en_US", "en_ZA", "es", "es_MX", "fa", "fi", "fr", "fr_CA", "fr_CH", "ge", "hy", "hr", "id_ID", "it", "ja", "ko", "nb_NO", "ne", "nl", "nl_BE", "pl", "pt_BR", "pt_PT", "ro", "ru", "sk", "sv", "tr", "uk", "vi", "zh_CN", "zh_TW"];

module.exports = { options, locales }