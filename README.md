# Event Management System

## Overview
The Event Management System is a comprehensive web-based application designed to streamline the organization and management of college fests. This platform enables users to register for events, access detailed event information, and efficiently manage the entire event workflow. The system implements a role-based access control mechanism, ensuring that different users have appropriate permissions based on their responsibilities.

## Features
- **User Registration & Authentication**: Secure login system with role-based access control  
- **Event Creation & Management**: Create, update, and delete event details  
- **Event Registration**: Simple process for users to register for various events  
- **Event Details Viewing**: Comprehensive information about each event  
- **Workflow Management**: Tools to manage the complete lifecycle of events  
- **Role-Based Access**: Different permission levels for administrators, organizers, and participants  

## Technology Stack
- **Frontend**: React.js  
- **Backend**: Django  
- **Database**: MySQL  

## Installation

### Prerequisites
- Node.js and npm  
- Python 3.x  
- MySQL  

### Setup Instructions

#### Clone the repository
```bash
git clone https://github.com/tanveeiii/Event-Management-System.git
cd Event-Management-System
```

#### Set up the backend
```bash
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

#### Set up the frontend
```bash
cd frontend
npm install
npm start
```


## Project Structure
```
Event-Management-System/
├── event-frontend/      # React.js frontend application
├── system/              # Backend
└── README.md            # Project readme file
```
