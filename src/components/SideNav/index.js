// import styles from './styles.js';
import React from 'react';

import { useEffect, useRef, useState, useCallback, useContext } from 'react';
import clsx from 'clsx';

// import { getCredentials } from '../../api/fetchCreds';
// import { PreferencesContext } from '../../context/PreferencesContext';
// import { useSignalling } from '../../hooks/useSignalling';
import { apiKey, token, sessionId } from '../../config';
import TabContent from '../TabContent';

function SideNav({ layout, handleChangeTab, tabOpened, isSideNavOpened }) {
  const changeTab = (tab, event) => {
    console.log(event);
    handleChangeTab(tab);
  };

  useEffect(() => {
    if (layout) layout.layout();
  }, [layout, tabOpened, isSideNavOpened]);

  //   const { preferences } = useContext(PreferencesContext);

  return (
    <div className="Vlt-tabs list">
      <ul class="Vlt-tabs__header" role="tablist" aria-label="Example">
        <li
          role="tab"
          aria-selected="true"
          aria-controls="tab-one"
          tabindex="0"
          id="one"
          class="Vlt-tabs__link Vlt-tabs__link_active"
          className={clsx({
            'Vlt-tabs__link': true,
            'Vlt-tabs__link_active': tabOpened === 'one',
          })}
        >
          {/* <span>Chat</span> */}
          <span
            onClick={(event) => {
              changeTab('one');
              layout.layout();
            }}
            // onClick={handleChangeTab('one')}
          >
            Chat
          </span>
        </li>
        <li
          role="tab"
          aria-selected="false"
          aria-controls="tab-two"
          tabindex="-1"
          id="two"
          className={clsx({
            'Vlt-tabs__link': true,
            'Vlt-tabs__link_active': tabOpened === 'two',
          })}
        >
          <span
            // onClick={() => {
            //   setTabSelected('two');
            //   layout.layout();
            // }}
            onClick={() => {
              changeTab('two');
              layout.layout();
            }}
          >
            Whiteboard
          </span>
        </li>
        <li
          role="tab"
          aria-selected="false"
          aria-controls="tab-three"
          tabindex="-1"
          id="three"
          className={clsx({
            'Vlt-tabs__link': true,
            'Vlt-tabs__link_active': tabOpened === 'three',
          })}
        >
          <span
            onClick={() => {
              changeTab('three');
              layout.layout();
            }}
            // onClick={handleChangeTab('three')}
          >
            Doc editing
          </span>
        </li>
      </ul>
      <div class="Vlt-tabs__content">
        <div
          tabindex="0"
          role="tabpanel"
          id="tab-one"
          aria-labelledby="one"
          hidden="true"
          class="Vlt-tabs__panel Vlt-tabs__panel_active"
        ></div>
        <div
          tabindex="0"
          role="tabpanel"
          id="tab-two"
          aria-labelledby="two"
          hidden="false"
          class="Vlt-tabs__panel"
        ></div>
        <div
          tabindex="0"
          role="tabpanel"
          id="tab-disabled"
          aria-labelledby="disabled"
          hidden="false"
          class="Vlt-tabs__panel"
        ></div>
      </div>
      <TabContent tabSelected={tabOpened} />
    </div>
  );
}

export default SideNav;
