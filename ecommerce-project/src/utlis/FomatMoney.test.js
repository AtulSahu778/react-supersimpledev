import { it, expect } from "vitest";
import { FormatMoney } from "./FomatMoney";

it('format 1999 rupees as ₹1,999', () => {
    expect(FormatMoney(1999)).toBe('₹1,999');   
});