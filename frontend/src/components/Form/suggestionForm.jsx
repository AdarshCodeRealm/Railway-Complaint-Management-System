import  { useState, useMemo } from 'react';

const sectionOptions = [
  "Ticketing",
  "On-board Services",
  "Station Facilities",
  "Safety and Security",
  "Cleanliness",
  "Staff Behavior",
  "Punctuality",
  "Catering",
  "Accessibility"
];

export default function SuggestionsForm() {
  const [suggestion, setSuggestion] = useState('');
  const [description, setDescription] = useState('');

  const randomOptions = useMemo(() => {
    const shuffled = [...sectionOptions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', { suggestion, description });
    // Add your form submission logic here
  };

  const handleReset = () => {
    setSuggestion('');
    setDescription('');
  };

  return (
    <div className="md:min-h-screen bg-white  ">
      <div className="bg-white p-8 rounded-lg   ">
        <h1 className="text-3xl font-bold text-[#8b0d32] mb-6">Suggestions Detail</h1>
        <p className="text-sm text-red-500 mb-6">*Mandatory Fields</p>
        
        <form onSubmit={handleSubmit} className="space-y-6 text-slate-600 ">
          <div>
            <label htmlFor="suggestion" className="block text-sm font-medium text-gray-700 mb-1">
              Suggestion*
            </label>
            <select
              id="suggestion"
              value={suggestion}
              onChange={(e) => setSuggestion(e.target.value)}
              required
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[#8b0d32] focus:border-[#8b0d32] sm:text-sm rounded-md"
            >
              <option value="">--Select--</option>
              {randomOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description*
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows="4"
              className="mt-1 block w-full bg-slate-200 shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-[#8b0d32] focus:border-[#8b0d32]"
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#8b0d32] hover:bg-[#6d0a27] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8b0d32]"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8b0d32]"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}