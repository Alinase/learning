import { Course, CourseCategory, User, LiveClass, Transaction, PromoCode, ForumTopic, Announcement, Certificate } from '../types';

export const CATEGORIES: { name: CourseCategory; icon: string; description: string; courseCount: number }[] = [
  {
    name: 'Cybersecurity and Information Security',
    icon: 'ShieldCheck',
    description: 'Threat hunting, SOC operations, ethical hacking, ISO 27001, and defensive enterprise engineering.',
    courseCount: 8,
  },
  {
    name: 'Cloud Computing (Google Cloud, Azure, AWS)',
    icon: 'Cloud',
    description: 'Master enterprise multi-cloud architectures, Kubernetes orchestration, and cloud DevOps certifications.',
    courseCount: 12,
  },
  {
    name: 'Artificial Intelligence and Machine Learning',
    icon: 'BrainCircuit',
    description: 'Applied machine learning, generative AI, deep neural networks, and Python intelligence pipelines.',
    courseCount: 7,
  },
  {
    name: 'Data Analytics and Data Science',
    icon: 'BarChart3',
    description: 'Advanced SQL, Python for data science, Power BI dashboards, and Zambian market predictive modeling.',
    courseCount: 9,
  },
  {
    name: 'Software Development and Programming',
    icon: 'Code2',
    description: 'Full-stack web applications, TypeScript, modern Go backends, API design, and scalable architectures.',
    courseCount: 11,
  },
  {
    name: 'Networking and IT Infrastructure',
    icon: 'Network',
    description: 'Enterprise routing & switching, Cisco CCNA, MikroTik deployments, firewalls, and data center ops.',
    courseCount: 6,
  },
  {
    name: 'Digital Transformation',
    icon: 'Cpu',
    description: 'Modernizing African enterprises, legacy migration strategies, paperless systems, and cloud governance.',
    courseCount: 5,
  },
  {
    name: 'Business and Entrepreneurship',
    icon: 'Briefcase',
    description: 'Tech startup fundamentals, African venture scaling, FinTech integration, and commercial legal setup.',
    courseCount: 6,
  },
  {
    name: 'Professional Development and Digital Skills',
    icon: 'Sparkles',
    description: 'Product management, agile scrum mastery, workplace digital literacy, and executive technical communication.',
    courseCount: 5,
  },
];

