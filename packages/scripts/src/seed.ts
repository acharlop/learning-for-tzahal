import { prisma } from "@acme/db";





const books = ["torah", "neviim", "ketuvim"];

const chapters = [
  { book: "torah", chapter: "Bereshit" },
  { book: "torah", chapter: "Shemot" },
  { book: "torah", chapter: "Vayikra" },
  { book: "torah", chapter: "Bamidbar" },
  { book: "torah", chapter: "Devarim" },
  { book: "neviim", chapter: "Yehoshua/Joshua" },
  { book: "neviim", chapter: "Shoftim/Judges" },
  { book: "neviim", chapter: "Shmuel/Samuel 1" },
  { book: "neviim", chapter: "Shmuel/Samuel 2" },
  { book: "neviim", chapter: "Melachim/Kings 1" },
  { book: "neviim", chapter: "Melachim/Kings 2" },
  { book: "neviim", chapter: "Yeshayahu/Isaiah" },
  { book: "neviim", chapter: "Yirmiyahu/Jeremiah" },
  { book: "neviim", chapter: "Yechezkel/Ezekiel" },
  { book: "neviim", chapter: "Trei Asar" },
  { book: "ketuvim", chapter: "Tehillim/Psalms" },
  { book: "ketuvim", chapter: "Mishlei/Proverbs" },
  { book: "ketuvim", chapter: "Iyov/Job" },
  { book: "ketuvim", chapter: "Megilla" },
  { book: "ketuvim", chapter: "Daniel" },
  { book: "ketuvim", chapter: "Ezra" },
  { book: "ketuvim", chapter: "Nechemiah" },
  { book: "ketuvim", chapter: "Divrei Hayamim/Chronicles 1" },
  { book: "ketuvim", chapter: "Divrei Hayamim/Chronicles 2" },
];

