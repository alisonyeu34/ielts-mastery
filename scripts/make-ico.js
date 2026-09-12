const fs = require('fs');
const path = require('path');
const mod = require('png-to-ico');
const pngToIco = mod.default || mod;

pngToIco(path.join(__dirname, '../public/icons/icon-192.png'))
  .then(buf => {
    fs.writeFileSync(path.join(__dirname, '../public/icons/icon.ico'), buf);
    console.log('Binary icon.ico written successfully, size:', buf.length);
  })
  .catch(err => {
    console.error('Error generating ico:', err);
    process.exit(1);
  });
