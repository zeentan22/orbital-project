jest.useFakeTimers();
import React from "react";
import { convertDate, convertTime } from "../utils";

it("test convertDate function",  () => {
    test = convertDate(new Date("2016-02-29T07:00:00.000Z"))
    expect(test).toBe("2016-02-29")  
  })

it("test convertTime function", () => {
    test = convertTime(600)
    expect(test).toBe("10:00")  
})