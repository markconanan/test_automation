# SauceLabs UI Automation

This repo contains a Playwright UI automation framework for SauceLabs

# Requirements

- Node.js

# Test Scenarios

1. Login: Automate the login process on the website https://www.saucedemo.com/ using valid credentials.
2. Filter Products: Write automation scripts to filter products by price from low to high.
3. Add to Cart: Automate adding the first two items from the filtered list to the cart.
4. Checkout Process: Automate the checkout process, including the cart details page
   providing shipping details, and completing the purchase.

# Test Structure

The page objects and functions are structured in a similar way as to how a frontend codebase is structured, with the pageObjects in each page in its own file under /pages including the assertion functions.

# Test Data

Currently most test data is hardcoded in the code, but can be updated to use json and env files if going to be expanded.

# Installation

To run the tests, clone or download the zip of this repo then install the node modules using `npm install` in the terminal in the folder.

# Execution

- To execute the tests with UI, enter `npx playwright test --ui` in the terminal.

# [SauceLabs UI Automation Repo Link](https://github.com/markconanan/test_automation)
