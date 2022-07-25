jest.useFakeTimers();
import React from "react";
import renderer from 'react-test-renderer'
import Schedule from "../Schedule";



it("test Schedule page",  () => {
  const tree = renderer.create(<Schedule/>).toJSON();
  expect(tree).toMatchSnapshot()  

})
