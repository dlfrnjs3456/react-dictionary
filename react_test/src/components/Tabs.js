const Tabs = ({activeTab, setActiveTab, children }) => {
  const selectedTab = activeTab === 0 ? children[0].props.label : children[1].props.label;
  return (
    <div>
      <div className="tabs">
        <div className="tab-buttons">
          {children.map((child, index) => (
            <button
              key={child.props.label}
              className={`tab-button ${selectedTab === child.props.label ? "active" : ""}`}
              onClick={() => setActiveTab(index)}
            >
              {child.props.label}
            </button>
          ))}
        </div>
      </div>
      <div className="tab-content">
        {children.map((child) =>
          child.props.label === selectedTab ? child : null
        )}
      </div>
    </div>
  );
};

export default Tabs;
