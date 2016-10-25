import modules from 'app/modules';
import mainModule from './main/mainModule'; // always run main module after others
import 'scalejs.extensions'; // setup extensions before running main module

mainModule(); // start app