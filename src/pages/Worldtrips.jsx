import { useEffect, useState } from 'react';

function WorldTrips() {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:4000/api/world-trips?cityCode=NEW_YORK')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then((data) => setCollections(data.collections || []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading trips...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="world-trips-grid">
      {collections.map((item) => (
        <div key={item.id} className="trip-card">
          <img src={item.cardImage?.url} alt={item.name} />
          <h3>{item.name}</h3>
          <p>{item.content?.subtext?.slice(0, 100)}...</p>
          <a href={item.canonicalUrl} target="_blank" rel="noopener noreferrer">
            View Details
          </a>
        </div>
      ))}
    </div>
  );
}

export default WorldTrips;