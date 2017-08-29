// import '../styles/app';

// Styles are imported via JS bundles
import '../styles/app';

// Import JS modules
import arms from 'modules/world-arms';
arms();

// __DEV__ is a global boolean that is set by Webpack
// This is good to use if you want exclude some JS from
// the production build, e.g. console statements
__DEV__ && console.log('Zone boilerplate\n================\nThis message is only viewable in the development build');
