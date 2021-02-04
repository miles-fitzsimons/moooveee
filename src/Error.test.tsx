import React from "react";
import { shallow } from "enzyme";
import Error from "./Error";

it("renders correctly", () => {
  const component = shallow(<Error />);
  expect(component).toMatchSnapshot();
});
