const moduleAlias = require('module-alias');
// __dir is a node-provides variable, the value is abstract path to the file
moduleAlias.addAlias('@', __dirname + '/src');
moduleAlias.addAlias('root-dir', __dirname);