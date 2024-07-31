import React, { useRef, useState } from 'react';
import jsPDF from 'jspdf';
import { getPdfData } from '../../../api/search';
import './notesTab.css';

const NotesTab = ({ data }) => {
  const notesData = useRef(null);
  const [downloadStatus, setDownloadStatus] = useState('idle');

  const generatePDF = (elementHTML, title) => {
    return new Promise((resolve, reject) => {
      const doc = new jsPDF();
      doc.html(elementHTML, {
        callback: function(doc) {
          try {
            doc.save(title + '.pdf');
            resolve();
          } catch (error) {
            reject(error);
          }
        },
        margin: [10, 10, 10, 10],
        autoPaging: 'text',
        x: 0,
        y: 0,
        width: 190,
        windowWidth: 675
      });
    });
  }

  const downloadPDF = async () => {
    setDownloadStatus('downloading');
    try {
      if (!notesData.current) {
        const apiData = JSON.parse(localStorage.getItem('apiData'));
        if (apiData) {
          const getPdfDataFromAPi = await getPdfData(apiData?.[0]);
          notesData.current = getPdfDataFromAPi[0];
        }
      }
      if (!notesData.current?.content) {
        throw new Error('No content available');
      }

      const htmlContent = notesData.current.content;
      const element = document.createElement('div');
      element.innerHTML = htmlContent;
      element.style.color = '#000000';

      await generatePDF(element, notesData.current?.title);
      setDownloadStatus('success');
    } catch (error) {
      console.error("Error downloading PDF:", error);
      setDownloadStatus('error');
    }
  };

  return (
    <div className="col-md-12">
      <div className="tab-content p-4 rounded text-break text-grey" id="notes">
        <div className='row'>
          <div className='col-md-10'>
            <h3 className="fw-bold mb-2">Notes</h3>
          </div>
          <div className='col-md-2'>
            <button
              className='btn download-notes-btn border-0'
              onClick={downloadPDF}
              disabled={downloadStatus === 'downloading'}
              style={{ width: '100%' }}
            >
              {downloadStatus === 'idle' && (
                <>Notes &nbsp;<i className="fas fa-download"></i></>
              )}
              {downloadStatus === 'downloading' && (
                <>Downloading... &nbsp;<i className="fas fa-spinner fa-spin"></i></>
              )}
              {downloadStatus === 'success' && (
                <>Downloaded &nbsp;<i className="fas fa-check-circle"></i></>
              )}
              {downloadStatus === 'error' && (
                <>Retry Download &nbsp;<i className="fas fa-exclamation-circle"></i></>
              )}
            </button>
          </div>
        </div>
        <div className='row mt-3'>
          <p className="text-gray-400">{data?.description}</p>
          <h4 className="text-lg fw-bold mt-4">Learner Objectives</h4>
          <ul className="list-disc list-inside">
            {data?.learner_objectives.map((objective, index) => (
              <li key={index} className="text-gray-400">{objective}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NotesTab;