export const INITIAL_COURSES: Course[] = [
  {
    id: 'course-gcp-cloud-arch',
    slug: 'google-cloud-enterprise-architect',
    title: 'Google Cloud Platform (GCP) & Enterprise Architecture',
    tagline: 'Design resilient, scalable cloud architectures for African enterprises and prepare for GCP Certification.',
    description: 'A comprehensive, hands-on bootcamp preparing engineers to build robust infrastructure on Google Cloud. You will architect Virtual Private Clouds (VPC), deploy containerized services on Google Kubernetes Engine (GKE), configure BigQuery analytics pipelines, and implement zero-trust Identity & Access Management (IAM). Designed specifically to prepare learners for the Google Cloud Associate Cloud Engineer and Professional Cloud Architect certifications.',
    category: 'Cloud Computing (Google Cloud, Azure, AWS)',
    level: 'Intermediate',
    format: 'self-paced',
    durationHours: 36,
    rating: 4.9,
    reviewCount: 342,
    enrolledCount: 1280,
    priceZMW: 1450,
    priceUSD: 55,
    thumbnail: '/src/assets/images/cloud_cybersecurity_lab_1793474031756.jpg',
    instructorId: 'inst-1',
    instructorName: 'Alinafe Nyirenda',
    instructorTitle: 'Principal Cloud Architect & Founder, AliTech',
    instructorAvatar: '/src/assets/images/african_tech_instructor_1793474033391.jpg',
    instructorBio: 'Alinafe is a Google Cloud and AWS Certified Architect with over 14 years experience engineering digital solutions across Zambia, South Africa, and the UK. He leads technology training and enterprise consulting at AliTech Investments Ltd in Lusaka.',
    learningObjectives: [
      'Architect highly available multi-region VPC topologies and hybrid on-premise interconnects',
      'Deploy, scale, and manage container workloads using Google Kubernetes Engine (GKE)',
      'Automate cloud infrastructure with Terraform and Cloud Build CI/CD pipelines',
      'Implement enterprise security, Cloud Armor DDoS mitigation, and granular IAM policies',
      'Confidently pass the Google Cloud Associate Cloud Engineer (ACE) certification exam',
    ],
    prerequisites: ['Basic Linux command-line familiarity', 'Foundational understanding of networking concepts (IP, DNS, Subnets)'],
    certificationPrep: 'Google Cloud Associate Cloud Engineer (ACE) & Professional Cloud Architect',
    published: true,
    featured: true,
    updatedAt: 'October 2026',
    modules: [
      {
        id: 'mod-1',
        title: 'Module 1: Cloud Foundation & IAM Zero-Trust Security',
        description: 'Understand the global Google Cloud infrastructure, resource hierarchies, organizations, and IAM policies.',
        lessons: [
          {
            id: 'les-1-1',
            title: '1.1 Introduction to Google Cloud Architecture in Africa',
            duration: '14 mins',
            type: 'video',
            contentMarkdown: 'Overview of Google Cloud global backbone, the Johannesburg region (africa-south1), latency considerations for Zambian businesses, and billing hierarchy.',
            downloadResources: [
              { name: 'GCP_Architecture_Blueprint_Lusaka.pdf', fileSize: '3.4 MB', type: 'PDF' },
              { name: 'IAM_Role_Hierarchy_Cheatsheet.pdf', fileSize: '1.2 MB', type: 'PDF' }
            ]
          },
          {
            id: 'les-1-2',
            title: '1.2 Interactive Lab: gcloud CLI Setup & VPC Provisioning',
            duration: '30 mins',
            type: 'lab',
            lab: {
              id: 'lab-gcp-cli',
              title: 'GCP Virtual Private Cloud & Compute Engine Provisioning Lab',
              environment: 'gcloud-cli',
              prompt: 'student@alitech-cloud-shell:~$',
              initialDirectory: '~/alitech-cloud-lab',
              guideMarkdown: `### Lab Objectives:
1. Verify Google Cloud authentication using \`gcloud auth list\`
2. Set your default project to \`alitech-enterprise-prod\` using \`gcloud config set project alitech-enterprise-prod\`
3. Inspect available Compute Engine zones in Africa using \`gcloud compute zones list --filter="region:africa-south1"\`
4. Deploy a secure VM instance in Lusaka VPC using \`gcloud compute instances create app-server-01 --zone=africa-south1-a --machine-type=e2-standard-2\`
5. Check created instance status using \`gcloud compute instances list\``,
              tasks: [
                {
                  id: 'task-1',
                  instruction: 'Check active GCP authenticated accounts using "gcloud auth list"',
                  expectedCommand: 'gcloud auth list',
                  outputHint: 'Credentialed accounts:\n* student@alitech.co.zm (ACTIVE)\nProject: alitech-enterprise-prod'
                },
                {
                  id: 'task-2',
                  instruction: 'Set your project config using "gcloud config set project alitech-enterprise-prod"',
                  expectedCommand: 'gcloud config set project alitech-enterprise-prod',
                  outputHint: 'Updated property [core/project].\nProject is now set to [alitech-enterprise-prod].'
                },
                {
                  id: 'task-3',
                  instruction: 'Create an e2-standard-2 VM with "gcloud compute instances create app-server-01 --zone=africa-south1-a --machine-type=e2-standard-2"',
                  expectedCommand: 'gcloud compute instances create app-server-01 --zone=africa-south1-a --machine-type=e2-standard-2',
                  outputHint: 'Created [https://www.googleapis.com/compute/v1/projects/alitech-enterprise-prod/zones/africa-south1-a/instances/app-server-01].\nNAME           ZONE            MACHINE_TYPE   PREEMPTIBLE  INTERNAL_IP  EXTERNAL_IP    STATUS\napp-server-01  africa-south1-a e2-standard-2               10.128.0.2   34.120.45.19   RUNNING'
                },
                {
                  id: 'task-4',
                  instruction: 'Verify running instances with "gcloud compute instances list"',
                  expectedCommand: 'gcloud compute instances list',
                  outputHint: 'NAME           ZONE            MACHINE_TYPE   INTERNAL_IP  EXTERNAL_IP    STATUS\napp-server-01  africa-south1-a e2-standard-2  10.128.0.2   34.120.45.19   RUNNING'
                }
              ]
            }
          },
          {
            id: 'les-1-3',
            title: '1.3 Assessment: GCP Architecture Knowledge Check',
            duration: '20 mins',
            type: 'quiz',
            quiz: {
              id: 'quiz-gcp-1',
              title: 'Module 1 Knowledge Exam: Google Cloud Core & IAM',
              passingScore: 80,
              questions: [
                {
                  id: 'q1',
                  question: 'Which GCP resource level sits immediately below the Organization in the resource hierarchy?',
                  options: ['Projects', 'Folders', 'Billing Accounts', 'Compute Instances'],
                  correctOptionIndex: 1,
                  explanation: 'In Google Cloud resource hierarchy: Organization > Folders > Projects > Resources.'
                },
                {
                  id: 'q2',
                  question: 'Which principle governs modern IAM role assignments to enforce maximum security?',
                  options: ['Principle of Least Privilege', 'Full Administrator Delegation', 'Static Passkey Re-use', 'Per-subnet Root Ownership'],
                  correctOptionIndex: 0,
                  explanation: 'Least privilege dictates that users and service accounts are granted only the minimum permissions necessary for their duties.'
                },
                {
                  id: 'q3',
                  question: 'Which Google Cloud region offers the lowest latency for enterprise users in Southern Africa?',
                  options: ['us-central1 (Iowa)', 'africa-south1 (Johannesburg)', 'europe-west1 (Belgium)', 'asia-east1 (Taiwan)'],
                  correctOptionIndex: 1,
                  explanation: 'africa-south1 located in Johannesburg provides sub-30ms round-trip latency to Lusaka, Zambia over direct regional fiber links.'
                }
              ]
            }
          }
        ]
      },
      {
        id: 'mod-2',
        title: 'Module 2: Kubernetes (GKE), Networking & Microservices',
        description: 'Design zero-trust subnets, private clusters, service meshes, and auto-scaling pods.',
        lessons: [
          {
            id: 'les-2-1',
            title: '2.1 Google Kubernetes Engine (GKE) Cluster Architecture',
            duration: '22 mins',
            type: 'video',
            contentMarkdown: 'Autopilot vs Standard clusters, control plane redundancy, pod IP allocation with VPC-native clusters, and ingress controllers.'
          },
          {
            id: 'les-2-2',
            title: '2.2 Microservices Deployment & Rolling Upgrades',
            duration: '28 mins',
            type: 'reading',
            contentMarkdown: 'Step-by-step manifest preparation for banking microservices, readiness probes, liveness probes, and Horizontal Pod Autoscaler (HPA).'
          }
        ]
      }
    ]
  },
  {
    id: 'course-cybersecurity-soc',
    slug: 'practical-cybersecurity-defensive-operations',
    title: 'Practical Cybersecurity & SOC Analyst Defensive Operations',
    tagline: 'Defend African enterprise networks, analyze threat logs, master SIEM tools, and conduct ethical vulnerability scans.',
    description: 'Learn modern security operations center (SOC) tradecraft. This hands-on program covers network defense, vulnerability assessment with Nmap and OpenVAS, incident response playbooks, Wireshark packet dissection, and SIEM monitoring (Splunk/Elastic). Directly aligned with the CompTIA Security+ and Certified SOC Analyst (CSA) curricula.',
    category: 'Cybersecurity and Information Security',
    level: 'Intermediate',
    format: 'instructor-led',
    durationHours: 42,
    rating: 4.95,
    reviewCount: 289,
    enrolledCount: 960,
    priceZMW: 1650,
    priceUSD: 62,
    thumbnail: '/src/assets/images/cloud_cybersecurity_lab_1793474031756.jpg',
    instructorId: 'inst-2',
    instructorName: 'Mutale Chanda',
    instructorTitle: 'Lead Cyber Threat Specialist & CISSP',
    instructorAvatar: '/src/assets/images/african_tech_instructor_1793474033391.jpg',
    instructorBio: 'Mutale has conducted penetration testing and defensive audits for commercial banks and mining conglomerates across Zambia and COMESA nations. He specializes in defensive threat emulation and SIEM engineering.',
    learningObjectives: [
      'Conduct comprehensive port scans, banner grabs, and service audits using Nmap',
      'Detect anomalous network egress and suspicious TLS handshakes in Wireshark',
      'Implement hardened Linux iptables firewall rules and Snort IDS signatures',
      'Draft incident containment playbooks for ransomware and data breach scenarios',
      'Prepare for the CompTIA Security+ (SY0-701) and Certified Ethical Hacker (CEH) credentials'
    ],
    prerequisites: ['TCP/IP fundamentals', 'Basic Linux command line knowledge'],
    certificationPrep: 'CompTIA Security+ (SY0-701) & Certified SOC Analyst',
    published: true,
    featured: true,
    updatedAt: 'October 2026',
    modules: [
      {
        id: 'mod-c1',
        title: 'Module 1: Threat Hunting & Network Reconnaissance',
        description: 'Explore attack vectors, port scanning methodology, and defensive perimeter analysis.',
        lessons: [
          {
            id: 'les-c1-1',
            title: '1.1 The Modern Cyber Threat Landscape in Zambia & Southern Africa',
            duration: '18 mins',
            type: 'video',
            contentMarkdown: 'Analyzing regional banking trojans, SIM swap attack mechanics, phishing vectors targeting mobile money, and critical infrastructure hardening.'
          },
          {
            id: 'les-c1-2',
            title: '1.2 Hands-on Terminal Lab: Nmap Service Audit & Port Scanning',
            duration: '35 mins',
            type: 'lab',
            lab: {
              id: 'lab-nmap-sec',
              title: 'Defensive Network Audit & Vulnerability Discovery Lab',
              environment: 'cyber-audit',
              prompt: 'analyst@alitech-soc:~$',
              initialDirectory: '~/threat-lab',
              guideMarkdown: `### Defensive Lab Instructions:
1. Check current network interface configuration with \`ip a\`
2. Scan the internal corporate gateway using \`nmap -sV 192.168.10.1\`
3. Identify open unencrypted ports (e.g. Telnet on port 23 or HTTP on port 80)
4. Verify firewall rule enforcement using \`sudo iptables -L -n -v\`
5. Generate an audit log summary using \`cat /var/log/audit_summary.txt\``,
              tasks: [
                {
                  id: 'ctask-1',
                  instruction: 'Check network IP with "ip a"',
                  expectedCommand: 'ip a',
                  outputHint: '1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536\n2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> inet 192.168.10.45/24 brd 192.168.10.255 scope global eth0'
                },
                {
                  id: 'ctask-2',
                  instruction: 'Scan the gateway for open ports with "nmap -sV 192.168.10.1"',
                  expectedCommand: 'nmap -sV 192.168.10.1',
                  outputHint: 'Starting Nmap 7.94 ( https://nmap.org )\nNmap scan report for gateway.alitech.local (192.168.10.1)\nPORT     STATE SERVICE  VERSION\n22/tcp   open  ssh      OpenSSH 9.3p1 (Ubuntu)\n80/tcp   open  http     nginx 1.24.0\n443/tcp  open  ssl/http nginx 1.24.0\n3306/tcp closed mysql'
                },
                {
                  id: 'ctask-3',
                  instruction: 'Inspect firewall rule tables using "sudo iptables -L -n -v"',
                  expectedCommand: 'sudo iptables -L -n -v',
                  outputHint: 'Chain INPUT (policy DROP 12 packets, 720 bytes)\n pkts bytes target     prot opt in     out     source               destination\n  482  41KB ACCEPT     all  --  lo     *       0.0.0.0/0            0.0.0.0/0\n 1204  188K ACCEPT     tcp  --  eth0   *       0.0.0.0/0            0.0.0.0/0            tcp dpt:22\n 3409  612K ACCEPT     tcp  --  eth0   *       0.0.0.0/0            0.0.0.0/0            tcp dpt:443'
                }
              ]
            }
          },
          {
            id: 'les-c1-3',
            title: '1.3 Assessment: SOC Fundamentals & Defensive Analysis',
            duration: '25 mins',
            type: 'quiz',
            quiz: {
              id: 'quiz-sec-1',
              title: 'Cybersecurity Core Defensive Assessment',
              passingScore: 80,
              questions: [
                {
                  id: 'cq1',
                  question: 'What is the primary function of a Security Information and Event Management (SIEM) platform?',
                  options: ['Aggregate, normalize, and correlate security logs across diverse hosts', 'Replace human SOC tier 1 analysts entirely', 'Encrypt backup hard drives during storage', 'Compile C++ application binaries'],
                  correctOptionIndex: 0,
                  explanation: 'A SIEM collects and correlates events across network firewalls, endpoints, servers, and cloud resources to detect coordinated threats.'
                },
                {
                  id: 'cq2',
                  question: 'Which Nmap switch is utilized to determine the specific version of services running on listening ports?',
                  options: ['-sV', '-O', '-p-', '-Pn'],
                  correctOptionIndex: 0,
                  explanation: '-sV enables service/version detection probe banners.'
                }
              ]
            }
          }
        ]
      }
    ]
  },
  {
    id: 'course-ai-python-ml',
    slug: 'practical-ai-machine-learning-python',
    title: 'Applied AI & Machine Learning for Real-World African Problems',
    tagline: 'Harness Scikit-Learn, PyTorch, and Gemini LLMs to solve agriculture, FinTech credit scoring, and predictive health challenges.',
    description: 'Bridge theory and impactful execution. You will build end-to-end machine learning models in Python, train predictive models for agricultural crop yields and credit default risk, build Retrieval Augmented Generation (RAG) knowledge systems with Gemini API, and deploy models to production APIs.',
    category: 'Artificial Intelligence and Machine Learning',
    level: 'Intermediate',
    format: 'self-paced',
    durationHours: 38,
    rating: 4.88,
    reviewCount: 198,
    enrolledCount: 740,
    priceZMW: 1350,
    priceUSD: 50,
    thumbnail: '/src/assets/images/alitech_hero_learning_1793474031264.jpg',
    instructorId: 'inst-3',
    instructorName: 'Dr. Kondwani Tembo',
    instructorTitle: 'AI Research Scientist & Senior Lecturer',
    instructorAvatar: '/src/assets/images/african_tech_instructor_1793474033391.jpg',
    instructorBio: 'Dr. Tembo holds a PhD in Computational Intelligence. He consults on national agricultural predictive models in Zambia and advises African tech incubators on ethical AI deployment.',
    learningObjectives: [
      'Master exploratory data analysis with Pandas, NumPy, and Seaborn',
      'Train supervised classification algorithms for Mobile Money fraud detection',
      'Engineer prompt architectures and RAG pipelines using Google Gemini API',
      'Deploy containerized ML inference endpoints using FastAPI and Docker',
    ],
    prerequisites: ['Basic Python programming syntax'],
    certificationPrep: 'AliTech Certified AI Developer (ACAID)',
    published: true,
    featured: true,
    updatedAt: 'October 2026',
    modules: [
      {
        id: 'mod-ai1',
        title: 'Module 1: Machine Learning Foundations & Feature Engineering',
        description: 'From raw datasets to production training matrices.',
        lessons: [
          {
            id: 'les-ai1-1',
            title: '1.1 Data Pipelines for Zambian FinTech & AgriTech Datasets',
            duration: '20 mins',
            type: 'video',
            contentMarkdown: 'Handling missing values, outlier treatment in transaction logs, one-hot encoding categorical variables, and train/test cross-validation splits.'
          },
          {
            id: 'les-ai1-2',
            title: '1.2 Interactive Lab: Training a Loan Default Classifier in Python',
            duration: '40 mins',
            type: 'lab',
            lab: {
              id: 'lab-py-ml',
              title: 'Credit Scoring Predictive Classifier Lab',
              environment: 'python-env',
              prompt: 'developer@alitech-jupyter:~$',
              initialDirectory: '~/credit-scoring-model',
              guideMarkdown: `### Machine Learning Lab Steps:
1. Inspect the training dataset with \`python -c "import pandas as pd; df = pd.read_csv('loans_zm.csv'); print(df.shape)"\`
2. Check class balance between approved and defaulted loans with \`python inspect_distribution.py\`
3. Run the Scikit-learn Random Forest model training script with \`python train_model.py --estimators 150\`
4. Evaluate ROC-AUC and F1-Score using \`python evaluate.py\``,
              tasks: [
                {
                  id: 'aitask-1',
                  instruction: 'Inspect dataset shape with "python inspect_distribution.py"',
                  expectedCommand: 'python inspect_distribution.py',
                  outputHint: 'Dataset loaded: 24,500 records.\nClass 0 (On-Time Repayment): 88.4%\nClass 1 (Default/Risk): 11.6%\nFeatures: 14 numeric, 4 categorical'
                },
                {
                  id: 'aitask-2',
                  instruction: 'Train the model with "python train_model.py --estimators 150"',
                  expectedCommand: 'python train_model.py --estimators 150',
                  outputHint: 'Training RandomForestClassifier(n_estimators=150, max_depth=12)...\nFitting 5 folds for each of 3 candidates, totalling 15 fits.\nModel training complete! Serialized weights saved to: artifacts/credit_risk_v1.pkl'
                },
                {
                  id: 'aitask-3',
                  instruction: 'Evaluate test score with "python evaluate.py"',
                  expectedCommand: 'python evaluate.py',
                  outputHint: 'Model Performance:\nROC-AUC Score: 0.934\nF1-Score: 0.892\nAccuracy: 94.6%\nInference Latency: 4.2ms / prediction'
                }
              ]
            }
          }
        ]
      }
    ]
  },
  {
    id: 'course-fullstack-dev',
    slug: 'modern-fullstack-web-software-engineering',
    title: 'Full-Stack Web & Software Engineering (React, Node.js & TypeScript)',
    tagline: 'Build commercial-grade web platforms, integrate Mobile Money APIs, and architect scalable web apps.',
    description: 'Learn modern software engineering from the ground up. Build production applications using React 19, TypeScript, Tailwind CSS, Express REST APIs, PostgreSQL schemas, and integrate real African payment gateways like Airtel Money and MTN MoMo.',
    category: 'Software Development and Programming',
    level: 'Beginner',
    format: 'self-paced',
    durationHours: 45,
    rating: 4.92,
    reviewCount: 412,
    enrolledCount: 1620,
    priceZMW: 1250,
    priceUSD: 48,
    thumbnail: '/src/assets/images/corporate_training_session_1793474033389.jpg',
    instructorId: 'inst-1',
    instructorName: 'Alinafe Nyirenda',
    instructorTitle: 'Principal Cloud Architect & Founder, AliTech',
    instructorAvatar: '/src/assets/images/african_tech_instructor_1793474033391.jpg',
    instructorBio: 'Alinafe has designed software architectures serving millions of users across the Southern African development community.',
    learningObjectives: [
      'Master TypeScript type safety and modern React patterns',
      'Develop authenticated REST and GraphQL APIs with Express and Node.js',
      'Integrate Zambian Mobile Money payment webhooks (Airtel and MTN)',
      'Deploy full-stack applications with Docker, Nginx, and SSL certificates'
    ],
    prerequisites: ['Basic computer literacy', 'Enthusiasm for coding! No prior programming experience strictly required.'],
    certificationPrep: 'AliTech Certified Full-Stack Software Engineer',
    published: true,
    featured: true,
    updatedAt: 'October 2026',
    modules: [
      {
        id: 'mod-fs1',
        title: 'Module 1: Web Architecture & TypeScript Foundations',
        description: 'From static DOM to typed client-server communications.',
        lessons: [
          {
            id: 'les-fs1-1',
            title: '1.1 How the Web Works: DNS, HTTP/3, and Serverless Backends',
            duration: '22 mins',
            type: 'video',
            contentMarkdown: 'Understanding request lifecycles, browser rendering engines, and client-side vs server-side rendering.'
          }
        ]
      }
    ]
  },
  {
    id: 'course-data-analytics',
    slug: 'data-analytics-powerbi-sql-excel',
    title: 'Data Analytics & Business Intelligence with Power BI & SQL',
    tagline: 'Transform raw enterprise numbers into executive dashboards, revenue forecasts, and automated reports.',
    description: 'Data analytics tailored for business analysts, finance executives, and tech professionals. Master advanced SQL queries, data warehousing concepts, ETL automation, and interactive Microsoft Power BI visualizations.',
    category: 'Data Analytics and Data Science',
    level: 'Beginner',
    format: 'instructor-led',
    durationHours: 32,
    rating: 4.85,
    reviewCount: 220,
    enrolledCount: 890,
    priceZMW: 1100,
    priceUSD: 42,
    thumbnail: '/src/assets/images/corporate_training_session_1793474033389.jpg',
    instructorId: 'inst-4',
    instructorName: 'Lombe Nkonde',
    instructorTitle: 'Senior Business Intelligence Consultant',
    instructorAvatar: '/src/assets/images/african_tech_instructor_1793474033391.jpg',
    instructorBio: 'Lombe has spearheaded BI dashboard transitions for retail distribution chains, mining firms, and telecom providers in Lusaka and the Copperbelt.',
    learningObjectives: [
      'Write multi-table SQL joins, window functions, and subqueries with confidence',
      'Design interactive Power BI executive dashboards with DAX calculations',
      'Automate monthly financial reporting pipelines',
      'Present actionable data stories to executive leadership'
    ],
    prerequisites: ['Basic Excel familiarity'],
    certificationPrep: 'Microsoft Certified: Power BI Data Analyst Associate (PL-300)',
    published: true,
    featured: false,
    updatedAt: 'October 2026',
    modules: [
      {
        id: 'mod-da1',
        title: 'Module 1: Relational Databases & Advanced SQL',
        description: 'Querying normalized schemas and performing analytical aggregations.',
        lessons: [
          {
            id: 'les-da1-1',
            title: '1.1 Writing Clean Analytical SQL for Business Insights',
            duration: '25 mins',
            type: 'video',
            contentMarkdown: 'GROUP BY, HAVING, CASE WHEN statements, and CTEs (Common Table Expressions).'
          }
        ]
      }
    ]
  },
  {
    id: 'course-networking-infra',
    slug: 'networking-and-it-infrastructure-enterprise',
    title: 'Enterprise Networking & IT Infrastructure (Cisco & MikroTik)',
    tagline: 'Configure routing protocols, enterprise Wi-Fi, VLAN segmentations, and VPN tunnels.',
    description: 'Practical networking engineering for campus and branch networks. Covers Cisco IOS configuration, MikroTik RouterOS deployment, BGP routing, OSPF, VLANs, VoIP setups, and optical fiber basics.',
    category: 'Networking and IT Infrastructure',
    level: 'Intermediate',
    format: 'instructor-led',
    durationHours: 35,
    rating: 4.81,
    reviewCount: 160,
    enrolledCount: 520,
    priceZMW: 1300,
    priceUSD: 49,
    thumbnail: '/src/assets/images/cloud_cybersecurity_lab_1793474031756.jpg',
    instructorId: 'inst-2',
    instructorName: 'Mutale Chanda',
    instructorTitle: 'Lead Cyber Threat Specialist & CISSP',
    instructorAvatar: '/src/assets/images/african_tech_instructor_1793474033391.jpg',
    instructorBio: 'Over 12 years managing mission-critical carrier and enterprise networks across Zambia.',
    learningObjectives: [
      'Configure Cisco Catalyst switches and MikroTik RouterBOARDs',
      'Implement secure VLAN segmentation and 802.1Q trunking',
      'Deploy site-to-site IPsec VPNs and remote worker WireGuard access',
      'Prepare for the Cisco Certified Network Associate (CCNA 200-301)'
    ],
    prerequisites: ['Basic computer understanding'],
    certificationPrep: 'Cisco Certified Network Associate (CCNA 200-301)',
    published: true,
    featured: false,
    updatedAt: 'October 2026',
    modules: []
  },
  {
    id: 'course-digital-transformation',
    slug: 'corporate-digital-transformation-leadership',
    title: 'Digital Transformation & Executive Technology Leadership',
    tagline: 'Lead paperless, automated digital workflows and modern technology adoption for traditional businesses.',
    description: 'Designed for business leaders, government directors, and innovators driving technological change in African institutions. Covers business process automation, enterprise software evaluation, change management, and ROI measurement.',
    category: 'Digital Transformation',
    level: 'Advanced',
    format: 'live-virtual',
    durationHours: 24,
    rating: 4.96,
    reviewCount: 110,
    enrolledCount: 430,
    priceZMW: 2100,
    priceUSD: 80,
    thumbnail: '/src/assets/images/corporate_training_session_1793474033389.jpg',
    instructorId: 'inst-1',
    instructorName: 'Alinafe Nyirenda',
    instructorTitle: 'Principal Cloud Architect & Founder, AliTech',
    instructorAvatar: '/src/assets/images/african_tech_instructor_1793474033391.jpg',
    instructorBio: 'Alinafe consults widely with Zambian boards on digital strategy and institutional cloud modernization.',
    learningObjectives: [
      'Map organizational workflows and identify digitization bottlenecks',
      'Design comprehensive cloud migration roadmaps',
      'Navigate regulatory compliance (Data Protection Act No. 3 of 2021)',
      'Lead cultural shifts toward data-driven decision making'
    ],
    prerequisites: ['Management or team lead experience recommended'],
    certificationPrep: 'AliTech Executive Digital Leader Credential',
    published: true,
    featured: false,
    updatedAt: 'October 2026',
    modules: []
  },
  {
    id: 'course-fintech-entrepreneurship',
    slug: 'african-tech-entrepreneurship-fintech',
    title: 'Tech Startup Building & FinTech Entrepreneurship in Africa',
    tagline: 'Launch, fund, and scale a tech venture in Zambia: regulations, Mobile Money APIs, and unit economics.',
    description: 'The definitive playbook for launching digital products in Zambia and COMESA countries. Learn how to validate product-market fit, integrate Bank of Zambia regulatory compliance, negotiate payment aggregator terms, and pitch to African seed funds.',
    category: 'Business and Entrepreneurship',
    level: 'All Levels',
    format: 'self-paced',
    durationHours: 20,
    rating: 4.9,
    reviewCount: 175,
    enrolledCount: 680,
    priceZMW: 950,
    priceUSD: 36,
    thumbnail: '/src/assets/images/alitech_hero_learning_1793474031264.jpg',
    instructorId: 'inst-1',
    instructorName: 'Alinafe Nyirenda',
    instructorTitle: 'Principal Cloud Architect & Founder, AliTech',
    instructorAvatar: '/src/assets/images/african_tech_instructor_1793474033391.jpg',
    instructorBio: 'Founder and entrepreneur who has built commercially successful tech initiatives in Zambia.',
    learningObjectives: [
      'Build minimal viable products (MVPs) in under 30 days',
      'Comply with PACRA, ZRA, and Bank of Zambia regulatory frameworks',
      'Model customer acquisition costs (CAC) and customer lifetime value (LTV)',
      'Secure seed funding and corporate pilot partnerships'
    ],
    prerequisites: ['No prerequisites. Passion for building businesses required!'],
    certificationPrep: 'AliTech Certified Tech Entrepreneur',
    published: true,
    featured: false,
    updatedAt: 'October 2026',
    modules: []
  },
  {
    id: 'course-free-digital-skills',
    slug: 'essential-digital-skills-workplace-productivity',
    title: 'Essential Digital Skills & Cloud Workplace Productivity',
    tagline: 'Free foundational digital literacy course: cloud docs, cybersecurity hygiene, remote collaboration tools.',
    description: 'AliTech’s community impact initiative: a 100% free course designed to upskill Zambian youth, job seekers, and office professionals in essential modern computer skills, cloud collaboration, and cyber hygiene.',
    category: 'Professional Development and Digital Skills',
    level: 'Beginner',
    format: 'self-paced',
    durationHours: 15,
    rating: 4.94,
    reviewCount: 610,
    enrolledCount: 3400,
    priceZMW: 0, // Free course
    priceUSD: 0,
    thumbnail: '/src/assets/images/alitech_hero_learning_1793474031264.jpg',
    instructorId: 'inst-1',
    instructorName: 'Alinafe Nyirenda',
    instructorTitle: 'Principal Cloud Architect & Founder, AliTech',
    instructorAvatar: '/src/assets/images/african_tech_instructor_1793474033391.jpg',
    instructorBio: 'Passionate about democratizing technology training across all provinces of Zambia.',
    learningObjectives: [
      'Master Google Workspace and Microsoft 365 cloud collaboration',
      'Protect personal and business data against phishing and scam SMS',
      'Leverage AI tools for professional research, email writing, and resume building',
      'Earn an official AliTech Digital Skills verified certificate'
    ],
    prerequisites: ['None. Open to everyone.'],
    certificationPrep: 'AliTech Digital Literacy Certificate',
    published: true,
    featured: true,
    updatedAt: 'October 2026',
    modules: [
      {
        id: 'mod-free-1',
        title: 'Module 1: Cloud Collaboration & Safe Internet Practices',
        description: 'Practical tools every modern employee and student needs.',
        lessons: [
          {
            id: 'les-free-1-1',
            title: '1.1 Cloud Collaboration: Google Drive, Docs & Sheets Mastery',
            duration: '15 mins',
            type: 'video',
            contentMarkdown: 'Real-time collaborative editing, version history, sharing permissions, and offline synchronization.'
          }
        ]
      }
    ]
  }
];

