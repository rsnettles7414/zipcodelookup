import { useState } from 'react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import '../styles/globals.css';

export default function Home() {
  const [zip, setZip] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchHousingData = async () => {
    if (!zip) return;
    setLoading(true);
    setResult(null);
    try {
      const response = await fetch(
        `https://api.census.gov/data/2022/acs/acs5?get=NAME,B25001_001E&for=zip%20code%20tabulation%20area:${zip}`
      );
      const data = await response.json();
      if (data && data[1]) {
        setResult({
          area: data[1][0],
          housingUnits: data[1][1],
        });
      } else {
        setResult({ error: 'No data found for this ZIP code.' });
      }
    } catch (err) {
      setResult({ error: 'Failed to fetch data.' });
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-md shadow-2xl p-8 rounded-2xl bg-white/80 backdrop-blur">
        <CardContent>
          <h1 className="text-2xl font-extrabold mb-6 text-center text-indigo-700">🏠 ZIP Code Housing Lookup</h1>
          <div className="flex gap-2 mb-6">
            <Input
              placeholder="Enter ZIP code"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
            />
            <Button onClick={fetchHousingData} disabled={loading}>
              {loading ? 'Loading...' : 'Search'}
            </Button>
          </div>
          {result && (
            <div className="text-center mt-4 p-4 rounded-lg bg-indigo-50 border border-indigo-200">
              {result.error ? (
                <p className="text-red-500 font-semibold">{result.error}</p>
              ) : (
                <>
                  <p className="text-lg font-semibold text-indigo-800">{result.area}</p>
                  <p className="text-gray-700 mt-2 text-lg">Housing Units: <span className="font-bold">{result.housingUnits}</span></p>
                </>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}