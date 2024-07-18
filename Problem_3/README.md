# WalletPage Component Refactor

## Overview

This document outlines the refactoring of the `WalletPage` component. The original implementation had several computational inefficiencies and anti-patterns, which have been addressed in the refactored version. This README will detail the issues found and how they were resolved.

## Original Issues

### 1. Repeated Function Calls in Map and Filter

- **Problem**: `getPriority` was called multiple times for each balance within both the `filter` and `sort` functions.
- **Solution**: Store the priority of each balance in an object to avoid repeated calculations.

### 2. Incorrect Use of `useMemo`

- **Problem**: `useMemo` was used incorrectly. The sorting and filtering logic was dependent on `prices` which were not used within the sorting or filtering logic.
- **Solution**: Removed `prices` from the dependency array of `useMemo`.

### 3. Inefficient Sorting Logic

- **Problem**: The sorting logic used nested function calls to `getPriority`, adding extra computational overhead.
- **Solution**: Cached the priorities of balances to improve sorting performance.

### 4. Conditional Logic in `filter`

- **Problem**: The `filter` function had a nested `if` condition that was unnecessary and could be simplified.
- **Solution**: Simplified the filtering logic for clarity and efficiency.

### 5. Multiple Mapping of Balances

- **Problem**: The code mapped over `sortedBalances` twice, once to format the balances and once to create `rows`.
- **Solution**: Combined these operations into a single map.

### 6. Unnecessary Props Spread

- **Problem**: The component spread `rest` props into the `div` without clear need.
- **Solution**: Only passed necessary props to the `div`.

## Refactored Code