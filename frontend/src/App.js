import React, { useState } from 'react';
import Header from './components/Header';
import AnswerCard from './components/AnswerCard';
import { getAllanswer} from './services/searchAPI';

const App = () => {
  const [combinedData, setCombinedData] = useState([]);
  const [loading, setLoading] = useState(false);

  // This function will be passed to Header to perform the search
  const searchQuestion = async (selectQuestion, selectedFilter, selectedSort) => {
    setLoading(true);
    try {
      const sortedData = await getAllanswer(selectQuestion, selectedFilter, selectedSort);
      setCombinedData(sortedData || []);
    } catch (error) {
      console.error("Error while searching for answers:", error.message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div>
      <Header onSearch={searchQuestion}/>
  
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex flex-wrap justify-center">
          {combinedData.length > 0 ? (
            combinedData.map((res, index) => <AnswerCard key={index} data={res} />)
          ) : (
            <p>No answers found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default App;


