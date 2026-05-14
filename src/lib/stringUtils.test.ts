import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { formatIdr, parseIdr } from "./stringUtils";

describe("formatIdr", () => {
  it("formats numeric values as Indonesian Rupiah without decimals", () => {
    assert.equal(formatIdr(1250000), "Rp\u00A01.250.000");
  });

  it("formats string input using the same currency formatter", () => {
    assert.equal(formatIdr("1.250.000"), "Rp\u00A01.250.000");
  });

  it("formats invalid string input as zero Rupiah", () => {
    assert.equal(formatIdr("abc"), "Rp\u00A00");
  });
});

describe("parseIdr", () => {
  it("parses formatted Rupiah strings into integer values", () => {
    assert.equal(parseIdr("Rp1.250.000"), 1250000);
  });

  it("parses user input that includes separators and spaces", () => {
    assert.equal(parseIdr("Rp 45.000"), 45000);
  });
});
