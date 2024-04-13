import { Faker, en, en_NG } from "@faker-js/faker";

export interface Thesis {
  id: string;
  title: string;
  abstract: string;
  keywords: string[];
  author: Author;
  degree: Degree;
  documentUrl: string;
  metadata: Metadata;
}

interface Author {
  fullName: string;
  email: string;
}

interface Degree {
  type: string;
  program: string;
  department: string;
  faculty: string;
}

interface Metadata {
  dateUploaded: Date;
}

const degreeTypes = ["Bachelor's", "Master's", "PhD"];
const programs = [
  "Computer Science",
  "Electrical Engineering",
  "Mechanical Engineering",
  "Physics",
];
const departments = ["Computer Science", "Engineering", "Physics"];
const faculties = ["Faculty of Science", "Faculty of Engineering"];

// Create a new instance of Faker
const faker = new Faker({ locale: [en_NG, en] });

// Generate mock data for a single thesis
function generateMockThesis(index: number): Thesis {
  return {
    id: (index + 1).toString(),
    title: faker.lorem.sentence(),
    author: {
      fullName: faker.person.fullName(),
      email: faker.internet.email(),
    },
    abstract: faker.lorem.paragraphs(),
    keywords: [faker.lorem.word(), faker.lorem.word(), faker.lorem.word()],
    degree: {
      type: faker.helpers.arrayElement(degreeTypes),
      program: faker.helpers.arrayElement(programs),
      department: faker.helpers.arrayElement(departments),
      faculty: faker.helpers.arrayElement(faculties),
    },
    documentUrl: faker.internet.url(),
    metadata: {
      dateUploaded: faker.date.recent(),
    },
  };
}

// Generate 50 mock thesis data entries
const mockThesisData: Thesis[] = Array.from({ length: 10 }, (_, index) =>
  generateMockThesis(index)
);

export default mockThesisData;
