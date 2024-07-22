import { db } from "../src/database";
import bcrypt from "bcrypt";

interface Province {
  province: string;
  districts: string[];
}

const provinces: Province[] = [
  {
    province: "Maputo Cidade",
    districts: ["Maputo"],
  },
  {
    province: "Maputo Provincia",
    districts: [
      "Boane",
      "Magude",
      "Manhiça",
      "Marracuene",
      "Matola",
      "Matutuíne",
      "Moamba",
      "Namaacha",
    ],
  },
  {
    province: "Gaza",
    districts: [
      "Bilene",
      "Chibuto",
      "Chicualacuala",
      "Chigubo",
      "Chokwe",
      "Guija",
      "Limpopo",
      "Mabalane",
      "Manjacaze",
      "Massangena",
      "Massingir",
      "Xai-Xai",
    ],
  },
  {
    province: "Inhambane",
    districts: [
      "Funhalouro",
      "Govuro",
      "Homoine",
      "Inharrime",
      "Inhassoro",
      "Jangamo",
      "Mabote",
      "Massinga",
      "Maxixe",
      "Morrumbene",
      "Panda",
      "Vilankulo",
      "Zavala",
    ],
  },
  {
    province: "Sofala",
    districts: [
      "Beira",
      "Buzi",
      "Caia",
      "Chemba",
      "Cheringoma",
      "Dondo",
      "Gorongosa",
      "Maringue",
      "Marromeu",
      "Muanza",
      "Nhamatanda",
    ],
  },
  {
    province: "Manica",
    districts: [
      "Bárue",
      "Chimoio",
      "Gondola",
      "Guro",
      "Machaze",
      "Macossa",
      "Manica",
      "Mossurize",
      "Sussundenga",
      "Tambara",
    ],
  },
  {
    province: "Tete",
    districts: [
      "Angónia",
      "Cahora-Bassa",
      "Changara",
      "Chifunde",
      "Chiuta",
      "Macanga",
      "Magoe",
      "Maravia",
      "Moatize",
      "Mutarara",
      "Tsangano",
      "Tete",
      "Zumbo",
    ],
  },
  {
    province: "Zambézia",
    districts: [
      "Alto Molocué",
      "Chinde",
      "Derre",
      "Gilé",
      "Gurué",
      "Ile",
      "Inhassunge",
      "Lugela",
      "Maganja da Costa",
      "Milange",
      "Mocuba",
      "Mopeia",
      "Morrumbala",
      "Mulevala",
      "Namacurra",
      "Namarroi",
      "Nicoadala",
      "Pebane",
      "Quelimane",
    ],
  },
  {
    province: "Nampula",
    districts: [
      "Angoche",
      "Eráti",
      "Ilha de Moçambique",
      "Lalaua",
      "Malema",
      "Meconta",
      "Mecubúri",
      "Memba",
      "Mogincual",
      "Mogovolas",
      "Moma",
      "Monapo",
      "Mossuril",
      "Muecate",
      "Murrupula",
      "Nacala",
      "Nacaroa",
      "Nampula",
      "Rapale",
      "Ribáuè",
    ],
  },
  {
    province: "Cabo Delgado",
    districts: [
      "Ancuabe",
      "Balama",
      "Chiure",
      "Ibo",
      "Macomia",
      "Mecufi",
      "Meluco",
      "Metuge",
      "Mocimboa da Praia",
      "Montepuez",
      "Mueda",
      "Muidumbe",
      "Namuno",
      "Nangade",
      "Palma",
      "Pemba",
      "Quissanga",
    ],
  },
  {
    province: "Niassa",
    districts: [
      "Cuamba",
      "Lago",
      "Lichinga",
      "Majune",
      "Mandimba",
      "Marrupa",
      "Maúa",
      "Mavago",
      "Mecanhelas",
      "Mecula",
      "Metarica",
      "Muembe",
      "N'gauma",
      "Nipepe",
      "Sanga",
    ],
  },
];

async function seed() {
  const passwordHash = await bcrypt.hash("123456", 10);
  return Promise.all([
    ...provinces.map(async (province) => {
      await db.province.create({
        data: {
          designation: province.province,
          districts: {
            create: province.districts.map((district) => ({
              designation: district,
            })),
          },
        },
      });
    }),
    await db.admin.create({
      data: {
        name: "Administrator",
        email: "admin@beprepared.co.mz",
        password: passwordHash,
      },
    }),
  ]);
}

seed().then(() => {
  console.log("Seeds Created");
});
