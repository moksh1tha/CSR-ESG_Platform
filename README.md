# CSR Impact Hub

CSR Impact Hub is a web-based platform that connects CSR-giving organizations with verified NGOs and impact organizations based on shared Sustainable Development Goals (SDGs). By using AI/ML-powered matching, the platform enhances transparency, improves efficiency, and accelerates impactful partnerships.

## Features

### Authentication
- Role-based registration and login for:
  - CSR Funding Organizations
  - Impact Organizations (NGOs)
- Email verification and document-based validation

### User Dashboard
- Separate dashboards for funders and NGOs
- Profile completion tracking
- Quick access to proposals, matches, metrics, and messages

### SDG Matching Engine
- AI/ML-driven matchmaking based on:
  - SDG alignment
  - Region of operation
  - Budget compatibility
  - Proposal quality
- Real-time match scoring with filters and saved matches

### Organization Profiles
- CSR Funders: Add CSR goals, past projects, SDG focus, and budget range
- NGOs: Add mission, impact stats, funding needs, proposals, and documents
- Public/private visibility toggle and collaboration readiness status

### Explore Directory
- Browse all registered funders and NGOs
- Filter by SDG, location, sector, and funding size
- Advanced search and profile previews

### SDG Goals Hub
- Visual directory of the 17 UN SDGs
- Each goal page includes:
  - Description and global context
  - Active organizations working on the goal
  - Related resources and success stories

### Collaboration Tools
- Real-time messaging between NGOs and funders
- Share documents, proposals, and updates
- Project status tracking (e.g., Pending, In Discussion, Funded)

### Impact Stories
- Showcase of successful CSR-NGO collaborations
- Data-driven case studies by region and SDG
- Testimonials and featured impact campaigns

### Resources and Learning
- Proposal templates and guides
- CSR policy documentation and compliance info
- Blogs, news, and training material for both funders and NGOs

### Admin Panel (Internal)
- User and content moderation
- Verification handling
- Platform analytics and system controls

## Tech Stack

- Frontend: React.js, Redux Toolkit, Tailwind CSS
- Backend: Node.js, Express.js
- Database: MongoDB (Mongoose ODM)
- Authentication: JWT, Role-based access control
- Machine Learning: Python-based SDG matching API (optional)
- Hosting: Azure or AWS
- Other Tools: Figma (UI Design), Postman (API testing)
