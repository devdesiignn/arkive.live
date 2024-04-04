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
    abstract: `In this thesis, the application of machine learning algorithms in image recognition tasks is thoroughly investigated. With the increasing prevalence of digital imagery in various fields, the need for accurate and efficient image recognition systems has become paramount. This research aims to contribute to this field by exploring the effectiveness of different machine learning algorithms in addressing the complexities inherent in image recognition.

    The study commences by elucidating fundamental concepts in machine learning, providing an extensive overview of algorithms such as convolutional neural networks (CNNs), support vector machines (SVMs), and decision trees. Through meticulous experimentation and analysis, the capabilities of these algorithms in identifying patterns and features within images are scrutinized.
      
    Furthermore, the research delves into the challenges encountered in image recognition, including occlusion, illumination variations, and intra-class variability. Novel techniques for mitigating these challenges are proposed and evaluated, with the goal of enhancing the robustness and accuracy of image recognition systems.
      
    In addition to algorithmic approaches, the thesis investigates the influence of dataset size and quality on model performance. By conducting experiments across diverse datasets of varying complexities, the impact of dataset characteristics on model generalization and adaptability is thoroughly examined.
      
    Moreover, the study explores the implications of transfer learning and data augmentation techniques in improving the efficiency and scalability of image recognition systems. By leveraging pre-trained models and augmenting datasets with synthetically generated images, practical strategies for enhancing model performance while minimizing resource-intensive training requirements are elucidated.
      
    Overall, this thesis provides valuable insights into the application of machine learning algorithms in image recognition tasks. Through rigorous experimentation, analysis, and innovation, it aims to pave the way for advancements in image recognition technology, facilitating progress and innovation in the digital era.`,
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
const mockThesisData: Thesis[] = Array.from({ length: 10 }, generateMockThesis);

export default mockThesisData;
