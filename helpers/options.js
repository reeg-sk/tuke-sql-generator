const options = [ // from faker readme - transformed to array
  "fullname", "null", "enum", // custom
  "address-zipCode", "address-zipCodeByState", "address-city", "address-cityPrefix", "address-citySuffix", "address-cityName", "address-streetName", "address-streetAddress", "address-streetSuffix", "address-streetPrefix", "address-secondaryAddress", "address-county", "address-country", "address-countryCode", "address-state", "address-stateAbbr", "address-latitude", "address-longitude", "address-direction", "address-cardinalDirection", "address-ordinalDirection", "address-nearbyGPSCoordinate", "address-timeZone",
  "animal-dog", "animal-cat", "animal-snake", "animal-bear", "animal-lion", "animal-cetacean", "animal-horse", "animal-bird", "animal-cow", "animal-fish", "animal-crocodilia", "animal-insect", "animal-rabbit", "animal-type",
  "commerce-color", "commerce-department", "commerce-productName", "commerce-price", "commerce-productAdjective", "commerce-productMaterial", "commerce-product", "commerce-productDescription",
  "company-suffixes", "company-companyName", "company-companySuffix", "company-catchPhrase", "company-bs", "company-catchPhraseAdjective", "company-catchPhraseDescriptor", "company-catchPhraseNoun", "company-bsAdjective", "company-bsBuzz", "company-bsNoun",
  "database-column", "database-type", "database-collation", "database-engine",
  "datatype-number", "datatype-float", "datatype-datetime", "datatype-string", "datatype-uuid", "datatype-boolean", "datatype-hexaDecimal", "datatype-json", "datatype-array",
  "date-past", "date-future", "date-between", "date-recent", "date-soon", "date-month", //"date-weekday",
  "finance-account", "finance-accountName", "finance-routingNumber", "finance-mask", "finance-amount", "finance-transactionType", "finance-currencyCode", "finance-currencyName", "finance-currencySymbol", "finance-bitcoinAddress", "finance-litecoinAddress", "finance-creditCardNumber", "finance-creditCardCVV", "finance-ethereumAddress", "finance-iban", "finance-bic", "finance-transactionDescription",
  "git-branch", "git-commitEntry", "git-commitMessage", "git-commitSha", "git-shortSha",
  "hacker-abbreviation", "hacker-adjective", "hacker-noun", "hacker-verb", "hacker-ingverb", "hacker-phrase",
  "image-image", "image-avatar", "image-imageUrl", "image-abstract", "image-animals", "image-business", "image-cats", "image-city", "image-food", "image-nightlife", "image-fashion", "image-people", "image-nature", "image-sports", "image-technics", "image-transport", "image-dataUri", "image-lorempixel", "image-unsplash", "image-lorempicsum",
  "internet-avatar", "internet-email", "internet-exampleEmail", "internet-userName", "internet-protocol", "internet-httpMethod", "internet-url", "internet-domainName", "internet-domainSuffix", "internet-domainWord", "internet-ip", "internet-ipv6", "internet-port", "internet-userAgent", "internet-color", "internet-mac", "internet-password",
  "lorem-word", "lorem-words", "lorem-sentence", "lorem-slug", "lorem-sentences", "lorem-paragraph", "lorem-paragraphs", "lorem-text", "lorem-lines",
  "music-genre",
  "name-firstName", "name-lastName", "name-middleName", "name-findName", "name-jobTitle", "name-gender", "name-prefix", "name-suffix", "name-title", "name-jobDescriptor", "name-jobArea", "name-jobType",
  "phone-phoneNumber", "phone-phoneNumberFormat",
  "system-fileName", "system-commonFileName", "system-mimeType", "system-commonFileType", "system-commonFileExt", "system-fileType", "system-fileExt", "system-directoryPath", "system-filePath", "system-semver",
  "vehicle-vehicle", "vehicle-manufacturer", "vehicle-model", "vehicle-type", "vehicle-fuel", "vehicle-vin", "vehicle-color", "vehicle-vrm", "vehicle-bicycle",
  "time-recent",
];

const locales = ["az", "ar", "cz", "de", "de_AT", "de_CH", "en", "en_AU", "en_AU_ocker", "en_BORK", "en_CA", "en_GB", "en_IE", "en_IND", "en_US", "en_ZA", "es", "es_MX", "fa", "fi", "fr", "fr_CA", "fr_CH", "ge", "hy", "hr", "id_ID", "it", "ja", "ko", "nb_NO", "ne", "nl", "nl_BE", "pl", "pt_BR", "pt_PT", "ro", "ru", "sk", "sv", "tr", "uk", "vi", "zh_CN", "zh_TW"];

module.exports = { options, locales }