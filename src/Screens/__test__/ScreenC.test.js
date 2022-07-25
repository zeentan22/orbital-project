jest.useFakeTimers();
import React from "react";
// import Login from "../LoginPage";
import { Screenc } from "../Screen_C";
import renderer from 'react-test-renderer'

// pass
it("test Screenc page",  () => {
  const tree = renderer.create(<Screenc/>).toJSON();
  expect(tree).toMatchSnapshot()  

})
