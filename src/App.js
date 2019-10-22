import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import jsPDF from 'jspdf';

function App() {
  const [download, setDownload] = useState({})
  const [dropdown, setDropdown] = useState(false)

  const toggleOpen = () => {
    setDropdown(!dropdown)
  }

  const onChange = (event) => {
    console.log(event.target.name, event.target.value)
    setDownload({
      ...download,
      [event.target.name]: event.target.value
    })
  }

  const downloadPdf = (value) => {
    let input = value.replace("↵", "\n")
    var doc = new jsPDF('portrait')
    doc.setFontSize(16);
    const inputTextArray = doc.splitTextToSize(input, 180);
    doc.text(inputTextArray, 10, 10);
    doc.save('a4.pdf');
  }

  const downloadText = (value) => {
    let input = value.replace("↵", "\n")
    const element = document.createElement("a");
    const file = new Blob([input], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "summarizedData.txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  }

  const downloadDoc = (value) => {
    let input = value.replace("↵", "\n")
    const element = document.createElement("a");
    const file = new Blob([input], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "summarizedData.doc";
    document.body.appendChild(element);
    element.click();
  }


  return (
    <div className="App">
      <div className="container">
        <div className="col-12">
          Download Content as PDF/Docs/Txt

        <div className="form-group">
            <p className="text-left" for="comment">Add the content:</p>
            <textarea
              className="form-control"
              rows="10"
              name="description"
              id="comment"
              onChange={onChange}
            // value={download.comment}
            ></textarea>
            <div className="dropdown text-right mt-50" onClick={toggleOpen}>
              <button
                className="btn btn-primary dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"

              >
                Download
        </button>
              <div className={`dropdown-menu ${dropdown ? " show dropdown-menu-right" : ""}`} aria-labelledby="dropdownMenuButton">
                <li className="dropdown-item" onClick={() => downloadPdf(download.description)}>
                  Pdf
          </li>
                <li className="dropdown-item" onClick={() => downloadDoc(download.description)}>
                  Docs
          </li>
                <li className="dropdown-item" onClick={() => downloadText(download.description)}>
                  Txt
          </li>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
