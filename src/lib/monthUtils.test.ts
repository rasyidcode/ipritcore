import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  addMonths,
  formatMonthLabel,
  getMonthStart,
  toMonthParam,
} from "./monthUtils";

describe("getMonthStart", () => {
  const fallbackDate = new Date(2026, 4, 14);

  it("returns the first day for a valid month param", () => {
    const date = getMonthStart("2025-03", fallbackDate);

    assert.equal(date.getFullYear(), 2025);
    assert.equal(date.getMonth(), 2);
    assert.equal(date.getDate(), 1);
  });

  it("falls back to the fallback month when the param is missing", () => {
    assert.equal(toMonthParam(getMonthStart(undefined, fallbackDate)), "2026-05");
  });

  it("falls back to the fallback month when the param is invalid", () => {
    assert.equal(toMonthParam(getMonthStart("2026-13", fallbackDate)), "2026-05");
    assert.equal(toMonthParam(getMonthStart("May 2026", fallbackDate)), "2026-05");
  });
});

describe("addMonths", () => {
  it("moves across year boundaries", () => {
    assert.equal(toMonthParam(addMonths(new Date(2025, 11, 1), 1)), "2026-01");
    assert.equal(toMonthParam(addMonths(new Date(2026, 0, 1), -1)), "2025-12");
  });
});

describe("toMonthParam", () => {
  it("formats dates as YYYY-MM", () => {
    assert.equal(toMonthParam(new Date(2026, 4, 14)), "2026-05");
  });
});

describe("formatMonthLabel", () => {
  it("formats month labels for Indonesian users", () => {
    assert.equal(formatMonthLabel(new Date(2026, 4, 1)), "Mei 2026");
  });
});
