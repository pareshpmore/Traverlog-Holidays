import { useEffect, useMemo, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
import PackageCard from '../components/PackageCard';
import { TOURS } from './domestic/maharashtra/Toursdata';

const getDurationDays = (pkg) => {
  if (typeof pkg?.duration?.days === 'number') return pkg.duration.days;
  if (typeof pkg?.duration?.days === 'string') {
    const parsed = Number.parseInt(pkg.duration.days, 10);
    if (!Number.isNaN(parsed)) return parsed;
  }
  if (typeof pkg?.duration?.nights === 'number') return pkg.duration.nights + 1;
  if (typeof pkg?.duration === 'string') {
    const match = pkg.duration.match(/(\d+)\s*days?/i);
    if (match) return Number(match[1]);
  }
  return 9999;
};

const fallbackPackages = TOURS.map((tour) => ({
  id: tour.id,
  name: tour.title,
  description: tour.tagline,
  category: 'domestic',
  type: 'tour',
  destination: tour.region,
  location: tour.region,
  place: tour.region,
  slug: tour.id,
  duration: { days: getDurationDays({ duration: tour.duration }), nights: getDurationDays({ duration: tour.duration }) - 1 },
  itinerary: Array.isArray(tour.itinerary)
    ? tour.itinerary.map((day) => ({
        title: day?.title,
        description: day?.body,
        hotel: day?.highlights?.[0]?.text || '',
      }))
    : [],
  images: Array.isArray(tour.images) ? tour.images.map((image) => image.src) : [],
  path: '/domestic/maharashtra',
}));

const getSearchableValues = (pkg) => {
  const itineraryText = Array.isArray(pkg?.itinerary)
    ? pkg.itinerary.flatMap((day) => [day?.title, day?.description, day?.hotel])
    : [];

  return [
    pkg?.name,
    pkg?.description,
    pkg?.category,
    pkg?.type,
    pkg?.destination,
    pkg?.location,
    pkg?.place,
    pkg?.slug,
    ...itineraryText,
  ].filter(Boolean);
};

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const queryParam = searchParams.get('q') || '';
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    if (!queryParam.trim()) {
      setPackages([]);
      return;
    }

    const packagesRef = collection(db, 'packages');

    const unsubscribe = onSnapshot(packagesRef, (snapshot) => {
      setPackages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe();
  }, [queryParam]);

  const filteredPackages = useMemo(() => {
    const normalized = queryParam.trim().toLowerCase();

    if (!normalized) return [];

    const combinedPackages = [...packages, ...fallbackPackages]
      .filter((pkg, index, self) => {
        const key = pkg?.id || pkg?.name;
        return key && self.findIndex((item) => (item?.id || item?.name) === key) === index;
      })
      .filter((pkg) => {
        return getSearchableValues(pkg).some((value) => String(value).toLowerCase().includes(normalized));
      })
      .sort((a, b) => getDurationDays(a) - getDurationDays(b));

    return combinedPackages;
  }, [packages, queryParam]);

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Search Results</h1>
        <p className="mt-2 text-slate-600">
          Showing trips for <span className="font-semibold text-[#a34f12]">{queryParam}</span>
        </p>
      </div>

      {filteredPackages.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-slate-600">
          <p className="text-lg font-medium">No matching trips found yet.</p>
          <p className="mt-2">Try a broader term like Maharashtra, Honeymoon, or a destination name.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPackages.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      )}

      <div className="mt-8 flex flex-wrap gap-3">
        <Link to="/domestic/maharashtra" className="rounded-full bg-[#5a2f16] px-4 py-2 text-sm font-medium text-white">
          Maharashtra Tours
        </Link>
        <Link to="/romantic-honeymoon" className="rounded-full border border-[#5a2f16]/20 px-4 py-2 text-sm font-medium text-[#5a2f16]">
          Honeymoon Packages
        </Link>
      </div>
    </div>
  );
}
