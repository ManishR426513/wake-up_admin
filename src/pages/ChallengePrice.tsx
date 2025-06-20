import { authAxios } from '@/config/config';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface PriceRange {
  min: number;
  max: number;
}

const ChallengePrice: React.FC = () => {
  const [priceRange, setPriceRange] = useState<PriceRange>({ min: 0, max: 100 });
  const [loading, setLoading] = useState<boolean>(false);

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(e.target.value);
    if (value < 1) value = 1;
    if (value > priceRange.max - 2) value = priceRange.max - 2;
    setPriceRange((prev) => ({ ...prev, min: value }));
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(e.target.value);
    if (value <= priceRange.min + 2) value = priceRange.min + 2;
    setPriceRange((prev) => ({ ...prev, max: value }));
  };

  const getChallengePrice = async () => {
    setLoading(true);
    try {
      const response = await authAxios().get('/challenge/price');
      const { minPrice, maxPrice } = response.data.data;

      setPriceRange({
        min: Math.max(1, minPrice),
        max: maxPrice,
      });
    } catch (err) {
      toast.error('Failed to fetch challenge price range.');
      console.error('Error fetching price:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateChallengePrice = async () => {
    setLoading(true);
    try {
      const payload = {
        minPrice: priceRange.min,
        maxPrice: priceRange.max,
      };

      await authAxios().post('/challenge/price', payload);
      toast.success('Price range updated successfully!');
    } catch (err) {
      toast.error('Failed to update price range.');
      console.error('Error updating price:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getChallengePrice();
  }, []);

  const isValidRange = priceRange.min >= 1 && priceRange.max > priceRange.min + 1;

  return (
    <> 
    {
      priceRange.min>0&&<div className="max-w-4xl w-full sm:w-[80%] md:w-[60%] lg:w-[50%] mx-auto mt-14 p-8 bg-white text-black rounded-2xl shadow-2xl font-sans">
      <h1 className="text-3xl font-bold text-center mb-10">Set Challenge Price</h1>

      <div className="flex justify-center items-center text-xl font-semibold bg-black text-white py-5 px-7 rounded-xl mb-10 space-x-4">
        <span>${priceRange.min}</span>
        <span>—</span>
        <span>${priceRange.max}</span>
      </div>

      <div className="mb-8">
        <label className="block mb-2 font-medium text-sm text-gray-700">
          Minimum Price: ${priceRange.min}
        </label>
        <input
          type="range"
          min={1}
          max={100}
          step={1}
          value={priceRange.min}
          onChange={handleMinPriceChange}
          className="w-full h-2 bg-gray-300 rounded-full cursor-pointer accent-black"
        />
      </div>

      <div className="mb-10">
        <label className="block mb-2 font-medium text-sm text-gray-700">
          Maximum Price: ${priceRange.max}
        </label>
        <input
          type="range"
          min={1}
          max={100}
          step={1}
          value={priceRange.max}
          onChange={handleMaxPriceChange}
          className="w-full h-2 bg-gray-300 rounded-full cursor-pointer accent-black"
        />
      </div>

      <button
        onClick={updateChallengePrice}
        disabled={loading || !isValidRange}
        className={`w-full py-3 rounded-lg text-sm font-semibold transition-all ${
          loading || !isValidRange
            ? 'bg-gray-400 text-white cursor-not-allowed'
            : 'bg-black text-white hover:bg-neutral-800 active:bg-neutral-700'
        }`}
      >
        {loading ? 'Saving...' : 'Save Price Range'}
      </button>
    </div>
    }
    </>
  );
};

export default ChallengePrice;
