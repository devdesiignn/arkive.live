// Define interfaces
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

// Generate mock data for a single thesis
function generateMockThesis(index: number): Thesis {
  return {
    id: (index + 1).toString(),
    title: "Exploring Machine Learning Algorithms for Image Recognition",
    author: {
      fullName: "John Doe",
      email: "john.doe@example.com",
    },
    abstract: `In this thesis, the application of machine learning algorithms in image recognition tasks is thoroughly investigated. With the increasing prevalence of digital imagery in various fields, the need for accurate and efficient image recognition systems has become paramount. This research aims to contribute to this field by exploring the effectiveness of different machine learning algorithms in addressing the complexities inherent in image recognition.

    The study commences by elucidating fundamental concepts in machine learning, providing an extensive overview of algorithms such as convolutional neural networks (CNNs), support vector machines (SVMs), and decision trees. Through meticulous experimentation and analysis, the capabilities of these algorithms in identifying patterns and features within images are scrutinized.
      
    Furthermore, the research delves into the challenges encountered in image recognition, including occlusion, illumination variations, and intra-class variability. Novel techniques for mitigating these challenges are proposed and evaluated, with the goal of enhancing the robustness and accuracy of image recognition systems.`,
    keywords: ["Machine Learning", "Image Recognition", "Deep Learning"],
    degree: {
      type: "Master's",
      program: "Computer Science",
      department: "Department of Computer Science",
      faculty: "Faculty of Communication and Information Sciences",
    },
    documentUrl: "https://example.com/thesis.pdf",
    metadata: {
      dateUploaded: new Date(),
    },
  };
}

// Generate 50 mock thesis data entries
const mockThesisData: Thesis[] = Array.from({ length: 10 }, (_, index) =>
  generateMockThesis(index)
);

export default mockThesisData;
