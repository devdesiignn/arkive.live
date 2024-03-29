// Define interfaces
interface Thesis {
  title: string;
  author: Author;
  abstract: string;
  keywords: string[];
  publicationDate: Date;
  advisors: string[];
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
  dateCreated: Date;
}

// Generate mock data for a single thesis
function generateMockThesis(): Thesis {
  return {
    title: "Exploring Machine Learning Algorithms for Image Recognition",
    author: {
      fullName: "John Doe",
      email: "john.doe@example.com",
    },
    abstract:
      "This thesis investigates the application of machine learning algorithms in image recognition tasks...",
    keywords: ["Machine Learning", "Image Recognition", "Deep Learning"],
    publicationDate: new Date("2023-01-15"),
    advisors: ["Dr. Jane Smith", "Prof. Robert Johnson"],
    degree: {
      type: "Master's",
      program: "Computer Science",
      department: "Department of Computer Science",
      faculty: "Faculty of Communication and Information Sciences",
    },
    documentUrl: "https://example.com/thesis.pdf",
    metadata: {
      dateCreated: new Date("2023-01-01"),
    },
  };
}

// Generate 50 mock thesis data entries
const mockThesisData: Thesis[] = Array.from({ length: 1 }, generateMockThesis);

export default mockThesisData;
