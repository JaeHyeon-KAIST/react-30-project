import React from 'react';
import SortableList from "@leejaehyeon/sortable-list"
import {data} from "./TestItem/testData"
import TestItem from "./TestItem/TestItem"

function App() {
  const onClickItem = (index) => alert(index);
  const onDropItem = (newList) => console.log(newList);
  return (
    <SortableList
    data={data}
    renderItem={(item, index) => <TestItem data={item} index={index} />}
    onDropItem={onDropItem}
    onClickItem={onClickItem}
    />
  );
}

export default App;