export const INITIAL_USERS: User[] = [
  {
    id: 'user-student-1',
    name: 'Chileshe Mwape',
    email: 'chileshe.mwape@example.zm',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80',
    title: 'Junior Cloud Systems Administrator',
    bio: 'Passionate technology learner based in Lusaka, Zambia. Currently preparing for Google Cloud Associate Cloud Engineer and sharpening cybersecurity skills at AliTech.',
    location: 'Lusaka, Zambia',
    enrolledCourseIds: ['course-gcp-cloud-arch', 'course-cybersecurity-soc', 'course-free-digital-skills'],
    completedCourseIds: ['course-free-digital-skills'],
    certificates: [
      {
        id: 'ALITECH-ZM-2026-8941',
        studentId: 'user-student-1',
        studentName: 'Chileshe Mwape',
        courseId: 'course-free-digital-skills',
        courseTitle: 'Essential Digital Skills & Cloud Workplace Productivity',
        instructorName: 'Alinafe Nyirenda',
        issueDate: 'October 15, 2026',
        verificationCode: 'ALITECH-VERIFY-8941-ZM',
        gradePercentage: 96,
        totalHours: 15,
        accreditedBy: 'AliTech Investments Ltd, Lusaka, Zambia'
      }
    ],
    createdAt: '2026-08-10'
  },
  {
    id: 'inst-1',
    name: 'Alinafe Nyirenda',
    email: 'alinafe@alitech.co.zm',
    role: 'instructor',
    avatar: '/src/assets/images/african_tech_instructor_1793474033391.jpg',
    title: 'Principal Cloud Architect & Founder, AliTech',
    bio: 'Pioneering African cloud computing and enterprise tech training. Founder of AliTech Investments Ltd.',
    location: 'Lusaka, Zambia',
    enrolledCourseIds: [],
    completedCourseIds: [],
    certificates: [],
    createdAt: '2025-01-01'
  },
  {
    id: 'admin-1',
    name: 'Mwamba Mulenga',
    email: 'admin@alitech.co.zm',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80',
    title: 'Platform Director & Registrar',
    bio: 'Supervising academic quality, institutional partnerships, and platform operations across Zambia and international markets.',
    location: 'Lusaka, Zambia',
    enrolledCourseIds: [],
    completedCourseIds: [],
    certificates: [],
    createdAt: '2025-01-01'
  }
];

