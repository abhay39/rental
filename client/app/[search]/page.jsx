'use client';

import { useCallback, useEffect, useState } from 'react';
import Card from '../component/Card';

const Searching = ({ params }) => {
  
  const [datas, setDatas] = useState([]);
  const [filters, setFilters] = useState({
    priceRange: [0, 20000],
    bedrooms: '',
    bathrooms: '',
  });

  const getListingsByFilter = async () => {
    try {
      const { priceRange, bedrooms, bathrooms } = filters;
      const query = new URLSearchParams({
        // search: params.search,
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
        bedrooms,
        bathrooms,
      }).toString();
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/listing/getListing/search?${query}`);
      const data = await res.json();
      // console.log(data)
      setDatas(data);
    } catch (error) {
      console.error('Error fetching listings:', error);
    }
  };

  const getListings = async () => {
    try {
      const { priceRange, bedrooms, bathrooms } = filters;
      const query = new URLSearchParams({
        search: params.search,
      }).toString();
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/listing/getListing/search?${query}`);
      const data = await res.json();
      // console.log(data)
      setDatas(data);
    } catch (error) {
      console.error('Error fetching listings:', error);
    }
  };

  useEffect(() => {
    getListings();
  }, [getListings]);


  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handlePriceRangeChange = (e) => {
    const { name, value } = e.target;
    const newValue = Number(value);

    setFilters((prevFilters) => ({
      ...prevFilters,
      priceRange: [
        name === 'minPrice' ? newValue : prevFilters.priceRange[0],
        name === 'maxPrice' ? newValue : prevFilters.priceRange[1],
      ],
    }));
  };

  return (
    <section className="lg:px-32 md:px-16 px-4 py-5 bg-slate-100 min-h-screen">
      <div className="flex md:flex-row flex-col gap-8">
        <div className="flex-none w-full lg:w-1/4 p-4 bg-white rounded-md shadow-md">
          <h2 className="text-lg font-bold mb-4">Filter Options</h2>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Price Range</label>
            <input
              type="number"
              name="minPrice"
              value={filters.priceRange[0]}
              onChange={handlePriceRangeChange}
              className="border p-2 rounded-md w-full mb-2"
              placeholder="Min Price"
            />
            <input
              type="number"
              name="maxPrice"
              value={filters.priceRange[1]}
              onChange={handlePriceRangeChange}
              className="border p-2 rounded-md w-full"
              placeholder="Max Price"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Number of Bedrooms</label>
            <select
              name="bedrooms"
              value={filters.bedrooms}
              onChange={handleFilterChange}
              className="border p-2 rounded-md w-full"
            >
              <option value="">Any</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3+</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Number of Bathrooms</label>
            <select
              name="bathrooms"
              value={filters.bathrooms}
              onChange={handleFilterChange}
              className="border p-2 rounded-md w-full"
            >
              <option value="">Any</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3+</option>
            </select>
          </div>

          <button
            onClick={getListingsByFilter}
            className="bg-green-500 text-white p-2 rounded-md w-full"
          >
            Apply Filters
          </button>
        </div>

        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {datas.length > 0 ? (
              datas.map((item, index) => <Card item={item} key={index} />)
            ) : (
              <h1 className="font-medium text-xl">No Results found</h1>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Searching;
