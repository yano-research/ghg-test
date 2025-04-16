export const companies = [
    {
      id: "B0001",
      name: "日本製鉄株式会社",
      industry: "製造業",
      prefecture: "東京都",
      year: 2023,
      scopes: [
        { scope: 1, total_emission: 30000 },
        { scope: 2, total_emission: 22000, s2_base: "location" },
        { scope: 2, total_emission: 25000, s2_base: "market" },
        {
          scope: 3,
          total_emission: 65000,
          s3_categories: {
            c1: 12000,
            c2: 15000,
            c3: 8000,
          },
        },
      ],
    },
  ];