export const INITIAL_LIVE_CLASSES: LiveClass[] = [
  {
    id: 'live-1',
    courseId: 'course-gcp-cloud-arch',
    courseTitle: 'Google Cloud Platform (GCP) & Enterprise Architecture',
    title: 'GCP Associate Cloud Engineer (ACE) Live Mock Exam & Architecture Breakdown',
    instructorName: 'Alinafe Nyirenda',
    scheduledTime: '2026-11-07T14:00:00+02:00', // Saturday 14:00 CAT
    durationMinutes: 90,
    meetingLink: 'https://meet.google.com/ali-tech-gcp-live',
    status: 'upcoming',
    agenda: [
      'Dissecting 15 tricky GCP exam scenario questions',
      'VPC Peering vs Cloud Interconnect latency tradeoffs',
      'Live Q&A and architecture review for Zambian financial apps'
    ]
  },
  {
    id: 'live-2',
    courseId: 'course-cybersecurity-soc',
    courseTitle: 'Practical Cybersecurity & SOC Analyst Defensive Operations',
    title: 'Live Threat Hunting Workshop: Analyzing Real-World Packet Captures',
    instructorName: 'Mutale Chanda',
    scheduledTime: '2026-11-10T18:00:00+02:00', // Tuesday 18:00 CAT
    durationMinutes: 75,
    meetingLink: 'https://meet.google.com/ali-tech-soc-live',
    status: 'upcoming',
    agenda: [
      'Live PCAP dissection in Wireshark',
      'Tracing malware command-and-control beaconing',
      'Configuring alert thresholds in Elastic SIEM'
    ]
  }
];

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'TXN-9021',
    studentId: 'user-student-1',
    studentName: 'Chileshe Mwape',
    studentEmail: 'chileshe.mwape@example.zm',
    courseId: 'course-gcp-cloud-arch',
    courseTitle: 'Google Cloud Platform (GCP) & Enterprise Architecture',
    amountZMW: 1450,
    amountUSD: 55,
    currency: 'ZMW',
    paymentMethod: 'Airtel Money',
    phoneNumber: '+260 97 782 4192',
    status: 'completed',
    date: '2026-10-22',
    referenceNumber: 'AIRTEL-ZM-99281726'
  },
  {
    id: 'TXN-8944',
    studentId: 'user-student-1',
    studentName: 'Chileshe Mwape',
    studentEmail: 'chileshe.mwape@example.zm',
    courseId: 'course-cybersecurity-soc',
    courseTitle: 'Practical Cybersecurity & SOC Analyst Defensive Operations',
    amountZMW: 1650,
    amountUSD: 62,
    currency: 'ZMW',
    paymentMethod: 'MTN Mobile Money',
    phoneNumber: '+260 96 619 3840',
    status: 'completed',
    date: '2026-10-25',
    referenceNumber: 'MTN-MOMO-83719402'
  },
  {
    id: 'TXN-8720',
    studentId: 'user-corp-01',
    studentName: 'Stanbic Bank Zambia Tech Team',
    studentEmail: 'training@stanbic.co.zm',
    courseId: 'course-digital-transformation',
    courseTitle: 'Digital Transformation & Executive Technology Leadership',
    amountZMW: 21000,
    amountUSD: 800,
    currency: 'ZMW',
    paymentMethod: 'Bank Transfer',
    status: 'completed',
    date: '2026-10-28',
    referenceNumber: 'STANBIC-RTGS-551920'
  }
];