const data = [
  { section: "torah", book: "Bereshit", chapter: "Bereshit" },
  { section: "torah", book: "Bereshit", chapter: "Noach" },
  { section: "torah", book: "Bereshit", chapter: "Lech Lecha" },
  { section: "torah", book: "Bereshit", chapter: "Vayera" },
  { section: "torah", book: "Bereshit", chapter: "Chayei Sarah" },
  { section: "torah", book: "Bereshit", chapter: "Toldot" },
  { section: "torah", book: "Bereshit", chapter: "Vayetze" },
  { section: "torah", book: "Bereshit", chapter: "Vayishlach" },
  { section: "torah", book: "Bereshit", chapter: "Vayeshev" },
  { section: "torah", book: "Bereshit", chapter: "Miketz" },
  { section: "torah", book: "Bereshit", chapter: "Vayigash" },
  { section: "torah", book: "Bereshit", chapter: "Vayechi" },
  { section: "torah", book: "Shemot", chapter: "Shemot" },
  { section: "torah", book: "Shemot", chapter: "Vaera" },
  { section: "torah", book: "Shemot", chapter: "Bo" },
  { section: "torah", book: "Shemot", chapter: "Beshalach" },
  { section: "torah", book: "Shemot", chapter: "Yitro" },
  { section: "torah", book: "Shemot", chapter: "Mishpatim" },
  { section: "torah", book: "Shemot", chapter: "Terumah" },
  { section: "torah", book: "Shemot", chapter: "Tetzaveh" },
  { section: "torah", book: "Shemot", chapter: "Ki Tisa" },
  { section: "torah", book: "Shemot", chapter: "Vayakhel" },
  { section: "torah", book: "Shemot", chapter: "Pekudei" },
  { section: "torah", book: "Vayikra", chapter: "Vayikra" },
  { section: "torah", book: "Vayikra", chapter: "Tzav" },
  { section: "torah", book: "Vayikra", chapter: "Shemini" },
  { section: "torah", book: "Vayikra", chapter: "Tazria" },
  { section: "torah", book: "Vayikra", chapter: "Metzora" },
  { section: "torah", book: "Vayikra", chapter: "Acharei Mot" },
  { section: "torah", book: "Vayikra", chapter: "Kedoshim" },
  { section: "torah", book: "Vayikra", chapter: "Emor" },
  { section: "torah", book: "Vayikra", chapter: "Behar" },
  { section: "torah", book: "Vayikra", chapter: "Bechukotai" },
  { section: "torah", book: "Bamidbar", chapter: "Bamidbar" },
  { section: "torah", book: "Bamidbar", chapter: "Naso" },
  { section: "torah", book: "Bamidbar", chapter: "Beha'alotcha" },
  { section: "torah", book: "Bamidbar", chapter: "Shelach" },
  { section: "torah", book: "Bamidbar", chapter: "Korach" },
  { section: "torah", book: "Bamidbar", chapter: "Chukat" },
  { section: "torah", book: "Bamidbar", chapter: "Balak" },
  { section: "torah", book: "Bamidbar", chapter: "Pinchas" },
  { section: "torah", book: "Bamidbar", chapter: "Matot" },
  { section: "torah", book: "Bamidbar", chapter: "Masei" },
  { section: "torah", book: "Devarim", chapter: "Devarim" },
  { section: "torah", book: "Devarim", chapter: "Vaetchanan" },
  { section: "torah", book: "Devarim", chapter: "Eikev" },
  { section: "torah", book: "Devarim", chapter: "Re'eh" },
  { section: "torah", book: "Devarim", chapter: "Shoftim" },
  { section: "torah", book: "Devarim", chapter: "Ki Tetze" },
  { section: "torah", book: "Devarim", chapter: "Ki Tavo" },
  { section: "torah", book: "Devarim", chapter: "Nitzavim" },
  { section: "torah", book: "Devarim", chapter: "Vayeilech" },
  { section: "torah", book: "Devarim", chapter: "Ha'azinu" },
  { section: "torah", book: "Devarim", chapter: "V'Zot Habracha" },
  {
    section: "neviim",
    book: "Yehoshua/Joshua",
    chapter: "1-8",
  },
  {
    section: "neviim",
    book: "Yehoshua/Joshua",
    chapter: "9-17",
  },
  {
    section: "neviim",
    book: "Yehoshua/Joshua",
    chapter: "18-24",
  },
  {
    section: "neviim",
    book: "Shoftim/Judges",
    chapter: "1-5",
  },
  {
    section: "neviim",
    book: "Shoftim/Judges",
    chapter: "6-12",
  },
  {
    section: "neviim",
    book: "Shoftim/Judges",
    chapter: "13-21",
  },
  {
    section: "neviim",
    book: "Shmuel/Samuel 1",
    chapter: "1-7",
  },
  {
    section: "neviim",
    book: "Shmuel/Samuel 1",
    chapter: "8-15",
  },
  {
    section: "neviim",
    book: "Shmuel/Samuel 1",
    chapter: "16-24",
  },
  {
    section: "neviim",
    book: "Shmuel/Samuel 1",
    chapter: "25-31",
  },
  {
    section: "neviim",
    book: "Shmuel/Samuel 2",
    chapter: "1-8",
  },
  {
    section: "neviim",
    book: "Shmuel/Samuel 2",
    chapter: "9-16",
  },
  {
    section: "neviim",
    book: "Shmuel/Samuel 2",
    chapter: "17-24",
  },
  {
    section: "neviim",
    book: "Melachim/Kings 1",
    chapter: "1-7",
  },
  {
    section: "neviim",
    book: "Melachim/Kings 1",
    chapter: "8-15",
  },
  {
    section: "neviim",
    book: "Melachim/Kings 1",
    chapter: "16-22",
  },
  {
    section: "neviim",
    book: "Melachim/Kings 2",
    chapter: "1-8",
  },
  {
    section: "neviim",
    book: "Melachim/Kings 2",
    chapter: "9-17",
  },
  {
    section: "neviim",
    book: "Melachim/Kings 2",
    chapter: "18-25",
  },
  {
    section: "neviim",
    book: "Yeshayahu/Isaiah",
    chapter: "1-11",
  },
  {
    section: "neviim",
    book: "Yeshayahu/Isaiah",
    chapter: "12-22",
  },
  {
    section: "neviim",
    book: "Yeshayahu/Isaiah",
    chapter: "23-33",
  },
  {
    section: "neviim",
    book: "Yeshayahu/Isaiah",
    chapter: "34-44",
  },
  {
    section: "neviim",
    book: "Yeshayahu/Isaiah",
    chapter: "45-55",
  },
  {
    section: "neviim",
    book: "Yeshayahu/Isaiah",
    chapter: "56-66",
  },
  {
    section: "neviim",
    book: "Yirmiyahu/Jeremiah",
    chapter: "1-10",
  },
  {
    section: "neviim",
    book: "Yirmiyahu/Jeremiah",
    chapter: "11-21",
  },
  {
    section: "neviim",
    book: "Yirmiyahu/Jeremiah",
    chapter: "22-31",
  },
  {
    section: "neviim",
    book: "Yirmiyahu/Jeremiah",
    chapter: "32-41",
  },
  {
    section: "neviim",
    book: "Yirmiyahu/Jeremiah",
    chapter: "42-52",
  },
  {
    section: "neviim",
    book: "Yechezkel/Ezekiel",
    chapter: "1-10",
  },
  {
    section: "neviim",
    book: "Yechezkel/Ezekiel",
    chapter: "11-20",
  },
  {
    section: "neviim",
    book: "Yechezkel/Ezekiel",
    chapter: "21-29",
  },
  {
    section: "neviim",
    book: "Yechezkel/Ezekiel",
    chapter: "30-39",
  },
  {
    section: "neviim",
    book: "Yechezkel/Ezekiel",
    chapter: "40-48",
  },
  { section: "neviim", book: "Trei Asar", chapter: "Hoshea" },
  { section: "neviim", book: "Trei Asar", chapter: "Yoel, Amos" },
  {
    section: "neviim",
    book: "Trei Asar",
    chapter: "Ovadiah, Yonah, Micha",
  },
  {
    section: "neviim",
    book: "Trei Asar",
    chapter: "Nachum, Chavakuk, Tzephania",
  },
  {
    section: "neviim",
    book: "Trei Asar",
    chapter: "Chaggai, Zecharia, Malachi",
  },
  {
    section: "ketuvim",
    book: "Tehillim/Psalms",
    chapter: "1-10",
  },
  {
    section: "ketuvim",
    book: "Tehillim/Psalms",
    chapter: "11-20",
  },
  {
    section: "ketuvim",
    book: "Tehillim/Psalms",
    chapter: "21-41",
  },
  {
    section: "ketuvim",
    book: "Tehillim/Psalms",
    chapter: "42-59",
  },
  {
    section: "ketuvim",
    book: "Tehillim/Psalms",
    chapter: "60-74",
  },
  {
    section: "ketuvim",
    book: "Tehillim/Psalms",
    chapter: "75-89",
  },
  {
    section: "ketuvim",
    book: "Tehillim/Psalms",
    chapter: "90-106",
  },
  {
    section: "ketuvim",
    book: "Tehillim/Psalms",
    chapter: "107-118",
  },
  {
    section: "ketuvim",
    book: "Tehillim/Psalms",
    chapter: "119",
  },
  {
    section: "ketuvim",
    book: "Tehillim/Psalms",
    chapter: "120-139",
  },
  {
    section: "ketuvim",
    book: "Tehillim/Psalms",
    chapter: "140-150",
  },
  {
    section: "ketuvim",
    book: "Mishlei/Proverbs",
    chapter: "1-8",
  },
  {
    section: "ketuvim",
    book: "Mishlei/Proverbs",
    chapter: "9-16",
  },
  {
    section: "ketuvim",
    book: "Mishlei/Proverbs",
    chapter: "17-23",
  },
  {
    section: "ketuvim",
    book: "Mishlei/Proverbs",
    chapter: "24-31",
  },
  { section: "ketuvim", book: "Iyov/Job", chapter: "Job 1-7" },
  { section: "ketuvim", book: "Iyov/Job", chapter: "Job 8-14" },
  { section: "ketuvim", book: "Iyov/Job", chapter: "Job 15-21" },
  { section: "ketuvim", book: "Iyov/Job", chapter: "Job 22-28" },
  { section: "ketuvim", book: "Iyov/Job", chapter: "Job 29-35" },
  { section: "ketuvim", book: "Iyov/Job", chapter: "Job 36-42" },
  {
    section: "ketuvim",
    book: "Megilla",
    chapter: "Shir Hashirim / Song of Songs",
  },
  { section: "ketuvim", book: "Megilla", chapter: "Rut / Ruth" },
  { section: "ketuvim", book: "Megilla", chapter: "Eicha / Lamentations" },
  { section: "ketuvim", book: "Megilla", chapter: "Kohelet / Ecclesiastes" },
  { section: "ketuvim", book: "Megilla", chapter: "Esther" },
  { section: "ketuvim", book: "Daniel", chapter: "1-7" },
  { section: "ketuvim", book: "Daniel", chapter: "8-14" },
  { section: "ketuvim", book: "Ezra", chapter: "1-5" },
  { section: "ketuvim", book: "Ezra", chapter: "6-10" },
  { section: "ketuvim", book: "Nechemiah", chapter: "1-7" },
  { section: "ketuvim", book: "Nechemiah", chapter: "8-13" },
  {
    section: "ketuvim",
    book: "Divrei Hayamim/Chronicles 1",
    chapter: "1-8",
  },
  {
    section: "ketuvim",
    book: "Divrei Hayamim/Chronicles 1",
    chapter: "9-16",
  },
  {
    section: "ketuvim",
    book: "Divrei Hayamim/Chronicles 1",
    chapter: "17-22",
  },
  {
    section: "ketuvim",
    book: "Divrei Hayamim/Chronicles 1",
    chapter: "23-29",
  },
  {
    section: "ketuvim",
    book: "Divrei Hayamim/Chronicles 2",
    chapter: "1-5",
  },
  {
    section: "ketuvim",
    book: "Divrei Hayamim/Chronicles 2",
    chapter: "6-9",
  },
  {
    section: "ketuvim",
    book: "Divrei Hayamim/Chronicles 2",
    chapter: "10-18",
  },
  {
    section: "ketuvim",
    book: "Divrei Hayamim/Chronicles 2",
    chapter: "19-27",
  },
  {
    section: "ketuvim",
    book: "Divrei Hayamim/Chronicles 2",
    chapter: "28-36",
  },
] as const;

