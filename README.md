## Q&A Search Application

### Overview
The Q&A Search Application allows users to search for questions and answers from popular platforms like Stack Overflow and Reddit. By fetching relevant data based on user queries, it displays the results with options for sorting and filtering. Additionally, the app includes features like email generation and data caching to enhance performance.

### Features

1. **Search Functionality**
   - Users can enter a keyword or phrase (in any language) to search across Stack Overflow and Reddit.
   - The application retrieves relevant questions and answers using the APIs of both platforms.

2. **Result Display**
   - Results are shown in an easy-to-read format, including:
     - Title of the question/post
     - Summary of the content
     - Link to the original post
     - Top answers for the question

3. **Filtering and Sorting**
   - Users can filter and sort the results based on several criteria, such as:
     - **Activity**: Most active or recently updated posts
     - **Votes**: Highest or lowest voted posts
     - **Relevance**: Posts most relevant to the search query
     - **Creation Date**: Newest or oldest posts
     - **Sorting by Votes**: Ascending or descending order of votes

4. **Email Generation**
   - Users can generate and send an email containing the search results.
   - The email can be sent to their own address or shared with others.

5. **Data Caching**
   - Frequently accessed search results are cached using Redis for faster retrieval.
   - Upstash is used as the Redis provider for handling the caching process.

6. **Data Access**
   - The application is open to all users, with no login required, ensuring easy and quick access.

### Installation

#### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install the required dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `frontend` folder and add the following:
   ```bash
   REACT_BASE_URL=<your_backend_server_url>
   ```
4. Start the frontend development server:
   ```bash
   npm start
   ```

#### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install the required dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` folder and add the following:
   ```bash
   REDIS_URL=<your_upstash_redis_url>
   ```
4. Start the backend development server:
   ```bash
   npm run dev
   ```
