const Tabs = ({activeTab, setActiveTab, children }) => {
  //탭을 유지하기 위해서 현재 어떤 lable인지 확인인
  const selectedTab = activeTab === 0 ? children[0].props.label : children[1].props.label;
  return (
    <div>
      <div className="tabs">
        <div className="tab-buttons">
          {children.map((child, index) => (
            <button
              key={child.props.label}
              //현재 선택된 탭 활성화화
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
        //활성화 된 tab의 내용 출력력
          child.props.label === selectedTab ? child : null
        )}
      </div>
    </div>
  );
};

export default Tabs;