const main = async () => {
  //   const createdBooks = await Promise.all(
  //     books.map((item, idx) => prisma.book.create({ data: { name: item, id: idx + 1 } })),
  //   );

  //   createdBooks.map((book) => {
  //     chapters.filter(i => i.book === book.name).map((item, idx) =>
  //           prisma.chapter.create({
  //             data: {
  //               id: idx + 1,
  //               name: item.chapter,
  //               book: {
  //                 connect: {
  //                   id: book.id,
  //                 },
  //               },
  //             },
  //           })
  //     )})
  // const createdChapters = await Promise.all(

  //   ),
  // );

  const chaptersFromDb = await prisma.chapter.findMany({});

  const getId = (name: string): number => {
    const el = chaptersFromDb.find((chapter) => chapter.name === name);
    if (!el) {
      throw new Error(`Could not find chapter ${name}`);
    }
    return el.id;
  };

  chaptersFromDb.map((chapter) => {
    data
      .filter((i) => i.chapter === chapter.name)
      .map(
        async (item, idx) =>
          await prisma.portion.create({
            // @ts-ignore
            data: {
              id: idx + 1,
              name: item.chapter,
              chapter: {
                connect: {
                  id: getId(item.book),
                },
              },
            },
          }),
      );
  });
};

void main();
