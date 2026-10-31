# SauceDemo - Manual Test Scenarios

| ID | Area | Scenario | Type | Expected result |
|---|---|---|---|---|
| LOGIN-001 | Login | Login with valid standard user | Positive | User lands on Products page |
| LOGIN-002 | Login | Login with invalid password | Negative | Error message is displayed |
| LOGIN-003 | Login | Submit with empty username | Negative | Username-required error is displayed |
| LOGIN-004 | Login | Submit with empty password | Negative | Password-required error is displayed |
| LOGIN-005 | Login | Login with locked-out user | Negative | Locked-out error is displayed |
| INV-001 | Inventory | Display products | Functional | Six products are visible |
| INV-002 | Inventory | Add product to cart | Functional | Cart badge increments and product is in cart |
| INV-003 | Inventory | Remove product from inventory | Functional | Product is removed from cart |
| INV-004 | Inventory | Sort products A to Z | Functional | Product names are alphabetically ordered |
| INV-005 | Inventory | Sort products by price ascending | Functional | Prices are ordered low to high |
| CART-001 | Cart | Verify selected item in cart | Functional | Correct product is displayed |
| CART-002 | Cart | Continue shopping | Navigation | User returns to inventory |
| CHK-001 | Checkout | Complete purchase | End-to-end | Order confirmation is displayed |
| CHK-002 | Checkout | Checkout without first name | Negative | First-name validation error is displayed |
| CHK-003 | Checkout | Checkout without postal code | Negative | Postal-code validation error is displayed |

