import React from "react";
import renderer from "react-test-renderer"
import Loading from "../Loading"

it("test loading page",()=>{
    const tree = renderer.create(<Loading/>).toJSON();
    expect(tree).toMatchSnapshot()
})