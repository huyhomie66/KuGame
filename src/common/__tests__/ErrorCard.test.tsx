import React from "react";

import TestRenderer from "../../helpers/testRenderer";
import ErrorCard from "../ErrorCard";

jest.mock("../../common/Icon", () => "Icon");
jest.useFakeTimers();

describe("ErrorCard", () => {
  it("renders correctly with a default message", () => {
    const props = {
      onRetry: jest.fn(),
    };
    const tree = TestRenderer(<ErrorCard {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("renders correctly with a custom message", () => {
    const props = {
      message: "$_MESSAGE_TEXT_$",
      onRetry: jest.fn(),
    };
    const tree = TestRenderer(<ErrorCard {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
