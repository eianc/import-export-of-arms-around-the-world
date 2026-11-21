// Styles are imported via the JS bundle
import '../styles/app.scss';

import arms from './modules/world-arms';

arms();

// import.meta.env.DEV is true in `npm run dev` and stripped from production builds
if (import.meta.env.DEV) {
    console.log('Arms imports/exports visualisation: development build');
}
