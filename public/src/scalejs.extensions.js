import mvvm from 'scalejs.mvvm';

// For debugging, add knockout to window global var:
import ko from 'knockout';
window.ko = ko; // This is fine for dev, but not Test or prod

mvvm.init({});