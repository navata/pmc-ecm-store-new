import ProductCard from '@/components/product/card';
import { getI18n } from '@/locales/server';

export default async function Home() {
  const t = await getI18n();

  return (
    <div>
      <div className="bg-stripes-fuchsia mb-6 grid grid-flow-col gap-4 ">
        <div className="col-span-4 row-span-4 grid">
          <img
            className="h-full w-full"
            src="https://data-service.pharmacity.io/pmc-ecm-webapp-config-api/production/banner/913-1694600382533.png"
            alt="product image"
          />
        </div>
        <div className="col-span-2 row-span-2 grid ">
          <img
            className="h-full"
            src="https://data-service.pharmacity.io/pmc-ecm-webapp-config-api/production/banner/913x280%20(x1.5)%20(21)-1694765737327.png"
            alt="product image"
          />
        </div>
        <div className="col-span-2 row-span-2 grid w-full">
          <img
            className="h-full w-full"
            src="https://data-service.pharmacity.io/pmc-ecm-webapp-config-api/production/banner/913x280%20(x1.5)%20(21)-1694765737327.png"
            alt="product image"
          />
        </div>
      </div>
      <p>{t('common.address')}</p>
      <div className="grid grid-cols-6 gap-4">
        {[1, 2, 3, 4, 5, 6].map((item, index) => (
          <ProductCard key={index} />
        ))}
      </div>
    </div>
  );
}
