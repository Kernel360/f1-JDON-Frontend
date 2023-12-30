import React, { useState } from "react";

export default function ToggleList() {
  const [showItem, setShowItem] = useState({});
  const toggleItem = (id) => (prevShowItem) => ({
    ...prevShowItem,
    [id]: !prevShowItem[id],
  });
  const list = [
    { id: 1, title: "FAQ" },
    { id: 2, title: "개인정보 수집 및 이용" },
    { id: 3, title: "서비스 이용 약관" },
  ];

  return (
    <div>
      {list.map((item) => (
        <div
          key={item.id}
          onClick={toggleItem(item.id)}
          style={{ cursor: "pointer", margin: "10 0", padding: 12 }}
        >
          {item.title}
        </div>
      ))}
      {Object.entries(showItem).map(([id, isOpen]) => (
        <div key={id}>{`Item ${id} is ${isOpen ? "open" : "closed"}`}</div>
      ))}
    </div>
  );
}
