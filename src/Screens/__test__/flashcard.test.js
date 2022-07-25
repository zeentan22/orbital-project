import React from "react";
import { FlashCard } from "../flashcard";
import renderer from 'react-test-renderer'

it("test flashcard page",  () => {
  const tree = renderer.create(<FlashCard/>).toJSON();
  expect(tree).toMatchSnapshot()  

})