import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import PackageCard from "../components/PackageCard";

export default function CategoryPackages() {
  const { category, type } = useParams();
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    let q;

    if (type) {
      q = query(
        collection(db, "packages"),
        where("category", "==", category),
        where("type", "==", type)
      );
    } else {
      q = query(
        collection(db, "packages"),
        where("category", "==", category)
      );
    }

    const unsub = onSnapshot(q, snap => {
      setPackages(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsub();
  }, [category, type]);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6 capitalize">
        {category.replace("-", " ")} {type && ` - ${type}`}
      </h1>

      
     <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
  {packages.map(pkg => (
    <PackageCard key={pkg.id} pkg={pkg} />
  ))}
</div>

    </div>
  );
}
