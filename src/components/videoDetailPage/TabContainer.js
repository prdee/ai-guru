import React from 'react';
import DescriptionTab from './tabs/DescriptionTab';
import NotesTab from './tabs/NotesTab';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';


function TabContainer() {
  const videoDetails = JSON.parse(localStorage.getItem('videoDetails'));
  return (
    <>
      <div className='tab-container mt-2 px-0 h-100'>
      {/* style={{maxHeight: '100%', overflowY: 'auto'}} */}
        <Tabs
          defaultActiveKey="description"
          id="uncontrolled-tab-example"
          // className="mb-3"
          style={{height: '35%'}}
        >
          <Tab eventKey="description" title="Description">
            <DescriptionTab data = {videoDetails?.description}/>
          </Tab>
          <Tab eventKey="notes" title="Notes">
            <NotesTab data = {videoDetails}/>
          </Tab>
        </Tabs>
      </div>  
    </>
  );
}

export default React.memo(TabContainer);
