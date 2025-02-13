import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Dashboard from "../../components/Dashboard";
import {
  renderWithContext,
  makeTestUserContext,
} from "../../__test-fixtures__/userContextTestHelper";
import { UserState } from "../../context/userContext";

jest.mock("next/router", () => require("next-router-mock"));

// mock header component
jest.mock("../../components/Header", () => {
  // eslint-disable-next-line react/display-name
  return () => <div></div>;
});

const mockUserContext: UserState = makeTestUserContext();

describe("Dashboard", () => {
  it("should render the header", async () => {
    renderWithContext(
      mockUserContext,
      <Dashboard activeTab="api-keys" authenticationStatus="authenticated">
        <div></div>
      </Dashboard>
    );
    const activeTab = screen.getByTestId("api-keys-tab");
    const notActiveTab = screen.getByTestId("scorer-tab");
    await waitFor(async () => {
      expect(activeTab).toHaveClass("border-gray-200 bg-white");
      expect(notActiveTab).toHaveClass("border-gray-100");
    });
  });
});
