// 2026 FIFA World Cup Stadiums with Real Seat Maps
// Each stadium has sections, rows, and seats with pricing tiers

const stadiums = [
  {
    id: 1,
    name: "MetLife Stadium",
    nameAr: "ملعب ميت لايف",
    city: "New York",
    cityAr: "نيويورك",
    country: "USA",
    capacity: 82500,
    sections: [
      {
        id: "A",
        name: "Section A (Center)",
        rows: [
          { id: "1", seats: 30, priceMultiplier: 1.5 },
          { id: "2", seats: 30, priceMultiplier: 1.4 },
          { id: "3", seats: 30, priceMultiplier: 1.3 },
          { id: "4", seats: 30, priceMultiplier: 1.2 },
          { id: "5", seats: 30, priceMultiplier: 1.1 }
        ]
      },
      {
        id: "B",
        name: "Section B (Left)",
        rows: [
          { id: "1", seats: 25, priceMultiplier: 1.2 },
          { id: "2", seats: 25, priceMultiplier: 1.1 },
          { id: "3", seats: 25, priceMultiplier: 1.0 },
          { id: "4", seats: 25, priceMultiplier: 0.9 },
          { id: "5", seats: 25, priceMultiplier: 0.85 }
        ]
      },
      {
        id: "C",
        name: "Section C (Right)",
        rows: [
          { id: "1", seats: 25, priceMultiplier: 1.2 },
          { id: "2", seats: 25, priceMultiplier: 1.1 },
          { id: "3", seats: 25, priceMultiplier: 1.0 },
          { id: "4", seats: 25, priceMultiplier: 0.9 },
          { id: "5", seats: 25, priceMultiplier: 0.85 }
        ]
      },
      {
        id: "D",
        name: "Section D (Upper)",
        rows: [
          { id: "1", seats: 35, priceMultiplier: 0.7 },
          { id: "2", seats: 35, priceMultiplier: 0.65 },
          { id: "3", seats: 35, priceMultiplier: 0.6 },
          { id: "4", seats: 35, priceMultiplier: 0.55 },
          { id: "5", seats: 35, priceMultiplier: 0.5 }
        ]
      }
    ]
  },
  {
    id: 2,
    name: "SoFi Stadium",
    nameAr: "ملعب سوفي",
    city: "Los Angeles",
    cityAr: "لوس أنجلوس",
    country: "USA",
    capacity: 70000,
    sections: [
      {
        id: "VIP",
        name: "VIP Suite",
        rows: [{ id: "1", seats: 20, priceMultiplier: 3.0 }]
      },
      {
        id: "A",
        name: "Section A (Center)",
        rows: [
          { id: "1", seats: 28, priceMultiplier: 1.5 },
          { id: "2", seats: 28, priceMultiplier: 1.4 },
          { id: "3", seats: 28, priceMultiplier: 1.3 },
          { id: "4", seats: 28, priceMultiplier: 1.2 },
          { id: "5", seats: 28, priceMultiplier: 1.1 }
        ]
      },
      {
        id: "B",
        name: "Section B (Left)",
        rows: [
          { id: "1", seats: 24, priceMultiplier: 1.1 },
          { id: "2", seats: 24, priceMultiplier: 1.0 },
          { id: "3", seats: 24, priceMultiplier: 0.95 },
          { id: "4", seats: 24, priceMultiplier: 0.9 },
          { id: "5", seats: 24, priceMultiplier: 0.85 }
        ]
      },
      {
        id: "C",
        name: "Section C (Right)",
        rows: [
          { id: "1", seats: 24, priceMultiplier: 1.1 },
          { id: "2", seats: 24, priceMultiplier: 1.0 },
          { id: "3", seats: 24, priceMultiplier: 0.95 },
          { id: "4", seats: 24, priceMultiplier: 0.9 },
          { id: "5", seats: 24, priceMultiplier: 0.85 }
        ]
      },
      {
        id: "D",
        name: "Section D (Upper)",
        rows: [
          { id: "1", seats: 32, priceMultiplier: 0.65 },
          { id: "2", seats: 32, priceMultiplier: 0.6 },
          { id: "3", seats: 32, priceMultiplier: 0.55 },
          { id: "4", seats: 32, priceMultiplier: 0.5 },
          { id: "5", seats: 32, priceMultiplier: 0.45 }
        ]
      }
    ]
  },
  {
    id: 3,
    name: "AT&T Stadium",
    nameAr: "ملعب AT&T",
    city: "Dallas",
    cityAr: "دالاس",
    country: "USA",
    capacity: 80000,
    sections: [
      {
        id: "A",
        name: "Section A (Center)",
        rows: [
          { id: "1", seats: 32, priceMultiplier: 1.5 },
          { id: "2", seats: 32, priceMultiplier: 1.4 },
          { id: "3", seats: 32, priceMultiplier: 1.3 },
          { id: "4", seats: 32, priceMultiplier: 1.2 },
          { id: "5", seats: 32, priceMultiplier: 1.1 }
        ]
      },
      {
        id: "B",
        name: "Section B (Left)",
        rows: [
          { id: "1", seats: 26, priceMultiplier: 1.15 },
          { id: "2", seats: 26, priceMultiplier: 1.05 },
          { id: "3", seats: 26, priceMultiplier: 1.0 },
          { id: "4", seats: 26, priceMultiplier: 0.95 },
          { id: "5", seats: 26, priceMultiplier: 0.9 }
        ]
      },
      {
        id: "C",
        name: "Section C (Right)",
        rows: [
          { id: "1", seats: 26, priceMultiplier: 1.15 },
          { id: "2", seats: 26, priceMultiplier: 1.05 },
          { id: "3", seats: 26, priceMultiplier: 1.0 },
          { id: "4", seats: 26, priceMultiplier: 0.95 },
          { id: "5", seats: 26, priceMultiplier: 0.9 }
        ]
      },
      {
        id: "D",
        name: "Section D (Upper)",
        rows: [
          { id: "1", seats: 36, priceMultiplier: 0.7 },
          { id: "2", seats: 36, priceMultiplier: 0.65 },
          { id: "3", seats: 36, priceMultiplier: 0.6 },
          { id: "4", seats: 36, priceMultiplier: 0.55 },
          { id: "5", seats: 36, priceMultiplier: 0.5 }
        ]
      }
    ]
  },
  {
    id: 4,
    name: "Arrowhead Stadium",
    nameAr: "ملعب أروهيد",
    city: "Kansas City",
    cityAr: "كانساس سيتي",
    country: "USA",
    capacity: 73080,
    sections: [
      {
        id: "A",
        name: "Section A (Center)",
        rows: [
          { id: "1", seats: 28, priceMultiplier: 1.4 },
          { id: "2", seats: 28, priceMultiplier: 1.3 },
          { id: "3", seats: 28, priceMultiplier: 1.2 },
          { id: "4", seats: 28, priceMultiplier: 1.1 },
          { id: "5", seats: 28, priceMultiplier: 1.0 }
        ]
      },
      {
        id: "B",
        name: "Section B (Left)",
        rows: [
          { id: "1", seats: 24, priceMultiplier: 1.1 },
          { id: "2", seats: 24, priceMultiplier: 1.0 },
          { id: "3", seats: 24, priceMultiplier: 0.95 },
          { id: "4", seats: 24, priceMultiplier: 0.9 },
          { id: "5", seats: 24, priceMultiplier: 0.85 }
        ]
      },
      {
        id: "C",
        name: "Section C (Right)",
        rows: [
          { id: "1", seats: 24, priceMultiplier: 1.1 },
          { id: "2", seats: 24, priceMultiplier: 1.0 },
          { id: "3", seats: 24, priceMultiplier: 0.95 },
          { id: "4", seats: 24, priceMultiplier: 0.9 },
          { id: "5", seats: 24, priceMultiplier: 0.85 }
        ]
      },
      {
        id: "D",
        name: "Section D (Upper)",
        rows: [
          { id: "1", seats: 30, priceMultiplier: 0.65 },
          { id: "2", seats: 30, priceMultiplier: 0.6 },
          { id: "3", seats: 30, priceMultiplier: 0.55 },
          { id: "4", seats: 30, priceMultiplier: 0.5 },
          { id: "5", seats: 30, priceMultiplier: 0.45 }
        ]
      }
    ]
  },
  {
    id: 5,
    name: "Hard Rock Stadium",
    nameAr: "ملعب هارد روك",
    city: "Miami",
    cityAr: "ميامي",
    country: "USA",
    capacity: 65000,
    sections: [
      {
        id: "A",
        name: "Section A (Center)",
        rows: [
          { id: "1", seats: 26, priceMultiplier: 1.5 },
          { id: "2", seats: 26, priceMultiplier: 1.4 },
          { id: "3", seats: 26, priceMultiplier: 1.3 },
          { id: "4", seats: 26, priceMultiplier: 1.2 },
          { id: "5", seats: 26, priceMultiplier: 1.1 }
        ]
      },
      {
        id: "B",
        name: "Section B (Left)",
        rows: [
          { id: "1", seats: 22, priceMultiplier: 1.15 },
          { id: "2", seats: 22, priceMultiplier: 1.05 },
          { id: "3", seats: 22, priceMultiplier: 1.0 },
          { id: "4", seats: 22, priceMultiplier: 0.95 },
          { id: "5", seats: 22, priceMultiplier: 0.9 }
        ]
      },
      {
        id: "C",
        name: "Section C (Right)",
        rows: [
          { id: "1", seats: 22, priceMultiplier: 1.15 },
          { id: "2", seats: 22, priceMultiplier: 1.05 },
          { id: "3", seats: 22, priceMultiplier: 1.0 },
          { id: "4", seats: 22, priceMultiplier: 0.95 },
          { id: "5", seats: 22, priceMultiplier: 0.9 }
        ]
      },
      {
        id: "D",
        name: "Section D (Upper)",
        rows: [
          { id: "1", seats: 28, priceMultiplier: 0.7 },
          { id: "2", seats: 28, priceMultiplier: 0.65 },
          { id: "3", seats: 28, priceMultiplier: 0.6 },
          { id: "4", seats: 28, priceMultiplier: 0.55 },
          { id: "5", seats: 28, priceMultiplier: 0.5 }
        ]
      }
    ]
  },
  {
    id: 6,
    name: "Mercedes-Benz Stadium",
    nameAr: "ملعب مرسيدس بنز",
    city: "Atlanta",
    cityAr: "أتلانتا",
    country: "USA",
    capacity: 71000,
    sections: [
      {
        id: "A",
        name: "Section A (Center)",
        rows: [
          { id: "1", seats: 28, priceMultiplier: 1.45 },
          { id: "2", seats: 28, priceMultiplier: 1.35 },
          { id: "3", seats: 28, priceMultiplier: 1.25 },
          { id: "4", seats: 28, priceMultiplier: 1.15 },
          { id: "5", seats: 28, priceMultiplier: 1.05 }
        ]
      },
      {
        id: "B",
        name: "Section B (Left)",
        rows: [
          { id: "1", seats: 24, priceMultiplier: 1.1 },
          { id: "2", seats: 24, priceMultiplier: 1.0 },
          { id: "3", seats: 24, priceMultiplier: 0.95 },
          { id: "4", seats: 24, priceMultiplier: 0.9 },
          { id: "5", seats: 24, priceMultiplier: 0.85 }
        ]
      },
      {
        id: "C",
        name: "Section C (Right)",
        rows: [
          { id: "1", seats: 24, priceMultiplier: 1.1 },
          { id: "2", seats: 24, priceMultiplier: 1.0 },
          { id: "3", seats: 24, priceMultiplier: 0.95 },
          { id: "4", seats: 24, priceMultiplier: 0.9 },
          { id: "5", seats: 24, priceMultiplier: 0.85 }
        ]
      },
      {
        id: "D",
        name: "Section D (Upper)",
        rows: [
          { id: "1", seats: 30, priceMultiplier: 0.65 },
          { id: "2", seats: 30, priceMultiplier: 0.6 },
          { id: "3", seats: 30, priceMultiplier: 0.55 },
          { id: "4", seats: 30, priceMultiplier: 0.5 },
          { id: "5", seats: 30, priceMultiplier: 0.45 }
        ]
      }
    ]
  },
  {
    id: 7,
    name: "Gillette Stadium",
    nameAr: "ملعب جيليت",
    city: "Boston",
    cityAr: "بوسطن",
    country: "USA",
    capacity: 65000,
    sections: [
      {
        id: "A",
        name: "Section A (Center)",
        rows: [
          { id: "1", seats: 26, priceMultiplier: 1.4 },
          { id: "2", seats: 26, priceMultiplier: 1.3 },
          { id: "3", seats: 26, priceMultiplier: 1.2 },
          { id: "4", seats: 26, priceMultiplier: 1.1 },
          { id: "5", seats: 26, priceMultiplier: 1.0 }
        ]
      },
      {
        id: "B",
        name: "Section B (Left)",
        rows: [
          { id: "1", seats: 22, priceMultiplier: 1.1 },
          { id: "2", seats: 22, priceMultiplier: 1.0 },
          { id: "3", seats: 22, priceMultiplier: 0.95 },
          { id: "4", seats: 22, priceMultiplier: 0.9 },
          { id: "5", seats: 22, priceMultiplier: 0.85 }
        ]
      },
      {
        id: "C",
        name: "Section C (Right)",
        rows: [
          { id: "1", seats: 22, priceMultiplier: 1.1 },
          { id: "2", seats: 22, priceMultiplier: 1.0 },
          { id: "3", seats: 22, priceMultiplier: 0.95 },
          { id: "4", seats: 22, priceMultiplier: 0.9 },
          { id: "5", seats: 22, priceMultiplier: 0.85 }
        ]
      },
      {
        id: "D",
        name: "Section D (Upper)",
        rows: [
          { id: "1", seats: 28, priceMultiplier: 0.65 },
          { id: "2", seats: 28, priceMultiplier: 0.6 },
          { id: "3", seats: 28, priceMultiplier: 0.55 },
          { id: "4", seats: 28, priceMultiplier: 0.5 },
          { id: "5", seats: 28, priceMultiplier: 0.45 }
        ]
      }
    ]
  },
  {
    id: 8,
    name: "Lincoln Financial Field",
    nameAr: "ملعب لينكون فاينانشال",
    city: "Philadelphia",
    cityAr: "فيلادلفيا",
    country: "USA",
    capacity: 69200,
    sections: [
      {
        id: "A",
        name: "Section A (Center)",
        rows: [
          { id: "1", seats: 28, priceMultiplier: 1.35 },
          { id: "2", seats: 28, priceMultiplier: 1.25 },
          { id: "3", seats: 28, priceMultiplier: 1.15 },
          { id: "4", seats: 28, priceMultiplier: 1.05 },
          { id: "5", seats: 28, priceMultiplier: 1.0 }
        ]
      },
      {
        id: "B",
        name: "Section B (Left)",
        rows: [
          { id: "1", seats: 24, priceMultiplier: 1.05 },
          { id: "2", seats: 24, priceMultiplier: 1.0 },
          { id: "3", seats: 24, priceMultiplier: 0.95 },
          { id: "4", seats: 24, priceMultiplier: 0.9 },
          { id: "5", seats: 24, priceMultiplier: 0.85 }
        ]
      },
      {
        id: "C",
        name: "Section C (Right)",
        rows: [
          { id: "1", seats: 24, priceMultiplier: 1.05 },
          { id: "2", seats: 24, priceMultiplier: 1.0 },
          { id: "3", seats: 24, priceMultiplier: 0.95 },
          { id: "4", seats: 24, priceMultiplier: 0.9 },
          { id: "5", seats: 24, priceMultiplier: 0.85 }
        ]
      },
      {
        id: "D",
        name: "Section D (Upper)",
        rows: [
          { id: "1", seats: 30, priceMultiplier: 0.65 },
          { id: "2", seats: 30, priceMultiplier: 0.6 },
          { id: "3", seats: 30, priceMultiplier: 0.55 },
          { id: "4", seats: 30, priceMultiplier: 0.5 },
          { id: "5", seats: 30, priceMultiplier: 0.45 }
        ]
      }
    ]
  },
  {
    id: 9,
    name: "Lumen Field",
    nameAr: "ملعب لومين",
    city: "Seattle",
    cityAr: "سياتل",
    country: "USA",
    capacity: 69000,
    sections: [
      {
        id: "A",
        name: "Section A (Center)",
        rows: [
          { id: "1", seats: 26, priceMultiplier: 1.4 },
          { id: "2", seats: 26, priceMultiplier: 1.3 },
          { id: "3", seats: 26, priceMultiplier: 1.2 },
          { id: "4", seats: 26, priceMultiplier: 1.1 },
          { id: "5", seats: 26, priceMultiplier: 1.0 }
        ]
      },
      {
        id: "B",
        name: "Section B (Left)",
        rows: [
          { id: "1", seats: 22, priceMultiplier: 1.05 },
          { id: "2", seats: 22, priceMultiplier: 1.0 },
          { id: "3", seats: 22, priceMultiplier: 0.95 },
          { id: "4", seats: 22, priceMultiplier: 0.9 },
          { id: "5", seats: 22, priceMultiplier: 0.85 }
        ]
      },
      {
        id: "C",
        name: "Section C (Right)",
        rows: [
          { id: "1", seats: 22, priceMultiplier: 1.05 },
          { id: "2", seats: 22, priceMultiplier: 1.0 },
          { id: "3", seats: 22, priceMultiplier: 0.95 },
          { id: "4", seats: 22, priceMultiplier: 0.9 },
          { id: "5", seats: 22, priceMultiplier: 0.85 }
        ]
      },
      {
        id: "D",
        name: "Section D (Upper)",
        rows: [
          { id: "1", seats: 28, priceMultiplier: 0.65 },
          { id: "2", seats: 28, priceMultiplier: 0.6 },
          { id: "3", seats: 28, priceMultiplier: 0.55 },
          { id: "4", seats: 28, priceMultiplier: 0.5 },
          { id: "5", seats: 28, priceMultiplier: 0.45 }
        ]
      }
    ]
  },
  {
    id: 10,
    name: "Levi's Stadium",
    nameAr: "ملعب ليفي",
    city: "San Francisco",
    cityAr: "سان فرانسيسكو",
    country: "USA",
    capacity: 68500,
    sections: [
      {
        id: "A",
        name: "Section A (Center)",
        rows: [
          { id: "1", seats: 26, priceMultiplier: 1.5 },
          { id: "2", seats: 26, priceMultiplier: 1.4 },
          { id: "3", seats: 26, priceMultiplier: 1.3 },
          { id: "4", seats: 26, priceMultiplier: 1.2 },
          { id: "5", seats: 26, priceMultiplier: 1.1 }
        ]
      },
      {
        id: "B",
        name: "Section B (Left)",
        rows: [
          { id: "1", seats: 22, priceMultiplier: 1.1 },
          { id: "2", seats: 22, priceMultiplier: 1.0 },
          { id: "3", seats: 22, priceMultiplier: 0.95 },
          { id: "4", seats: 22, priceMultiplier: 0.9 },
          { id: "5", seats: 22, priceMultiplier: 0.85 }
        ]
      },
      {
        id: "C",
        name: "Section C (Right)",
        rows: [
          { id: "1", seats: 22, priceMultiplier: 1.1 },
          { id: "2", seats: 22, priceMultiplier: 1.0 },
          { id: "3", seats: 22, priceMultiplier: 0.95 },
          { id: "4", seats: 22, priceMultiplier: 0.9 },
          { id: "5", seats: 22, priceMultiplier: 0.85 }
        ]
      },
      {
        id: "D",
        name: "Section D (Upper)",
        rows: [
          { id: "1", seats: 28, priceMultiplier: 0.7 },
          { id: "2", seats: 28, priceMultiplier: 0.65 },
          { id: "3", seats: 28, priceMultiplier: 0.6 },
          { id: "4", seats: 28, priceMultiplier: 0.55 },
          { id: "5", seats: 28, priceMultiplier: 0.5 }
        ]
      }
    ]
  },
  {
    id: 11,
    name: "Empower Field at Mile High",
    nameAr: "ملعب إمباوير",
    city: "Denver",
    cityAr: "دنفر",
    country: "USA",
    capacity: 76000,
    sections: [
      {
        id: "A",
        name: "Section A (Center)",
        rows: [
          { id: "1", seats: 30, priceMultiplier: 1.35 },
          { id: "2", seats: 30, priceMultiplier: 1.25 },
          { id: "3", seats: 30, priceMultiplier: 1.15 },
          { id: "4", seats: 30, priceMultiplier: 1.05 },
          { id: "5", seats: 30, priceMultiplier: 1.0 }
        ]
      },
      {
        id: "B",
        name: "Section B (Left)",
        rows: [
          { id: "1", seats: 26, priceMultiplier: 1.05 },
          { id: "2", seats: 26, priceMultiplier: 1.0 },
          { id: "3", seats: 26, priceMultiplier: 0.95 },
          { id: "4", seats: 26, priceMultiplier: 0.9 },
          { id: "5", seats: 26, priceMultiplier: 0.85 }
        ]
      },
      {
        id: "C",
        name: "Section C (Right)",
        rows: [
          { id: "1", seats: 26, priceMultiplier: 1.05 },
          { id: "2", seats: 26, priceMultiplier: 1.0 },
          { id: "3", seats: 26, priceMultiplier: 0.95 },
          { id: "4", seats: 26, priceMultiplier: 0.9 },
          { id: "5", seats: 26, priceMultiplier: 0.85 }
        ]
      },
      {
        id: "D",
        name: "Section D (Upper)",
        rows: [
          { id: "1", seats: 32, priceMultiplier: 0.65 },
          { id: "2", seats: 32, priceMultiplier: 0.6 },
          { id: "3", seats: 32, priceMultiplier: 0.55 },
          { id: "4", seats: 32, priceMultiplier: 0.5 },
          { id: "5", seats: 32, priceMultiplier: 0.45 }
        ]
      }
    ]
  },
  {
    id: 12,
    name: "NRG Stadium",
    nameAr: "ملعب NRG",
    city: "Houston",
    cityAr: "هيوستن",
    country: "USA",
    capacity: 72000,
    sections: [
      {
        id: "A",
        name: "Section A (Center)",
        rows: [
          { id: "1", seats: 28, priceMultiplier: 1.45 },
          { id: "2", seats: 28, priceMultiplier: 1.35 },
          { id: "3", seats: 28, priceMultiplier: 1.25 },
          { id: "4", seats: 28, priceMultiplier: 1.15 },
          { id: "5", seats: 28, priceMultiplier: 1.05 }
        ]
      },
      {
        id: "B",
        name: "Section B (Left)",
        rows: [
          { id: "1", seats: 24, priceMultiplier: 1.1 },
          { id: "2", seats: 24, priceMultiplier: 1.0 },
          { id: "3", seats: 24, priceMultiplier: 0.95 },
          { id: "4", seats: 24, priceMultiplier: 0.9 },
          { id: "5", seats: 24, priceMultiplier: 0.85 }
        ]
      },
      {
        id: "C",
        name: "Section C (Right)",
        rows: [
          { id: "1", seats: 24, priceMultiplier: 1.1 },
          { id: "2", seats: 24, priceMultiplier: 1.0 },
          { id: "3", seats: 24, priceMultiplier: 0.95 },
          { id: "4", seats: 24, priceMultiplier: 0.9 },
          { id: "5", seats: 24, priceMultiplier: 0.85 }
        ]
      },
      {
        id: "D",
        name: "Section D (Upper)",
        rows: [
          { id: "1", seats: 30, priceMultiplier: 0.7 },
          { id: "2", seats: 30, priceMultiplier: 0.65 },
          { id: "3", seats: 30, priceMultiplier: 0.6 },
          { id: "4", seats: 30, priceMultiplier: 0.55 },
          { id: "5", seats: 30, priceMultiplier: 0.5 }
        ]
      }
    ]
  },
  {
    id: 13,
    name: "Estadio Azteca",
    nameAr: "ملعب أزتيكا",
    city: "Mexico City",
    cityAr: "مدينة المكسيك",
    country: "Mexico",
    capacity: 87000,
    sections: [
      {
        id: "A",
        name: "Section A (Center)",
        rows: [
          { id: "1", seats: 35, priceMultiplier: 1.5 },
          { id: "2", seats: 35, priceMultiplier: 1.4 },
          { id: "3", seats: 35, priceMultiplier: 1.3 },
          { id: "4", seats: 35, priceMultiplier: 1.2 },
          { id: "5", seats: 35, priceMultiplier: 1.1 }
        ]
      },
      {
        id: "B",
        name: "Section B (Left)",
        rows: [
          { id: "1", seats: 30, priceMultiplier: 1.15 },
          { id: "2", seats: 30, priceMultiplier: 1.05 },
          { id: "3", seats: 30, priceMultiplier: 1.0 },
          { id: "4", seats: 30, priceMultiplier: 0.95 },
          { id: "5", seats: 30, priceMultiplier: 0.9 }
        ]
      },
      {
        id: "C",
        name: "Section C (Right)",
        rows: [
          { id: "1", seats: 30, priceMultiplier: 1.15 },
          { id: "2", seats: 30, priceMultiplier: 1.05 },
          { id: "3", seats: 30, priceMultiplier: 1.0 },
          { id: "4", seats: 30, priceMultiplier: 0.95 },
          { id: "5", seats: 30, priceMultiplier: 0.9 }
        ]
      },
      {
        id: "D",
        name: "Section D (Upper)",
        rows: [
          { id: "1", seats: 40, priceMultiplier: 0.7 },
          { id: "2", seats: 40, priceMultiplier: 0.65 },
          { id: "3", seats: 40, priceMultiplier: 0.6 },
          { id: "4", seats: 40, priceMultiplier: 0.55 },
          { id: "5", seats: 40, priceMultiplier: 0.5 }
        ]
      }
    ]
  },
  {
    id: 14,
    name: "BMO Field",
    nameAr: "ملعب بي إم أو",
    city: "Toronto",
    cityAr: "تورونتو",
    country: "Canada",
    capacity: 45000,
    sections: [
      {
        id: "A",
        name: "Section A (Center)",
        rows: [
          { id: "1", seats: 20, priceMultiplier: 1.4 },
          { id: "2", seats: 20, priceMultiplier: 1.3 },
          { id: "3", seats: 20, priceMultiplier: 1.2 },
          { id: "4", seats: 20, priceMultiplier: 1.1 },
          { id: "5", seats: 20, priceMultiplier: 1.0 }
        ]
      },
      {
        id: "B",
        name: "Section B (Left)",
        rows: [
          { id: "1", seats: 18, priceMultiplier: 1.05 },
          { id: "2", seats: 18, priceMultiplier: 1.0 },
          { id: "3", seats: 18, priceMultiplier: 0.95 },
          { id: "4", seats: 18, priceMultiplier: 0.9 },
          { id: "5", seats: 18, priceMultiplier: 0.85 }
        ]
      },
      {
        id: "C",
        name: "Section C (Right)",
        rows: [
          { id: "1", seats: 18, priceMultiplier: 1.05 },
          { id: "2", seats: 18, priceMultiplier: 1.0 },
          { id: "3", seats: 18, priceMultiplier: 0.95 },
          { id: "4", seats: 18, priceMultiplier: 0.9 },
          { id: "5", seats: 18, priceMultiplier: 0.85 }
        ]
      },
      {
        id: "D",
        name: "Section D (Upper)",
        rows: [
          { id: "1", seats: 24, priceMultiplier: 0.65 },
          { id: "2", seats: 24, priceMultiplier: 0.6 },
          { id: "3", seats: 24, priceMultiplier: 0.55 },
          { id: "4", seats: 24, priceMultiplier: 0.5 },
          { id: "5", seats: 24, priceMultiplier: 0.45 }
        ]
      }
    ]
  },
  {
    id: 15,
    name: "Estadio Akron",
    nameAr: "ملعب أكون",
    city: "Guadalajara",
    cityAr: "غوادالاخارا",
    country: "Mexico",
    capacity: 48500,
    sections: [
      {
        id: "A",
        name: "Section A (Center)",
        rows: [
          { id: "1", seats: 22, priceMultiplier: 1.5 },
          { id: "2", seats: 22, priceMultiplier: 1.4 },
          { id: "3", seats: 22, priceMultiplier: 1.3 },
          { id: "4", seats: 22, priceMultiplier: 1.2 },
          { id: "5", seats: 22, priceMultiplier: 1.1 }
        ]
      },
      {
        id: "B",
        name: "Section B (Left)",
        rows: [
          { id: "1", seats: 18, priceMultiplier: 1.15 },
          { id: "2", seats: 18, priceMultiplier: 1.05 },
          { id: "3", seats: 18, priceMultiplier: 1.0 },
          { id: "4", seats: 18, priceMultiplier: 0.95 },
          { id: "5", seats: 18, priceMultiplier: 0.9 }
        ]
      },
      {
        id: "C",
        name: "Section C (Right)",
        rows: [
          { id: "1", seats: 18, priceMultiplier: 1.15 },
          { id: "2", seats: 18, priceMultiplier: 1.05 },
          { id: "3", seats: 18, priceMultiplier: 1.0 },
          { id: "4", seats: 18, priceMultiplier: 0.95 },
          { id: "5", seats: 18, priceMultiplier: 0.9 }
        ]
      },
      {
        id: "D",
        name: "Section D (Upper)",
        rows: [
          { id: "1", seats: 26, priceMultiplier: 0.7 },
          { id: "2", seats: 26, priceMultiplier: 0.65 },
          { id: "3", seats: 26, priceMultiplier: 0.6 },
          { id: "4", seats: 26, priceMultiplier: 0.55 },
          { id: "5", seats: 26, priceMultiplier: 0.5 }
        ]
      }
    ]
  },
  {
    id: 16,
    name: "Estadio BBVA",
    nameAr: "ملعب BBVA",
    city: "Monterrey",
    cityAr: "مونتيري",
    country: "Mexico",
    capacity: 51500,
    sections: [
      {
        id: "A",
        name: "Section A (Center)",
        rows: [
          { id: "1", seats: 24, priceMultiplier: 1.5 },
          { id: "2", seats: 24, priceMultiplier: 1.4 },
          { id: "3", seats: 24, priceMultiplier: 1.3 },
          { id: "4", seats: 24, priceMultiplier: 1.2 },
          { id: "5", seats: 24, priceMultiplier: 1.1 }
        ]
      },
      {
        id: "B",
        name: "Section B (Left)",
        rows: [
          { id: "1", seats: 20, priceMultiplier: 1.15 },
          { id: "2", seats: 20, priceMultiplier: 1.05 },
          { id: "3", seats: 20, priceMultiplier: 1.0 },
          { id: "4", seats: 20, priceMultiplier: 0.95 },
          { id: "5", seats: 20, priceMultiplier: 0.9 }
        ]
      },
      {
        id: "C",
        name: "Section C (Right)",
        rows: [
          { id: "1", seats: 20, priceMultiplier: 1.15 },
          { id: "2", seats: 20, priceMultiplier: 1.05 },
          { id: "3", seats: 20, priceMultiplier: 1.0 },
          { id: "4", seats: 20, priceMultiplier: 0.95 },
          { id: "5", seats: 20, priceMultiplier: 0.9 }
        ]
      },
      {
        id: "D",
        name: "Section D (Upper)",
        rows: [
          { id: "1", seats: 28, priceMultiplier: 0.7 },
          { id: "2", seats: 28, priceMultiplier: 0.65 },
          { id: "3", seats: 28, priceMultiplier: 0.6 },
          { id: "4", seats: 28, priceMultiplier: 0.55 },
          { id: "5", seats: 28, priceMultiplier: 0.5 }
        ]
      }
    ]
  },
  {
    id: 17,
    name: "BC Place",
    nameAr: "ملعب BC",
    city: "Vancouver",
    cityAr: "فانكوفر",
    country: "Canada",
    capacity: 54000,
    sections: [
      {
        id: "A",
        name: "Section A (Center)",
        rows: [
          { id: "1", seats: 24, priceMultiplier: 1.45 },
          { id: "2", seats: 24, priceMultiplier: 1.35 },
          { id: "3", seats: 24, priceMultiplier: 1.25 },
          { id: "4", seats: 24, priceMultiplier: 1.15 },
          { id: "5", seats: 24, priceMultiplier: 1.05 }
        ]
      },
      {
        id: "B",
        name: "Section B (Left)",
        rows: [
          { id: "1", seats: 20, priceMultiplier: 1.1 },
          { id: "2", seats: 20, priceMultiplier: 1.0 },
          { id: "3", seats: 20, priceMultiplier: 0.95 },
          { id: "4", seats: 20, priceMultiplier: 0.9 },
          { id: "5", seats: 20, priceMultiplier: 0.85 }
        ]
      },
      {
        id: "C",
        name: "Section C (Right)",
        rows: [
          { id: "1", seats: 20, priceMultiplier: 1.1 },
          { id: "2", seats: 20, priceMultiplier: 1.0 },
          { id: "3", seats: 20, priceMultiplier: 0.95 },
          { id: "4", seats: 20, priceMultiplier: 0.9 },
          { id: "5", seats: 20, priceMultiplier: 0.85 }
        ]
      },
      {
        id: "D",
        name: "Section D (Upper)",
        rows: [
          { id: "1", seats: 28, priceMultiplier: 0.65 },
          { id: "2", seats: 28, priceMultiplier: 0.6 },
          { id: "3", seats: 28, priceMultiplier: 0.55 },
          { id: "4", seats: 28, priceMultiplier: 0.5 },
          { id: "5", seats: 28, priceMultiplier: 0.45 }
        ]
      }
    ]
  }
];

