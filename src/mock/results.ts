// import { Faker, en, en_NG } from "@faker-js/faker";
// import { Tag } from "react-tag-input";

// export interface Thesis {
//   id: string;
//   title: string;
//   abstract: string;
//   keywords: Tag[];
//   author: Author;
//   coAuthors: CoAuthor[];
//   degree: Degree;
//   documentUrl: string;
//   metadata: Metadata;
// }

// export interface Author {
//   fullName: string;
//   email: string;
// }

// export interface CoAuthor {
//   fullName: string;
// }

// interface Degree {
//   type: string;
//   program: string;
//   department: string;
//   faculty: string;
// }

// interface Metadata {
//   dateUploaded: Date;
// }

// const degreeTypes = ["Bachelor's", "Master's", "PhD"];
// const programs = [
//   "Computer Science",
//   "Electrical Engineering",
//   "Mechanical Engineering",
//   "Physics",
// ];
// const departments = ["Computer Science", "Engineering", "Physics"];
// const faculties = ["Faculty of Science", "Faculty of Engineering"];

// // Create a new instance of Faker
// const faker = new Faker({ locale: [en_NG, en] });

// function getRandomNumber(min: number, max: number): number {
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }

// // Generate mock data for a single thesis
// function generateMockThesis(index: number): Thesis {
//   const numCoAuthors = getRandomNumber(0, 4); // Generate random number of co-authors (0 to 3)

//   const coAuthors: CoAuthor[] = Array.from({ length: numCoAuthors }, () => ({
//     fullName: faker.person.fullName(),
//   }));

//   return {
//     id: (index + 1).toString(),
//     title: faker.lorem.sentence(),
//     abstract: faker.lorem.paragraphs(),
//     keywords: Array.from({ length: getRandomNumber(3, 10) }, (_, index) => ({
//       id: index.toString(),
//       text: faker.lorem.word(),
//     })),
//     author: {
//       fullName: faker.person.fullName(),
//       email: faker.internet.email(),
//     },

//     coAuthors: coAuthors,
//     degree: {
//       type: faker.helpers.arrayElement(degreeTypes),
//       program: faker.helpers.arrayElement(programs),
//       department: faker.helpers.arrayElement(departments),
//       faculty: faker.helpers.arrayElement(faculties),
//     },
//     documentUrl: faker.internet.url(),
//     metadata: {
//       dateUploaded: faker.date.recent(),
//     },
//   };
// }

// // Generate 10 mock thesis data entries
// const mockThesisData: Thesis[] = Array.from({ length: 10 }, (_, index) =>
//   generateMockThesis(index)
// );

// export default mockThesisData;
