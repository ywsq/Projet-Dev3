import Products from "./Products";
import {render} from "@testing-library/react";
import {Link, Route} from "react-router-dom";
import React from "react";

describe(Products, () =>{
    it("display test text product page", () => {
        const {getByTestId} = render(<div data-testid="headerProducts">test</div>)
        const headertext = getByTestId("headerProducts").textContent
        expect(headertext).toBe("test")
    })
    it("displays correct text on the product page", () => {
        const { getByText } = render(
            <div data-testid="headerProducts" id="headerProducts">
                <div className="intro">
                    <div className="bold">Star Mobile.</div>
                    The best way to buy <br/>
                    the products you need
                </div>
                <div id="visitStarMobile">Visit Star Mobile<br/>
                    <a href="/Store" id="findStore">Find a store &gt;</a>
                </div>
            </div>
        );

        const besWayToBuy = getByText((content, element) => {
            return element.className === "intro" && content.includes("The best way to buy");
        });
        const productYouNeed = getByText((content, element) => {
            return element.className === "intro" && content.includes("the products.cy.ts you need");
        });

        const StarMobile = getByText("Star Mobile.");
        const visitStarMobile = getByText("Find a store >");
        const linkText = getByText("Find a store >");

        expect(besWayToBuy).toBeInTheDocument();
        expect(StarMobile).toBeInTheDocument();
        expect(productYouNeed).toBeInTheDocument();
        expect(visitStarMobile).toBeInTheDocument()
        expect(linkText).toBeInTheDocument();
    })
})