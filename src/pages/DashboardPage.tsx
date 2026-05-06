import { useState, useEffect } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";
import { Button } from "@/components/ui/button";

export function DashboardPage() {
  const properties = useQuery(api.properties.list);
  const seedProperties = useMutation(api.properties.seed);
  const sendInquiry = useMutation(api.inquiries.send);
  const [selected, setSelected] = useState<string | null>(null);
  const [inquiry, setInquiry] = useState("");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (properties && properties.length === 0) {
      seedProperties();
    }
  }, [properties, seedProperties]);

  const selectedProp = properties?.find((p: any) => p._id === selected);

  const handleSend = async () => {
    if (!selected || !inquiry.trim()) return;
    await sendInquiry({
      propertyId: selected as Id<"properties">,
      message: inquiry,
    });
    setInquiry("");
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Property Listings</h1>
        <p className="text-muted-foreground">Browse and send inquiries for available properties</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {properties?.map((p: any) => (
          <div
            key={p._id}
            onClick={() => setSelected(p._id)}
            className={`rounded-xl border overflow-hidden cursor-pointer transition-all hover:shadow-lg ${
              selected === p._id ? "ring-2 ring-blue-500 border-blue-500" : "bg-card"
            }`}
          >
            <img src={p.imageUrl} alt={p.name} className="w-full h-40 object-cover" loading="lazy" />
            <div className="p-4">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-semibold">{p.name}</h3>
                <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-500">{p.status}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-2">{p.location}</p>
              <p className="text-lg font-bold text-blue-500">{p.price}</p>
              <div className="flex gap-3 mt-2 text-xs text-muted-foreground">
                {p.bedrooms > 0 && <span>{p.bedrooms} bed</span>}
                <span>{p.bathrooms} bath</span>
                <span>{p.sqft.toLocaleString()} sqft</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedProp && (
        <div className="rounded-xl border bg-card p-6 space-y-4">
          <h2 className="text-xl font-bold">{selectedProp.name}</h2>
          <p className="text-muted-foreground">{selectedProp.description}</p>
          <div className="flex flex-wrap gap-2">
            {selectedProp.features.map((f: string) => (
              <span key={f} className="text-xs px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-500 border border-blue-500/20">{f}</span>
            ))}
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Send Inquiry</h3>
            <textarea
              value={inquiry}
              onChange={(e) => setInquiry(e.target.value)}
              placeholder="I'm interested in this property..."
              className="w-full rounded-lg border bg-background p-3 text-sm min-h-[80px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex items-center gap-3">
              <Button onClick={handleSend} disabled={!inquiry.trim()} className="bg-blue-600 hover:bg-blue-700 text-white">
                Send Inquiry
              </Button>
              {sent && <span className="text-sm text-green-500">✓ Inquiry sent!</span>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
