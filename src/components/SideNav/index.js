import React from 'react';

import { useEffect } from 'react';
import clsx from 'clsx';

import TabContent from '../TabContent';

function SideNav({
  layout,
  handleChangeTab,
  tabOpened,
  isSideNavOpened,
  sendChatMessage,
  messages,
}) {
  const changeTab = (tab, event) => {
    handleChangeTab(tab);
  };

  useEffect(() => {
    if (layout) layout.layout();
  }, [layout, tabOpened, isSideNavOpened]);

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
          onClick={(event) => {
            changeTab('one');
            layout.layout();
          }}
        >
          <span>Chat</span>
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
          onClick={() => {
            changeTab('two');
            layout.layout();
          }}
        >
          <span>Whiteboard</span>
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
          onClick={() => {
            changeTab('three');
            layout.layout();
          }}
        >
          <span>Doc editing</span>
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
      <TabContent
        sendChatMessage={sendChatMessage}
        tabSelected={tabOpened}
        messages={messages}
      />
    </div>
  );
}

export default SideNav;
