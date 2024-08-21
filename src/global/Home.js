import 'intl';
import 'intl/locale-data/jsonp/en';

const Home = 'https://api.haba.insure/api/';
const baseURL = process.env.REACT_APP_API_URL;
const InsuranceUrl = process.env.REACT_APP_INSURANCE_URL;
const flutterKey = process.env.REACT_APP_FLUTTER_KEY;

const formatAmount = (amount, maxDigits = 8) =>
  new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumSignificantDigits: maxDigits,
  }).format(amount) + '.00';

export { Home, InsuranceUrl, formatAmount, baseURL, flutterKey };
