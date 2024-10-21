
import { endpoints } from "./apis";
import { apiConnector } from "./apiconnector";
import toast from "react-hot-toast";
const{ANSWER_API} =endpoints;

// export async function getAllanswer(question, orderby, sortby) {
//   try {
//       const response = await apiConnector("GET", `${ANSWER_API}/${question}/${sortby}/${orderby}`);

//       // Assuming the response will always have status and data fields
//       if (response.status !== 200) {
//           throw new Error(response.message || "Failed to fetch data");
//       }

//       // Returning the redditdata and stackdata safely
//      console.log("redditdata response",response.data.redditdata);
//      console.log("stackdata response",response.data.stackdata?.items);
//       return {
//           redditdata: response.data.redditdata || [],  // Ensure an empty array fallback
//           stackdata: response.data.stackdata?.items || [] // Stackdata items, fallback to an empty array
//       };
//   } catch (error) {
//       console.error(error.message);
//       throw error; // Propagate the error for further handling
//   }
// }

export async function getAllanswer(question, filterBy = 'Activity', sortBy = 'Desc') {
  try {
    const response = await apiConnector("GET", `${ANSWER_API}/${question}/${sortBy}/${filterBy}`);

    if (response.status !== 200) {
      throw new Error(response.message || "Failed to fetch data");
    }

    let redditdata = response.data.redditdata || [];
    let stackdata = response.data.stackdata?.items || [];

    // Merge Reddit and Stack Overflow data
    const combinedData = [
      ...redditdata.map(data => ({
        ...data,
        platform: 'Reddit', // Tagging source platform
        creation_date: data.created_at, // Aligning naming convention
        last_activity_date: data.last_activity_at
      })),
      ...stackdata.map(data => ({
        ...data,
        platform: 'StackOverflow', // Tagging source platform
        creation_date: data.creation_date, // Aligning naming convention
        last_activity_date: data.last_activity_date
      }))
    ];

    // Apply sorting to the combined data
    const sortedData = applySorting(combinedData, filterBy, sortBy);

    return sortedData; // Return sorted combined data
  } catch (error) {
    console.error(error.message);
    throw error; 
  }
}

// Helper function to sort data
function applySorting(data, filterBy, sortBy) {
  const isAscending = sortBy === 'Asc';

  switch (filterBy) {
    case 'Votes':
      return data.sort((a, b) => isAscending ? a.score - b.score : b.score - a.score);
    
    case 'Creation':
      return data.sort((a, b) => {
        const dateA = a.creation_date;
        const dateB = b.creation_date;
        return isAscending ? dateA - dateB : dateB - dateA;
      });
    
    case 'Activity':
      return data.sort((a, b) => {
        const activityA = a.last_activity_date;
        const activityB = b.last_activity_date;
        return isAscending ? activityA - activityB : activityB - activityA;
      });
    
    case 'Relevance':
      // Assuming relevance is based on score and some tag match logic
      return data.sort((a, b) => isAscending ? a.score - b.score : b.score - a.score);
    
    default:
      return data;
  }
}




