import React, { useState } from "react";

const Tabs = ({ children }) => {
  const [activeTab, setActiveTab] = useState(children[0].props.label);

  return (
    <div>
      <div className="tabs">
        <div className="tab-buttons">
          {children.map((child) => (
            <button
              key={child.props.label}
              className={`tab-button ${activeTab === child.props.label ? "active" : ""}`}
              onClick={() => setActiveTab(child.props.label)}
            >
              {child.props.label}
            </button>
          ))}
        </div>
      </div>
      <div className="tab-content">
        {children.map((child) =>
          child.props.label === activeTab ? child : null
        )}
      </div>
    </div>
  );
};

export default Tabs;
