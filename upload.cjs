const fs = require('fs');
const { execSync } = require('child_process');

function getFiles(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const name = dir + '/' + file;
    if (fs.statSync(name).isDirectory()) {
      getFiles(name, files);
    } else {
      if (name.match(/\.(png|jpg|jpeg)$/)) {
        files.push(name);
      }
    }
  }
  return files;
}

const allFiles = [...getFiles('public/assets'), ...getFiles('public/frames'), ...getFiles('src/assets/images')];
console.log('Total files:', allFiles.length);

const batchSize = 10;
for (let i = 0; i < allFiles.length; i += batchSize) {
  const batch = allFiles.slice(i, i + batchSize);
  console.log(`Pushing batch ${Math.floor(i / batchSize) + 1} of ${Math.ceil(allFiles.length / batchSize)}`);
  for (const file of batch) {
    execSync(`git add "${file}"`);
  }
  execSync(`git commit -m "chore: upload images batch ${Math.floor(i / batchSize) + 1}"`);
  execSync('git push origin main');
}
console.log('Done!');
