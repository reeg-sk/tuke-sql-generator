import Head from 'next/head'
import React, { useState, useEffect } from 'react'
import faker from 'faker'
import { options, locales } from '../helpers/options'

export default function Home() {
  const [tableName, setTableName] = useState("bananas");
  const [cols, setCols] = useState([]);
  const [generate, setGenerate] = useState(20);
  const [generatedData, setGeneratedData] = useState([]);
  const [activeLocale, setActiveLocale] = useState("en");
  const [dragged, setDragged] = useState(null);

  const switchElement = (idx) => {
    if (idx !== dragged) {
      let reorderedCols = cols;

      const b = reorderedCols[idx].order;
      reorderedCols[idx].order = reorderedCols[dragged].order;
      reorderedCols[dragged].order = b;

      setCols(reorderedCols);
    }

    setDragged(null);
  };

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

  const selectContents = (el) => {
    let range = document.createRange();
    range.selectNodeContents(el);
    let sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  }

  const generateData = () => {
    let total = [];

    for (let i = 0; i < generate; i++) {
      let values = [];
      let names = [];
      cols.map(col => {
        let spcol = col.type.split("-");

        let generated = '';
        switch (col.type) {
          case "enum":
            generated = col.enums && col.enums.split(",")[Math.floor(Math.random() * (col.enums.split(",")).length)];
            break;

          case "null":
            generated = "null";
            break;

          case "fullname":
            generated = faker.fake(`{{name.firstName}} {{name.lastName}}`);
            break;

          case "datatype-float":
          case "datatype-number":
            generated = faker.datatype[`${spcol[1]}`]({
              min: Number(col.minValue) || undefined,
              max: Number(col.maxValue) || undefined,
            });
            break;

          case "date-between":
            generated = faker.date.between(col.minDate, col.maxDate);
            break;

          default:
            generated = faker.fake(`{{${spcol[0]}.${spcol[1]}}}`);
            break;
        }

        // Format values ``
        if (col.type == "datatype-boolean" || col.type == "datatype-number" || col.type == "datatype-float" || col.type == "null") {
          // nothing
        } else if (
          col.type.includes("date") && col.type != "date-month"
        ) {
          generated = `'${new Date(generated).toISOString()}'`;
        } else {
          if(!generated) generated = `''`;
          else generated = `'${generated.replace("'", "''")}'`;
        }

        // Email  
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

  const handleKeyDown = (e) => {
    if (e.code == 'Delete') {
      setCols([]);
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Peepo SQL Generator</title>
        <meta name="description" content="Peepo will help you generate random sql data" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <img src="peepo.gif" width={64} />
        <h1>{"<3"} TUKE</h1>
        <header>
          <label htmlFor="tableName">Table name: </label>
          <input name="tableName" maxLength={64} type="text" value={tableName} onChange={(e) => setTableName(e.target.value)} />
        </header>

        <hr />

        <div>
          <button onClick={() => setCols([...cols, { name: faker.database.column() + Math.floor(Math.random() * 9), type: options["custom"][0], order: cols.length + 1 }])}>+ Add col</button>
          <button onClick={() => setCols([])} className="button-secondary">Delete all cols</button>
        </div>
        <table>
          <tbody>
            {cols.sort((a, b) => a.order - b.order).map((col, idx) => (
              <tr
                className={idx === dragged ? "active" : ""}
                key={idx}
                tabIndex="0"
                draggable={true}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => switchElement(idx)}
                onDragStart={() => setDragged(idx)}
                onDragEnd={() => setDragged(null)}
              >
                <td>
                  <label htmlFor={"col-" + idx}>
                    <span className="item-delete" title="Delete col" onClick={() => removeCol(col.name)}>X</span>
                    {" "}Col name
                  </label>
                  <input name={"col-" + idx} maxLength={32} type="text" value={col.name} onChange={e => updateCol("name", e, idx)} />

                </td>
                <td>
                  <label htmlFor="type">Data type</label>
                  <select name="type" value={col.type} onChange={e => updateCol("type", e, idx)}>
                    {Object.keys(options).map((opt, idz) => (
                      <optgroup label={opt} key={idz}>
                        {options[opt].map((name, idy) => (
                          <option key={idy} value={name}>{name}</option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                  {col.type == "enum" && (
                    <div>
                      <span style={{ fontSize: "11px" }}>separator: comma ,</span>
                      <input type={"text"} placeholder="one,two,three" onChange={e => updateCol("enums", e, idx)} />
                    </div>
                  )}
                  {(col.type == "datatype-number" || col.type == "datatype-float") && (
                    <div>
                      <input type={"number"} placeholder="min val" onChange={e => updateCol("minValue", e, idx)} />
                      <input type={"number"} placeholder="max val" onChange={e => updateCol("maxValue", e, idx)} />
                    </div>
                  )}
                  {col.type == "date-between" && (
                    <div>
                      <input type={"date"} placeholder="min" onChange={e => updateCol("minDate", e, idx)} />
                      <input type={"date"} placeholder="max" onChange={e => updateCol("maxDate", e, idx)} />
                    </div>
                  )}
                </td>

              </tr>
            ))}
          </tbody>
        </table>

        <hr />

        <div>
          <div className="item">
            <label htmlFor="rowsToGenerate">Rows to generate: </label>
            <input name="rowsToGenerate" type="number" value={generate} onChange={(e) => setGenerate(e.target.value)} />
          </div>
          <div className="item">
            <label htmlFor="locale">Locale: </label>
            <select name="locale" value={activeLocale} onChange={e => setActiveLocale(e.target.value)}>
              {locales.map((opt, idz) => (
                <option key={idz} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          <button className="generate" onClick={generateData}>Generate data</button>
        </div>

        <hr />

        {cols.length > 0 && (
          <pre>
            <code onClick={e => selectContents(e.target)}>
              INSERT INTO {tableName} ({cols.map(col => col.name).join(", ")}) VALUES{"\n"}
              {generatedData.length > 0 ?
                generatedData.map((dat, idx) => (
                  <span key={idx}>
                    {"(\n"}
                    {"\t" + dat.join(", \n\t")}
                    {`\n)${generatedData.length - 1 != idx ? "," : ";"}\n`}
                  </span>
                ))
                : '();'}
            </code>
          </pre>
        )}
      </main>
      <small style={{
        fontSize: "8px"
      }}>Made with ❤️ by ReeG | Powered by faker</small>
    </>
  )
}
