function getServices() {
  return [
    { name: "Web", status: "up" },
    { name: "Database", status: "up" },
    { name: "Cache", status: "up" },
    { name: "Queue", status: "degraded" }
  ];
}

function countByStatus(services) {
  return services.reduce((acc, s) => {
    acc[s.status] = (acc[s.status] || 0) + 1;
    return acc;
  }, {});
}

module.exports = { getServices, countByStatus };