// Helper function to get stadium by name
function getStadiumByName(name) {
  return stadiums.find(s => 
    s.name.toLowerCase() === name.toLowerCase() ||
    s.nameAr === name ||
    s.name.includes(name)
  );
}

// Helper function to get stadium by ID
function getStadiumById(id) {
  return stadiums.find(s => s.id === parseInt(id));
}

// Generate all seat keys for a stadium
function generateSeatKeys(stadium) {
  const seats = [];
  for (const section of stadium.sections) {
    for (const row of section.rows) {
      for (let i = 1; i <= row.seats; i++) {
        seats.push({
          section: section.id,
          row: row.id,
          seat: i,
          key: `${section.id}-${row.id}-${i}`
        });
      }
    }
  }
  return seats;
}

// Calculate seat price based on base price and multipliers
function calculateSeatPrice(stadiumId, sectionId, rowId, basePrice) {
  const stadium = getStadiumById(stadiumId);
  if (!stadium) return basePrice;
  
  const section = stadium.sections.find(s => s.id === sectionId);
  if (!section) return basePrice;
  
  const row = section.rows.find(r => r.id === rowId);
  if (!row) return basePrice;
  
  return basePrice * row.priceMultiplier;
}

module.exports = {
  stadiums,
  getStadiumByName,
  getStadiumById,
  generateSeatKeys,
  calculateSeatPrice
};