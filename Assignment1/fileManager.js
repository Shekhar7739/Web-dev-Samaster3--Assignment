const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, 'test.txt');

function runFileLifecycle() {
  console.log('Creating File...');
  fs.writeFile(targetFile, 'Hello Node.js\n', (writeErr) => {
    if (writeErr) {
      console.error('Error creating file:', writeErr.message);
      return;
    }
    console.log('File Created');

    console.log('Reading File');
    fs.readFile(targetFile, 'utf8', (readErr, data) => {
      if (readErr) {
        console.error('Error reading file:', readErr.message);
        return;
      }
      process.stdout.write(data);

      fs.appendFile(targetFile, 'Learning FS Module\n', (appendErr) => {
        if (appendErr) {
          console.error('Error updating file:', appendErr.message);
          return;
        }
        console.log('File Updated');

        fs.readFile(targetFile, 'utf8', (readUpdatedErr, updatedData) => {
          if (readUpdatedErr) {
            console.error('Error reading updated file:', readUpdatedErr.message);
            return;
          }
          process.stdout.write(updatedData);

          fs.unlink(targetFile, (unlinkErr) => {
            if (unlinkErr) {
              console.error('Error deleting file:', unlinkErr.message);
              return;
            }
            console.log('File Deleted');
          });
        });
      });
    });
  });
}

runFileLifecycle();
