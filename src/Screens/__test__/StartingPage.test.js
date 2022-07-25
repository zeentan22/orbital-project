import React from "react";
import renderer from 'react-test-renderer'
import StartingPage from "../StartingPage";

// pass
it("test Starting page",  () => {
  const tree = renderer.create(<StartingPage/>).toJSON();
  expect(tree).toMatchSnapshot()  

})
