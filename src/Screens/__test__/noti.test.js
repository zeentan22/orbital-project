import React from "react";
import renderer from 'react-test-renderer'
import SetNotifications from "../noti";

//pass
it("test notification page",  () => {
  const tree = renderer.create(<SetNotifications/>).toJSON();
  expect(tree).toMatchSnapshot()  

})