export const INITIAL_PROMO_CODES: PromoCode[] = [
  { code: 'ZAMBIA2026', discountPercent: 20, expiresAt: '2026-12-31', usageCount: 84, active: true },
  { code: 'AFRICATECH', discountPercent: 25, expiresAt: '2026-11-30', usageCount: 142, active: true },
  { code: 'KWACHA15', discountPercent: 15, expiresAt: '2026-12-15', usageCount: 65, active: true },
  { code: 'STUDENT50', discountPercent: 50, expiresAt: '2026-12-31', usageCount: 210, active: true }
];

export const INITIAL_FORUM_TOPICS: ForumTopic[] = [
  {
    id: 'topic-1',
    category: 'Cloud Computing',
    courseId: 'course-gcp-cloud-arch',
    title: 'Best strategy for minimizing egress data costs in GCP for southern African users?',
    authorName: 'Kelvin Banda',
    authorRole: 'Student',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80',
    content: 'We are hosting a banking analytics application. Since Google Cloud opened the africa-south1 region in Johannesburg, what is the best practice for caching static assets and routing internal traffic between Lusaka branch offices and GCP without incurring high outbound internet transit?',
    createdAt: '2 days ago',
    upvotes: 18,
    replies: [
      {
        id: 'rep-1',
        authorName: 'Alinafe Nyirenda',
        authorRole: 'Instructor & Founder',
        authorAvatar: '/src/assets/images/african_tech_instructor_1793474033391.jpg',
        content: 'Great question Kelvin! Pair Cloud CDN with Google Cloud Storage in the Johannesburg region. Additionally, using Cloud Interconnect via Teraco or Liquid Telecom in Lusaka drops per-gigabyte egress costs by over 40% compared to standard Tier-1 internet routing.',
        createdAt: '1 day ago',
        isInstructorAnswer: true
      }
    ]
  },
  {
    id: 'topic-2',
    category: 'Cybersecurity',
    courseId: 'course-cybersecurity-soc',
    title: 'How to handle false positives in Snort IDS rules for Mobile Money USSD callbacks?',
    authorName: 'Bwalya Musonda',
    authorRole: 'Student',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80',
    content: 'Our lab firewall alerted on port 443 XML-RPC packets coming from telecom aggregation gateways as potential SQL injections due to special character encodings in phone prompts.',
    createdAt: '3 days ago',
    upvotes: 12,
    replies: [
      {
        id: 'rep-2',
        authorName: 'Mutale Chanda',
        authorRole: 'Instructor',
        authorAvatar: '/src/assets/images/african_tech_instructor_1793474033391.jpg',
        content: 'You should whitelist the telecom gateway IP CIDR blocks and configure content-type specific parsing so the USSD alphanumeric tokens do not trigger generic regex rules.',
        createdAt: '2 days ago',
        isInstructorAnswer: true
      }
    ]
  }
];

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann-1',
    title: 'AliTech Partners with Leading Zambian Financial Institutions for Cloud Internships',
    message: 'Top graduates from our Google Cloud and Cybersecurity bootcamps in Q4 2026 will receive direct interviews for Cloud Infrastructure and Security Analyst roles in Lusaka.',
    date: 'October 28, 2026',
    priority: 'important',
    targetAudience: 'all'
  },
  {
    id: 'ann-2',
    title: 'New Hands-on Cloud Shell Labs Now Activated',
    message: 'Our interactive browser-based terminal labs are now live across all GCP and Linux modules. Practice real CLI commands directly in your browser!',
    date: 'October 20, 2026',
    priority: 'info',
    targetAudience: 'students'
  }
];
