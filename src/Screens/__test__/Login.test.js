
import React from "react";
import CreateAccount from "../CreateAccountPage";
import Login from "../LoginPage";
import renderer from 'react-test-renderer'
// jest.useFakeTimers('legacy')
// import {render}from "@testing-library/react-native"


it("test Login", async () => {
  const tree = renderer.create(<Login/>).toJSON();
  expect(tree).toMatchSnapshot()  

})

// it("render changing of text properly", async () => {
//   const {getByText} = render(<Login/>)
//   expect(1).toBe(1);
// })