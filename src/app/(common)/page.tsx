import ProductCard from '@/components/product/card';

export default function Home() {
  return (
    <div>
      <div className="bg-stripes-fuchsia grid grid-flow-col grid-rows-4 gap-4 rounded-lg text-center font-mono text-sm font-bold leading-6 text-white">
        <div className="col-span-2 row-span-4 grid">
          <img
            className="w-100 h-100"
            src="https://data-service.pharmacity.io/pmc-ecm-webapp-config-api/production/banner/913-1694600382533.png"
            alt="product image"
          />
        </div>
        <div className="col-span-2 row-span-2 grid place-content-center rounded-lg ">
          <img
            className="h-100"
            src="https://data-service.pharmacity.io/pmc-ecm-webapp-config-api/production/banner/913x280%20(x1.5)%20(21)-1694765737327.png"
            alt="product image"
          />
        </div>
        <div className="row-span-2 grid place-content-center rounded-lg">
          <img
            className="h-100"
            src="https://data-service.pharmacity.io/pmc-ecm-webapp-config-api/production/banner/913x280%20(x1.5)%20(21)-1694765737327.png"
            alt="product image"
          />
        </div>
      </div>

      <div className="grid grid-cols-6 gap-4">
        {[1, 2, 3, 4, 5, 6].map((item, index) => (
          <ProductCard key={index} />
        ))}
      </div>
    </div>
  );
}
