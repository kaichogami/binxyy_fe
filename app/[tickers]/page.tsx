import TickerPageLayout from '@/layouts/TickerLayout';
import DefaultView from '@/components/views/DefaultView';
import AnotherView from '@/components/views/AnotherView';
import PercentageSalesView from '@/components/views/PercentageSalesView';
import views from './views.json';

const BATCH_SIZE = 30;

async function fetchTickersFromAPI() {
  const apiUrl = 'http://127.0.0.1:8000/api/binxyyweb/get_tickers';
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching tickers:', error);
    throw error;
  }
}

async function fetchDataFromAPI(tickers: string[], params: string[]) {
  const apiUrl = `http://127.0.0.1:8000/api/binxyyweb/fetch_annual_financial_data?tickers=${tickers.join(',')}&params=${params.join(',')}`;
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

// Function to generate static params for Next.js to pre-render
export async function generateStaticParams() {
  // Fetching tickers in batches
  const ids = await fetchTickersFromAPI();
  const tickerBatches: { ticker: string }[][] = [];
  for (let i = 0; i < ids.length; i += BATCH_SIZE) {
    const batch = ids.slice(i, i + BATCH_SIZE);
    tickerBatches.push(batch.map(({ ticker }) => ({ ticker })));
  }
  const tickers = tickerBatches.flat();

  // Combining tickers with views to create unique params
  const allParams = tickers.flatMap(({ ticker }) =>
    views.map(view => ({
      ticker,
      view: view.view
    }))
  );

  return allParams;
}

interface DynamicPageProps {
  data: Record<string, any>;
  ticker: string;
  view: string;
}

const DynamicPage = ({ data, ticker, view }: DynamicPageProps) => {
  const viewData = data[ticker];
  const viewParams = views.find(v => v.view === view)?.params || [];
  const viewProps = viewParams.reduce((acc, param) => {
    acc[param] = viewData[param];
    return acc;
  }, {} as Record<string, any>);

  const renderContent = () => {
    switch (view) {
      case 'percentage_sales':
        return <PercentageSalesView {...viewProps} />;
      case 'another_view':
        return <AnotherView {...viewProps} />;
      // Add more cases for other views
      default:
        return <DefaultView {...viewProps} />;
    }
  };

  return (
    <TickerPageLayout>
      {renderContent()}
    </TickerPageLayout>
  );
};

// Generating static paths for each combination of ticker and view
export async function getStaticPaths() {
  const params = await generateStaticParams();
  const paths = params.map(({ ticker, view }) => ({
    params: { ticker, view }
  }));

  return {
    paths,
    fallback: false // or 'blocking' if you want to generate pages on demand
  };
}

// Fetching data for each static page based on ticker and view
export async function getStaticProps({ params }: { params: { ticker: string, view: string } }) {
  const { ticker, view } = params;

  // Collecting required params for the specific view
  const viewParams = views.find(v => v.view === view)?.params || [];
  const data = await fetchDataFromAPI([ticker], viewParams);

  return {
    props: {
      data,
      ticker,
      view
    }
  };
}

export default DynamicPage;
