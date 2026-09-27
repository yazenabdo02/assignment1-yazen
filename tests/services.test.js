const { getServices, countByStatus } = require("../src/services");

describe("services (unit)", () => {
  test("getServices returns a non-empty list with name + status", () => {
    const list = getServices();
    expect(Array.isArray(list)).toBe(true);
    expect(list.length).toBeGreaterThan(0);
    for (const s of list) {
      expect(typeof s.name).toBe("string");
      expect(typeof s.status).toBe("string");
    }
  });

  test("countByStatus tallies statuses", () => {
    const counts = countByStatus([
      { name: "a", status: "up" },
      { name: "b", status: "up" },
      { name: "c", status: "degraded" }
    ]);
    expect(counts.up).toBe(2);
    expect(counts.degraded).toBe(1);
  });
});
