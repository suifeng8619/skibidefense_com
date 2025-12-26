import { UnitList } from "@/components/unit-list";
import { getUnits } from "@/lib/units";

export default function HomePage() {
  const units = getUnits();
  const currentYear = new Date().getFullYear();

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero/Header Section */}
      <header className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
          Skibi Defense Value List {currentYear}
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          The most accurate and up-to-date trading values for all Skibi Defense
          units. Click any value to copy it to your clipboard for easy trading.
        </p>
      </header>

      {/* Value List */}
      <section>
        <UnitList units={units} />
      </section>

      {/* SEO Content Section */}
      <section className="mt-16 prose prose-invert max-w-none">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          About Skibi Defense Trading Values
        </h2>
        <div className="text-muted-foreground space-y-4">
          <p>
            Our Skibi Defense value list is updated regularly to reflect the
            current trading market. Values are based on community trading data
            and demand trends.
          </p>
          <p>
            Use our{" "}
            <a href="/calculator" className="text-yellow-400 hover:underline">
              Trade Calculator
            </a>{" "}
            to compare offers and ensure you&apos;re getting fair trades. Never
            get scammed again!
          </p>
          <h3 className="text-xl font-semibold text-foreground mt-6">
            Understanding Rarity Tiers
          </h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <span className="text-red-400 font-medium">Secret</span> - The
              rarest units from limited events
            </li>
            <li>
              <span className="text-yellow-400 font-medium">Godly</span> - Top
              tier units with high demand
            </li>
            <li>
              <span className="text-purple-400 font-medium">Mythic</span> -
              Powerful units from mythic crates
            </li>
            <li>
              <span className="text-orange-400 font-medium">Legendary</span> -
              Common but valuable units
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
