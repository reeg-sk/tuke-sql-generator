import Head from 'next/head'
import React, { useState, useEffect } from 'react'
import styles from '../styles/Home.module.css'
import faker from 'faker'

export default function Home() {
  const [tableName, setTableName] = useState("bananas");
  const [cols, setCols] = useState([]);
  const [generate, setGenerate] = useState(20);
  const [generatedData, setGeneratedData] = useState([]);
  const [activeLocale, setActiveLocale] = useState("en");

  const options = [ // from faker readme - transformed to array
    "fullname", // custom
    "address-zipCode", "address-zipCodeByState", "address-city", "address-cityPrefix", "address-citySuffix", "address-cityName", "address-streetName", "address-streetAddress", "address-streetSuffix", "address-streetPrefix", "address-secondaryAddress", "address-county", "address-country", "address-countryCode", "address-state", "address-stateAbbr", "address-latitude", "address-longitude", "address-direction", "address-cardinalDirection", "address-ordinalDirection", "address-nearbyGPSCoordinate", "address-timeZone",
    "animal-dog", "animal-cat", "animal-snake", "animal-bear", "animal-lion", "animal-cetacean", "animal-horse", "animal-bird", "animal-cow", "animal-fish", "animal-crocodilia", "animal-insect", "animal-rabbit", "animal-type",
    "commerce-color", "commerce-department", "commerce-productName", "commerce-price", "commerce-productAdjective", "commerce-productMaterial", "commerce-product", "commerce-productDescription",
    "company-suffixes", "company-companyName", "company-companySuffix", "company-catchPhrase", "company-bs", "company-catchPhraseAdjective", "company-catchPhraseDescriptor", "company-catchPhraseNoun", "company-bsAdjective", "company-bsBuzz", "company-bsNoun",
    "database-column", "database-type", "database-collation", "database-engine",
    "datatype-number", "datatype-float", "datatype-datetime", "datatype-string", "datatype-uuid", "datatype-boolean", "datatype-hexaDecimal", "datatype-json", "datatype-array",
    "date-past", "date-future", "date-between", "date-betweens", "date-recent", "date-soon", "date-month", "date-weekday",
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

  const updateCol = (prop, event, index) => {
    const old = cols[index];
    const updated = { ...old, [prop]: event.target.value }
    const clone = [...cols];
    clone[index] = updated;
    setCols(clone);
  }

  const removeCol = (name) => {
    setCols(cols.filter((value) => value.name !== name));
  }

  const generateData = () => {
    let total = [];

    for (let i = 0; i < generate; i++) {
      let values = [];
      let names = [];
      cols.map(col => {
        let spcol = col.type.split("-");

        let generated = '';
        if (col.type == "fullname") {
          generated = faker.fake(`{{name.firstName}} {{name.lastName}}`);
        } else if (col.type == "datatype-number") {
          generated = faker.datatype.number({
            min: Number(col.minValue),
            max: Number(col.maxValue),
          });

        } else {
          generated = faker.fake(`{{${spcol[0]}.${spcol[1]}}}`);
        }

        if (col.type == "datatype-boolean" || col.type == "datatype-number") {
          // nothing
        } else if (col.type.includes("date")) {
          generated = `'${new Date(generated).toISOString()}'`;
        } else {
          generated = `'${generated.replace("'", "''")}'`;
        }

        if (col.type == "name-firstName") {
          names[0] = generated;
        } else if (col.type == "name-lastName") {
          names[1] = generated;
        } else if (col.type == "fullname") {
          names = generated.split(" ");
        }

        if (names[0] && names[1]) {
          if (col.type == "internet-email") {
            names[0] = names[0].toLowerCase().replaceAll("'", "");
            names[1] = names[1].toLowerCase().replaceAll("'", "");
            generated = "'" + (names.join(".") + "@" + generated.split("@")[1]);
          }
        }


        values.push(generated);
      })

      total.push(values);
    }

    setGeneratedData(total);
  }

  useEffect(() => {
    faker.locale = activeLocale;
  }, [activeLocale]);

  return (
    <div className={styles.container}>
      <Head>
        <title>SQL Blabla</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <img src="peepo.gif" width={64} />
        <h1>{"<3"} TUKE</h1>
        <header>
          <label htmlFor="tableName">Table name</label>
          <input name="tableName" type="text" value={tableName} onChange={(e) => setTableName(e.target.value)} />
        </header>

        <hr />

        <button onClick={() => setCols([...cols, { name: faker.database.column(), type: options[0] }])}>Add col</button>
        <table>
          <tbody style={{
            display: 'flex'
          }}>
            {cols.map((col, idx) => (
              <tr key={idx} style={{
                display: "flex",
                flexDirection: "column"
              }}>
                <td style={{
                  display: "flex",
                  flexDirection: "column"
                }}>
                  <label htmlFor={"col-" + idx}>
                    <span style={{ cursor: "pointer", color: "red" }} onClick={() => removeCol(col.name)}>X</span>
                    {" "}Col name
                  </label>
                  <input name={"col-" + idx} type="text" value={col.name} onChange={e => updateCol("name", e, idx)} />

                </td>
                <td style={{
                  display: "flex",
                  flexDirection: "column"
                }}>
                  <label htmlFor="type">Data type</label>
                  <select name="type" value={col.type} onChange={e => updateCol("type", e, idx)}>
                    {options.map((opt, idz) => (
                      <option key={idz} value={opt}>{opt}</option>
                    ))}
                  </select>
                  {col.type == "datatype-number" && (
                    <div>
                      <input style={{ width: "100%" }} type={"number"} placeholder="min val" onChange={e => updateCol("minValue", e, idx)} />
                      <input style={{ width: "100%" }} type={"number"} placeholder="max val" onChange={e => updateCol("maxValue", e, idx)} />
                    </div>
                  )}
                </td>

              </tr>
            ))}
          </tbody>
        </table>

        <hr />

        <label htmlFor="rowsToGenerate">Rows to generate</label>
        <input name="rowsToGenerate" type="number" value={generate} onChange={(e) => setGenerate(e.target.value)} />

        <div style={{
          display: "flex"
        }}>
          <button onClick={generateData}>Generate data</button>

          <div>
            <label htmlFor="locale">Locale</label>
            <select name="locale" value={activeLocale} onChange={e => setActiveLocale(e.target.value)}>
              {locales.map((opt, idz) => (
                <option key={idz} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
        </div>

        <hr />

        {cols.length > 0 && (
          <pre>
            <code>
              INSERT INTO {tableName} ({cols.map(col => col.name).join(", ")}) VALUES{"\n"}
              {generatedData.length > 0 ?
                generatedData.map((dat, idx) => (
                  <span key={idx}>
                    {"(\n"}
                    {"\t" + dat.join(", \n\t")}
                    {`\n)${generatedData.length - 1 != idx ? "," : " "}\n`}
                  </span>
                ))
                : '(first generate data)'}
            </code>
          </pre>
        )}
      </main>
      <small style={{
        fontSize: "8px"
      }}>Made with love - ReeG | powered by faker</small>
    </div>
  )
}
