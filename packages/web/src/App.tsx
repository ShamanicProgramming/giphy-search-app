import React, { FormEvent, useState } from 'react';
import './App.css';
import { queryGifs } from '../../../shared/client-api/giphy-search';
import { createRequestHandler, getRequestHandler } from '../../../shared/client-api/request-handler';
import EmblaCarousel from './components/EmblaCarousel';
import { EmblaOptionsType } from 'embla-carousel';

function App() {
  createRequestHandler();

  const [searchString, updateSearchString] = useState('');
  const [giphyData, setGiphyData] = useState([]);
  const OPTIONS: EmblaOptionsType = {};

  const handleChange = (event) => {
    updateSearchString(event.target.value);
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    const searchResult = await queryGifs(getRequestHandler(), { searchQuery: searchString });
    const newGiphyData = searchResult.data.map((item, index) => {
      return {
        index: index,
        linkUrl: item["url"],
        imgUrl: item["images"]["original"]["webp"]
      };
    });
    console.log(newGiphyData);
    setGiphyData(newGiphyData);
  };

  return (
    <div className="app">
      <div className="app-header">
        <p>Giphy Search!</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            id="searchBox"
            value={searchString}
            onChange={handleChange}
            placeholder="Type text to search for a gif"
          />
          <button type="submit">Go!</button>
        </form>
      </div>
      <EmblaCarousel slides={giphyData} options={OPTIONS} />
    </div>
  );
}

export default App;
